'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { produce } from 'immer'
import Image from 'next/image'
import AOS from 'aos'
import 'aos/dist/aos.css'
// import uploadMidiaStorage from '@/utils/uploadMidiaStorage'
// import { uploadFileToS3 } from '@/utils/uploadFileToS3'
import { UpdateInfoUser } from '@/utils/updateInfoUser'
import DarkMode from '@/Components/ButtonDark/Index'
import { GetDataUser } from '@/utils/getInfoUser'
import { handleSubmitFileToS3 } from '@/utils/handleSubmitFileToS3'
import {
  BadgePlus,
  Disc2,
  Linkedin,
  LogOut,
  Settings,
  Twitter
} from 'lucide-react'
import CardLoadingPageUser from '@/Components/CardLoadingPageUser/index'
import ListItem from '@/Components/IsDragging/index'
import BoardContext from '@/Components/Board/context'
import NavbarBottom from '@/Components/NavBarBottom'
import BuyButton from '@/Components/button-stripe-payment'
import { WalletOptions } from '@/Components/WalletConnect/wallet_options'
import LogoDiscord from '../../../public/Images/logoDiscord.svg'

export default function User({
  params
}: {
  params: Promise<{ UserProfile: string }>
}) {
  const [nameLink, setUserProfile] = useState('')

  async function getUserProfile() {
    const userNameLink = (await params).UserProfile
    setUserProfile(userNameLink)
  }

  const router = useRouter()
  const Bucket = process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME
  const [joinUser, setJoinUser] = useState(false)
  const [user, setUser]: any = useState('')
  const [dateSharedProfile, setData] = useState(false)

  const [plan, setPlan] = useState<string>('')
  const [image, setImage]: any = useState(undefined)
  const [name, setName] = useState<string>('')
  const [bio, setBio] = useState<string>('')
  const [lists, setLists] = useState<any[]>([])
  const [link, setLink] = useState<string>('')
  const [imgCard, setImgCard] = useState<string>('')
  const [videoCard, setVideoCard] = useState<string>('')
  const [changWidth, setChangWidth] = useState('desktop')
  const [changeImgVideo, setChangeImgVideo] = useState('')
  const [settings, setSettings] = useState(false)

  // functio for change profile img
  const handleImageChangeUser = async (e: any) => {
    const file = e.target.files[0]

    if (file) {
      const { img, status }: any = handleSubmitFileToS3(file)
      console.log("IMG ==>", img, status)

      setImage(file.name)
      UpdateInfoUser({ image: `${`https://${Bucket}.s3.amazonaws.com/`}${file.name}`, nameLink })
    }
  }

  // function move cards links animation
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
    Link
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  // join in user page.
  const JoinUser = async () => {
    window.localStorage.setItem('nameUser', nameLink)
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

  useEffect(() => {
    getUserProfile()
    getUser()
    JoinUser()
    AOS.init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nameLink])

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
              {plan === 'Free' && dateSharedProfile ? <BuyButton /> : ''}
              {/*conect wallets */}
              <WalletOptions />

              {/*Conectar Dados Descentralizados Adicionais  */}
              {/* <IPFSUpload/> */}

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
                    className={` ${dateSharedProfile ? 'box_img-user' : 'hider_box-img-user'
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
                          src={image && image}
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
                          value={`${image}`}
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
                      <textarea id="bioInput" value={bio}></textarea>
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
          <div className="container_dashboard-user-and-shared-profile">
            {dateSharedProfile ? (
              <div
                className={`container_navbar-bottom ${isFixed ? 'fixed' : ''}`}
                ref={cardRef}
              >
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
                  <Link href='https://discord.gg/p8SnYKs6eZ' target='__blank'>
                    <Image
                      src={LogoDiscord}
                      width={45}
                      height={45}
                      alt='logo dicord' />
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <div className="box_login-shared-user">
                  <div className="container container_shared">
                    <div className="box_login-shared-user-link-create">
                      <Link href="/LinkPersonalize" target="__blank" className='link_midia'>
                        Criar conta
                      </Link>
                      <Link href="/Login" target="__blank" className='link_midia'>
                        Entrar
                      </Link>
                    </div>

                    <div className="box_login-shared-user-link-midia">
                      <Link href="https://discord.gg/p8SnYKs6eZ" target="__blank" className="link_discord">
                        <Image
                          src={LogoDiscord}
                          width={35}
                          height={35}
                          alt='logo dicord' />
                      </Link>

                      <Link href="https://www.linkedin.com/company/simpleprofile/ " target="__blank" className='link_midia'>
                        <Linkedin />
                        Siga nossa pagina para saber mais!
                      </Link>
                      {/* <Link href="#" target="__blank">
                        <Twitter />
                        Siga nossa rede social e ajude-nos a crescer!
                      </Link> */}
                    </div>

                    <p>© simpleprofile - 2024</p>
                  </div>
                </div>
              </>
            )}
          </div>
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
