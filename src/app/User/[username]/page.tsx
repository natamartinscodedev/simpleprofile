'use client'

import React, { useEffect, useState } from 'react'
import {
  SaveKeyLocalStorage,
  VerificarChaveValida
} from '@/utils/saveKeyLocalStorage'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { produce } from 'immer'
import Card from '@/components/IsDragging/index'
import BoardContext from '@/components/Board/context'
import Image from 'next/image'
import { UpdateInfoUser } from '@/utils/updateInfoUser'
import { Login } from '@/auth/authServices'
import NavbarBottom from '@/components/NavBarBottom'
import { useSearchParams, useRouter } from 'next/navigation'
import { GetDataUser } from '@/utils/getInfoUser'
import { BadgePlus } from 'lucide-react'
import { signInWithEmailLink } from 'firebase/auth'
import { auth } from '@/firebase/firebase'
import { useSession, signOut } from 'next-auth/react'

const User = ({ params }: any) => {
  const nameLink: any = params.username
  console.log('Params =>', nameLink)
  const searchParams = useSearchParams()
  const router = useRouter()
  const apiKey = searchParams.get('apiKey')
  const oobCode = searchParams.get('oobCode')
  const [joinUser, setJoinUser] = useState(false)
  // const { user, loadin } = Login()
  // email trap
  // const { data: session, status } = useSession()

  const [image, setImage] = useState<string>()
  const [name, setName] = useState<string>()
  const [bio, setBio] = useState<string>()
  const [lists, setLists] = useState<any[]>([])
  const [link, setLink] = useState<string>('')
  const [imgCard, setImgCard] = useState<string>('')
  // console.log("List page User ==>", lists)

  const handleImageChangeUser = (e: any) => {
    const file = e.target.files[0]
    if (file) {
      const imageUrl: any = URL.createObjectURL(file)

      setImage(imageUrl)
      UpdateInfoUser({ image: imageUrl })
    }
  }

  function move(from: any, to: any) {
    const newList = produce(lists, (draft: any) => {
      const dragged = draft[from]

      draft.splice(from, 1)
      draft.splice(to, 0, dragged)
    })

    setLists(newList)
    UpdateInfoUser({ lists: newList })
  }

  const addCard = async () => {
    const newList = produce(lists, (draft: any) => {
      draft.push({ id: 0, type: 'linkCard', link: link })
    })

    setLists(newList)
    UpdateInfoUser({ lists: newList })
    setLink('')
  }

  const addCardImgVideo = async () => {
    // console.log("Log add img&vd ==>", imgCard);
    if (imgCard) {
      const newImgVd = produce(lists, (draft: any) => {
        draft.push({ id: 0, type: 'imgCard', url: imgCard })
      })

      setLists(newImgVd)
      UpdateInfoUser({ lists: newImgVd })
      setImgCard('')
    }
  }

  const handleChangeName = (newName: string) => {
    setName(newName)
    UpdateInfoUser({ name: newName })
  }

  const handleChangeBio = (newBio: string) => {
    setBio(newBio)
    UpdateInfoUser({ bio: newBio })
  }

  // useEffect(() => {
  //   SaveKeyLocalStorage(apiKey, oobCode)

  //   const handleSignInWithEmailLink = async () => {
  //     const email = window.localStorage.getItem('emailForSignIn')
  //     console.log('Email page User ==>', email)
  //     if (!email) {
  //       alert('E-mail para login não encontrado, Faça login novamente!')
  //       return router.push('/Login')
  //     }

  //     try {
  //       console.log('Chegou no try de create ==>', auth)
  //       await signInWithEmailLink(auth, email, window.location.href)
  //       // return router.replace(`/User/${nameLink}`)
  //     } catch (error) {
  //       console.error('Erro ao completar o login com link mágico:', error)
  //       router.push('/error')
  //     }
  //   }

  //   if (VerificarChaveValida(apiKey)) {
  //     handleSignInWithEmailLink()
  //   } else {
  //     window.localStorage.removeItem('emailForSignIn')
  //     window.localStorage.removeItem('apiKey')
  //     window.localStorage.removeItem('expiryTime')
  //     window.localStorage.removeItem('oobCode')

  //     router.push('/Login')
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  // get date and update in realtime on inputs

  const getUser = async () => {
    const email = window.localStorage.getItem('emailForSignIn')

    if (email) {
      const User: any = await GetDataUser(email)
      const { name, bio, image, lists } = User.User

      setName(name)
      setBio(bio)
      setImage(image)
      setLists(lists)
      UpdateInfoUser({ nameLink: nameLink })
    }
  }

  // join ins User page
  const JoinUser = async () => {
    const email = window.localStorage.getItem('emailForSignIn')
    const { User }: any = await GetDataUser(email)

    if (User && User.email === email) {
      setJoinUser(!joinUser)
    } else {
      router.push('/Login')
    }
  }

  useEffect(() => {
    getUser()
    JoinUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {/* {loadin ? (
        <p>Loading....</p>
      ) : ( */}
      <>
        <div>
          {joinUser === true && (
            <div className="container_user container">
              {/* <button onClick={() => signOut()}>Sair</button> */}

              <div className="box-infor_user">
                <div className="box_info-user">
                  <div className="box_img-user">
                    {image ? (
                      <div>
                        <span>
                          <BadgePlus size={30} />
                        </span>
                        <input
                          type="file"
                          id="imageInput"
                          accept="image/*"
                          onChange={handleImageChangeUser}
                        />
                        <Image
                          src={image}
                          alt="Selected"
                          width={200}
                          height={200}
                        />
                      </div>
                    ) : (
                      <div>
                        <input
                          type="file"
                          id="imageInput"
                          accept="image/*"
                          value={image}
                          onChange={handleImageChangeUser}
                        />
                      </div>
                    )}
                  </div>
                  <h1>
                    <input
                      type="text"
                      id="nameInput"
                      value={name}
                      onChange={(e: any) => handleChangeName(e.target.value)}
                      placeholder="Seu nome..."
                    />
                  </h1>
                  <p>
                    <textarea
                      id="bioInput"
                      value={bio}
                      onChange={(e: any) => handleChangeBio(e.target.value)}
                      placeholder="Sua bio..."
                    ></textarea>
                  </p>
                </div>
                {/* <button onClick={handleLogout}>Sair</button> */}
              </div>
              <div className="container_info-user">
                <BoardContext.Provider value={{ lists, move }}>
                  <DndProvider backend={HTML5Backend}>
                    <div className="board_container ">
                      <ul>
                        {/* dataUser.lists  */}
                        {lists &&
                          lists.map((date: any, index: any) => (
                            <Card
                              key={index}
                              index={index}
                              date={date}
                              lists={lists}
                              setLists={setLists}
                            />
                          ))}
                      </ul>
                    </div>
                  </DndProvider>
                </BoardContext.Provider>
              </div>
            </div>
          )}
        </div>
        <NavbarBottom
          addCard={addCard}
          link={link}
          setLink={setLink}
          setImgCard={setImgCard}
          imageChange={imgCard}
          addCardImgVideo={addCardImgVideo}
        />
      </>
      {/* )} */}
    </>
  )
}

export default User
