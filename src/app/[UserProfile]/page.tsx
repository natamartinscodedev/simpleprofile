'use client'

import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { produce } from 'immer'
import Image from 'next/image'
import AOS from 'aos'
import 'aos/dist/aos.css'
import DarkMode from '@/components/ButtonDark/Index'
import { BadgePlus, LogOut, Settings } from 'lucide-react'
import CardLoadingPageUser from '@/components/CardLoadingPageUser/index'
// import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { GetDataUser } from '@/utils/getInfoUser'
import uploadMidiaStorage from '@/utils/uploadMidiaStorage'
import ListItem from '@/components/IsDragging/index'
import BoardContext from '@/components/Board/context'
import { UpdateInfoUser } from '@/utils/updateInfoUser'
import NavbarBottom from '@/components/NavBarBottom'
import BuyButton from '@/components/button-stripe-payment'

const User = ({ params }: any) => {
  const nameLink: any = params.UserProfile
  const router = useRouter()
  const [joinUser, setJoinUser] = useState(false)
  const [user, setUser]: any = useState('')
  const [dateSharedProfile, setData] = useState(false)

  const [plan, setPlan] = useState<string>('')
  const [image, setImage] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [bio, setBio] = useState<string>('')
  const [lists, setLists] = useState<any[]>([])
  const [link, setLink] = useState<string>('')
  const [imgCard, setImgCard] = useState<string>('')
  const [videoCard, setVideoCard] = useState<string>('')
  const [changWidth, setChangWidth] = useState('desktop')
  const [changeImgVideo, setChangeImgVideo] = useState('')
  const [settings, setSettings] = useState(false)

  const handleImageChangeUser = async (e: any) => {
    const file = e.target.files[0]
    if (file) {
      const imageUrl: any = URL.createObjectURL(file)
      const { downloadURL, fileType }: any = await uploadMidiaStorage(file)

      setImage(downloadURL)
      UpdateInfoUser({ image: downloadURL, nameLink })
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
      draft.push({ id: Date.now(), type: 'text', text: '' })
    })

    setLists(newList)
    UpdateInfoUser({ lists: newList, nameLink })
    setLink('')
  }

  const addCardImg = async (e: any) => {
    setChangeImgVideo(e)
    if (imgCard) {
      const newImg = produce(lists, (draft: any) => {
        draft.push({ id: Date.now(), type: 'imgCard', url: imgCard })
      })
      setLists(newImg)
      UpdateInfoUser({ lists: newImg, nameLink })
      setImgCard('')
    }
  }

  const addCardVideo = async (e: any) => {
    setChangeImgVideo(e)
    if (videoCard) {
      const newVd = produce(lists, (draft: any) => {
        draft.push({ id: Date.now(), type: 'videoCard', url: videoCard })
      })
      setLists(newVd)
      UpdateInfoUser({ lists: newVd, nameLink })
      setVideoCard('')
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

  //
  const cardRef: any = useRef(null)
  const footerRef: any = useRef(null)
  const [isFixed, setIsFixed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (cardRef.current && footerRef.current) {
        const footerTop: any = footerRef.current.getBoundingClientRect().top
        const cardBottom: any = cardRef.current.getBoundingClientRect().bottom

        if (footerTop - cardBottom <= 36) {
          if (!dateSharedProfile) {
            setIsFixed(true)
          } else {
            setIsFixed(false)
          }
        } else {
          setIsFixed(false)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isFixed])
  //

  const HandleSignOut = () => {
    if (joinUser && user) {
      // signOut()
      window.localStorage.removeItem('emailForSignIn')
      window.localStorage.removeItem('sharedProfile')
      return router.push('/')
    }
  }

  const getUser = async () => {
    // const emailUserProfile = window.localStorage.getItem('emailForSignIn')

    if (nameLink) {
      const User: any = await GetDataUser({ nameLink })
      const { name, bio, image, lists, plans, email } = User.User

      setPlan(plans)
      setName(name)
      setBio(bio)
      setImage(image)
      setLists(lists)
      setUser(User.User)
      UpdateInfoUser({ nameLink: nameLink })
    }
  }

  // join ins User page
  const JoinUser = async () => {
    // const email = window.localStorage.getItem('emailForSignIn')
    const SharedProfile: any = window.localStorage.getItem('sharedProfile')
    const { User }: any = await GetDataUser({ nameLink })

    if (SharedProfile === 'true') {
      setData(true)
    }

    if (User && User.nameLink === nameLink) {
      setJoinUser(!joinUser)
      setUser(User)
    }
  }

  // useEffect(() => {
  //   // window.location.reload()
  //   // getUser()
  // }, [plan, image, name, bio, lists, imgCard])
  //

  useEffect(() => {
    getUser()
    JoinUser()
    AOS.init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {joinUser ? (
        <>
          <div
            className={
              changWidth === 'desktop'
                ? 'change_width-desktop'
                : 'change_width-mobile'
            }
          >
            <div className="container_nav-link container">
              {plan === 'Free' && dateSharedProfile ? (
                <BuyButton />
              ) : (
                ''
              )}
              {dateSharedProfile && (
                <>
                  <DarkMode />
                  <button onClick={HandleSignOut} className="sing-out">
                    <LogOut />
                  </button>
                </>
              )}
            </div>
            <div className="container_user container">
              <div className="container_infor-user">
                <div className="box_info-user">
                  <div
                    className={` ${
                      dateSharedProfile
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
                    {dateSharedProfile ? (
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
                    {dateSharedProfile ? (
                      <textarea
                        id="bioInput"
                        value={bio}
                        onChange={(e: any) => handleChangeBio(e.target.value)}
                        placeholder="Sua bio..."
                      ></textarea>
                    ) : (
                      <textarea
                        id="bioInput"
                        value={bio}
                      ></textarea>
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
            {dateSharedProfile ? (
              <div className={`container_navbar-bottom ${isFixed ? 'fixed' : ''}`} ref={cardRef}>
                <div className="container_settings">
                  <button onClick={() => setSettings(!settings)}>
                    <Settings />
                    <span>Configuração</span>
                  </button>
                  {settings && (
                    <>
                      <div className="box_settings" data-aos="fade-up">
                        <div className="card_settings-list">
                          <p>Mudar LinkPersonalizado</p>
                          <p>/{nameLink}</p>
                        </div>
                        <div className="card_settings-list">
                          <p>Mudar Email</p>
                          <p>{user.email}</p>
                        </div>
                        <div className="card_settings-list">
                          <p>Mudar Senha</p>
                          <p>************</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <NavbarBottom
                  addCardLink={addCardLink}
                  addCardText={addCardText}
                  addCardMap={addCardMap}
                  addCardImg={addCardImg}
                  addCardVideo={addCardVideo}

                  setLink={setLink}
                  setChangWidth={setChangWidth}
                  setImgCard={setImgCard}
                  setVideoCard={setVideoCard}

                  lists={lists}
                  plan={plan}
                  dateSharedProfile={dateSharedProfile}
                  imgCard={imgCard}
                  videoCard={videoCard}
                  link={link}
                  nameLink={nameLink}
                />

                <div className="container_logo-info">
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
                    Entrar
                  </Link>
                </div>
              </>
            )}
          </>
          <footer className="container container_footer-user" ref={footerRef}>
            <div className="container_settings-footer">
              <button onClick={() => setSettings(!settings)}>
                <Settings />
                <span>Configuração</span>
              </button>
              {settings && (
                <>
                  <div className="box_settings">
                    <div className="card_settings-list">
                      <p>Mudar LinkPersonalizado</p>
                      <p>/{nameLink}</p>
                    </div>
                    <div className="card_settings-list">
                      <p>Mudar Email</p>
                      <p>{user.email}</p>
                    </div>
                    <div className="card_settings-list">
                      <p>Mudar Senha</p>
                      <p>************</p>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="container_logo-info-footer">
              <b>© SimpleProfile - 2024</b>
            </div>
          </footer>
        </>
      ) : (
        <CardLoadingPageUser />
      )}
    </>
  )
}

export default User
