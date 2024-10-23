'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { produce } from 'immer'
import Image from 'next/image'
import { BadgePlus, LogOut } from 'lucide-react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { GetDataUser } from '@/utils/getInfoUser'
import ListItem from '@/components/IsDragging/index'
import BoardContext from '@/components/Board/context'
import { UpdateInfoUser } from '@/utils/updateInfoUser'
import NavbarBottom from '@/components/NavBarBottom'

const User = ({ params }: any) => {
  const nameLink: any = params.username
  const { data: session }: any = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const hideNavbar: any = searchParams.get('active')
  const [joinUser, setJoinUser] = useState(false)

  const [image, setImage] = useState<string>()
  const [name, setName] = useState<string>()
  const [bio, setBio] = useState<string>()
  const [lists, setLists] = useState<any[]>([])
  const [link, setLink] = useState<string>('')
  const [imgCard, setImgCard] = useState<string>('')
  const [changWidth, setChangWidth] = useState('desktop')

  const handleImageChangeUser = (e: any) => {
    const file = e.target.files[0]
    if (file) {
      const imageUrl: any = URL.createObjectURL(file)

      setImage(imageUrl)
      UpdateInfoUser({ image: imageUrl, nameLink })
    }
  }

  function move(from: any, to: any) {
    const newList = produce(lists, (draft: any) => {
      const dragged = draft[from]

      draft.splice(from, 1)
      draft.splice(to, 0, dragged)
    })

    setLists(newList)
    UpdateInfoUser({ lists: newList, nameLink })
  }

  const addCard = async () => {
    const newList = produce(lists, (draft: any) => {
      draft.push({ id: Date.now(), type: 'linkCard', link: link })
    })

    setLists(newList)
    UpdateInfoUser({ lists: newList, nameLink })
    setLink('')
  }

  const addCardImgVideo = async () => {
    if (imgCard) {
      const newImgVd = produce(lists, (draft: any) => {
        draft.push({ id: Date.now(), type: 'imgCard', url: imgCard })
      })

      setLists(newImgVd)

      UpdateInfoUser({ lists: newImgVd, nameLink })
      // setImgCard('')
    }
  }

  const handleChangeName = (newName: string) => {
    setName(newName)
    UpdateInfoUser({ name: newName, nameLink })
  }

  const handleChangeBio = (newBio: string) => {
    setBio(newBio)
    UpdateInfoUser({ bio: newBio, nameLink })
  }

  const HandleSignOut = () => {
    const EmailAuth = session?.user

    if (!joinUser || EmailAuth) {
      signOut()
      // setJoinUser(false)
      router.push('/')
    }
  }

  if (!session?.user && !!joinUser) {
    router.push('/')
  }

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
      alert('Você não possue uma conta! Tente novamente com os dados correto!')
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
      {joinUser === true && (
        <>
          <div
            className={
              changWidth === 'desktop'
                ? 'change_width-desktop'
                : 'change_width-mobile'
            }
          >
            <div className="container_nav-link container">
              <button onClick={() => HandleSignOut()} className="sing-out">
                <LogOut />
              </button>
            </div>
            <div className="container_user container">
              <div className="box-infor_user">
                <div className="box_info-user">
                  <div
                    className={`box_img-user ${hideNavbar && 'hiderHoover'}`}
                  >
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
                          src={image && image}
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
                    {!hideNavbar ? (
                      <input
                        type="text"
                        id="nameInput"
                        value={name}
                        onChange={(e: any) => handleChangeName(e.target.value)}
                        placeholder="Seu nome..."
                      />
                    ) : (
                      <>{name}</>
                    )}
                  </h1>
                  <p>
                    {!hideNavbar ? (
                      <textarea
                        id="bioInput"
                        value={bio}
                        onChange={(e: any) => handleChangeBio(e.target.value)}
                        placeholder="Sua bio..."
                      ></textarea>
                    ) : (
                      <>{bio}</>
                    )}
                  </p>
                </div>
              </div>
              <div className="container_info-user">
                <BoardContext.Provider value={{ lists, move }}>
                  <DndProvider backend={HTML5Backend}>
                    <div className="board_container ">
                      <ul>
                        {lists &&
                          lists.map((date: any, index: any) => (
                            <ListItem
                              key={index}
                              index={index}
                              date={date}
                              lists={lists}
                              nameLink={nameLink}
                            />
                          ))}
                      </ul>
                    </div>
                  </DndProvider>
                </BoardContext.Provider>
              </div>
            </div>
          </div>
          <>
            {!hideNavbar ? (
              <NavbarBottom
                addCard={addCard}
                link={link}
                setLink={setLink}
                setImgCard={setImgCard}
                imgCard={imgCard}
                addCardImgVideo={addCardImgVideo}
                setChangWidth={setChangWidth}
                nameLink={nameLink}
              />
            ) : (
              <>
                <div className="box_login-shared-user">
                  <Link href="/LinkPersonalize" target="__blank">
                    Criar conta
                  </Link>
                  <Link href="/Login" target="__blank">
                    Logar
                  </Link>
                </div>
              </>
            )}
          </>
        </>
      )}
    </>
  )
}

export default User
