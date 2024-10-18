'use client'

import { Link, MonitorSmartphone, TabletSmartphone, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import BtnLinks from './buttomLinks'
import Midia from '@/Images/icons/image.png'
import Text from '@/Images/icons/text.png'
import Map from '@/Images/icons/map.png'
import QRCodeGenerator from '../QRCodeGenerator'

const NavbarBottom = ({
  addCard,
  setImgCard,
  setLink,
  link,
  imgCard,
  addCardImgVideo,
  setChangWidth,
  nameLink
}: any) => {
  // const router: any = useRouter()
  const [openModal, setOpenMadl] = useState(false)
  const [linkShared, setLinkShared] = useState('')

  const handleImageChange = (e: any) => {
    const file = e.target.files[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setImgCard(imageUrl)
    }
  }

  useEffect(() => {
    addCardImgVideo()
  }, [imgCard])

  const handleLinkUser = () => {
    setOpenMadl(!openModal)

    try {
      const generatedLink = `${window.location.origin}/User/${nameLink}?active=true`
      setLinkShared(generatedLink)
    } catch (err) {
      console.log('ERR ==>', err)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(linkShared)
    alert('Link copiado!')
  }

  return (
    <div className="card_navbar-bottom">
      <button className="btn_mylink" onClick={() => handleLinkUser()}>
        Meu link
      </button>
      <ul>
        <BtnLinks
          icon$img={<Link size={20} color="white" />}
          nameHover="Link"
          imgBoolean={false}
          openModalType="link"
          addCard={addCard}
          link={link}
          setLink={setLink}
        />
        <div className="card_imgvideo">
          <input
            type="file"
            id="imageInput"
            accept="image/*"
            onChange={handleImageChange}
          />
          <BtnLinks
            icon$img={Midia}
            nameHover="Image & Video"
            imgBoolean={true}
            openModalType="img&video"
          />
        </div>
        {/* <BtnLinks
          icon$img={Text}
          nameHover="Text"
          imgBoolean={true}
          openModalType="text"
        /> */}
        <BtnLinks
          icon$img={Map}
          nameHover="Mapa"
          imgBoolean={true}
          openModalType="map"
        />
      </ul>
      <div className="btn-responsive">
        <button onClick={() => setChangWidth('desktop')}>
          <MonitorSmartphone size={20} />
        </button>
        <button onClick={() => setChangWidth('mobile')}>
          <TabletSmartphone size={20} />
        </button>
      </div>
      {openModal && (
        <>
          <div className="modalShareLink">
            <button id="closed" onClick={() => setOpenMadl(!openModal)}>
              <X />
            </button>
            <h2>Compartilhe seu perfil com quem você quiser!</h2>
            <QRCodeGenerator linkQrcode={linkShared} />
            <p>link: {linkShared}</p>
            <button id="btn_copy" onClick={() => handleCopy()}>
              Copiar link
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default NavbarBottom
