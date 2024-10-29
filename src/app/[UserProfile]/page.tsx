'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { produce } from 'immer'
import Image from 'next/image'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { BadgePlus, LogOut, Settings } from 'lucide-react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { GetDataUser } from '@/utils/getInfoUser'
import ListItem from '@/components/IsDragging/index'
import BoardContext from '@/components/Board/context'
import { UpdateInfoUser } from '@/utils/updateInfoUser'
import NavbarBottom from '@/components/NavBarBottom'
import BuyButton from '@/components/button-stripe-payment'

const User = ({ params }: any) => {
  const nameLink: any = params.UserProfile
  // const { data: session }: any = useSession()
  const router = useRouter()
  const [joinUser, setJoinUser] = useState(false)
  const [user, setUser] = useState('')
  const [dateSharedProfile, setData] = useState('')

  const [plan, setPlan] = useState<string>('')
  const [image, setImage] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [bio, setBio] = useState<string>('')
  const [lists, setLists] = useState<any[]>([])
  const [link, setLink] = useState<string>('')
  const [imgCard, setImgCard] = useState<string>('')
  const [changWidth, setChangWidth] = useState('desktop')
  const [changeImgVideo, setChangeImgVideo] = useState('')
  const [settings, setSettings] = useState(false)

  const handleImageChangeUser = (e: any) => {
    const file = e.target.files[0]
    if (file) {
      const imageUrl: any = URL.createObjectURL(file)

      setImage(imageUrl && imageUrl)
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

  const addCardLink = async () => {
    const newList = produce(lists, (draft: any) => {
      draft.push({ id: Date.now(), type: 'linkCard', link: link })
    })

    setLists(newList)
    UpdateInfoUser({ lists: newList, nameLink })
    setLink('')
  }

  const addCardMap = async () => {
    const newList = produce(lists, (draft: any) => {
      draft.push({ id: Date.now(), type: 'map', link: link })
    })

    setLists(newList)
    UpdateInfoUser({ lists: newList, nameLink })
    setLink('')
  }

  const addCardText = async () => {
    const newList = produce(lists, (draft: any) => {
      draft.push({ id: Date.now(), type: 'text', link: link })
    })

    setLists(newList)
    UpdateInfoUser({ lists: newList, nameLink })
    setLink('')
  }

  const addCardImgVideo = async (e: any) => {
    setChangeImgVideo(e)
    if (imgCard) {
      const newImgVd = produce(lists, (draft: any) => {
        draft.push({ id: Date.now(), type: 'imgCard', url: imgCard })
      })

      setLists(newImgVd)

      UpdateInfoUser({ lists: newImgVd, nameLink })
      setImgCard('')
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
    signOut()
    router.push('/')
  }

  const getUser = async () => {
    const emailUserProfile = window.localStorage.getItem('emailForSignIn')

    if (emailUserProfile) {
      const User: any = await GetDataUser(emailUserProfile)
      const { name, bio, image, lists, plans, email } = User.User

      setPlan(plans)
      setName(name)
      setBio(bio)
      setImage(image)
      setLists(lists)
      UpdateInfoUser({ nameLink: nameLink })
    }
  }

  useEffect(() => {
    // window.location.reload()
  }, [plan, image, name, bio, lists, imgCard])

  // join ins User page
  const JoinUser = async () => {
    const email = window.localStorage.getItem('emailForSignIn')
    const SharedProfile: any = window.localStorage.getItem('sharedProfile')
    const { User }: any = await GetDataUser(email)
    setData(SharedProfile)

    if (User && User.email === email) {
      setJoinUser(!joinUser)
      setUser(User)
    } else {
      alert('Você não possue uma conta! Tente novamente com os dados correto!')
      router.push('/Login')
    }
  }

  useEffect(() => {
    getUser()
    JoinUser()
    AOS.init()
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
              {plan === 'Free' && dateSharedProfile === 'true' ? (
                <BuyButton />
              ) : (
                ''
              )}
              {dateSharedProfile === 'true' && (
                <button onClick={() => HandleSignOut()} className="sing-out">
                  <LogOut />
                </button>
              )}
            </div>
            <div className="container_user container">
              <div className="container_infor-user">
                <div className="box_info-user">
                  <div
                    className={` ${
                      dateSharedProfile === 'true'
                        ? 'box_img-user'
                        : 'hider_box-img-user'
                    }`}
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
                          src={image}
                          alt="Selected"
                          width={200}
                          height={200}
                          className="img_user-profile"
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
                    {dateSharedProfile === 'true' ? (
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
                    {dateSharedProfile === 'true' ? (
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
                              changeImgVideo={changeImgVideo}
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
            {dateSharedProfile === 'true' ? (
              <div className="container_navbar-bottom">
                <div className="container_settings">
                  <button onClick={() => setSettings(!settings)}>
                    <Settings />
                    <span>Configuração</span>
                  </button>
                  {settings && (
                    <>
                      <div className="box_settings">
                        <p>mudar senha!</p>
                      </div>
                    </>
                  )}
                </div>

                <NavbarBottom
                  addCardLink={addCardLink}
                  addCardText={addCardText}
                  addCardMap={addCardMap}
                  addCardImgVideo={addCardImgVideo}
                  link={link}
                  setLink={setLink}
                  setImgCard={setImgCard}
                  imgCard={imgCard}
                  setChangWidth={setChangWidth}
                  nameLink={nameLink}
                />
                <div>
                  <b>© SimpleProfile - 2024</b>
                </div>
              </div>
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
