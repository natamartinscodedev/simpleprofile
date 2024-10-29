'use client'

import { Link, MonitorSmartphone, TabletSmartphone, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import BtnLinks from './buttomLinks'
import Midia from '../../../public/Images/icons/image.png'
import Map from '../../../public/Images/icons/map.png'
import Text from '../../../public/Images/icons/text.png'
import QRCodeGenerator from '../QRCodeGenerator'

const NavbarBottom = ({
  addCardLink,
  addCardText,
  addCardMap,
  setImgCard,
  setLink,
  link,
  imgCard,
  addCardImgVideo,
  setChangWidth,
  nameLink,
  emailUser,
  setData
}: any) => {
  const [openModal, setOpenMadl] = useState(false)
  const [linkShared, setLinkShared] = useState('')
  const [typeInputMidia, setTypeInputMidia] = useState('')

  const handleImageChange = (e: any) => {
    const file = e.target.files[0]
    const typeMidia = e.target.files[0].type
    setTypeInputMidia(typeMidia)

    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setImgCard(imageUrl)
    }
  }

  useEffect(() => {
    addCardImgVideo(typeInputMidia)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgCard])

  const handleLinkUser = () => {
    try {
      setOpenMadl(!openModal)

      const generatedLink = `${window.location.origin}/${nameLink}`
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
      <ul className="list_buttons-card">
        <BtnLinks
          icon$img={<Link size={20} color="white" />}
          nameHover="Link"
          imgBoolean={false}
          openModalType="link"
          addCardLink={addCardLink}
          link={link}
          setLink={setLink}
        />

        <div className="card_imgvideo">
          <input
            type="file"
            id="imageInput"
            accept="image/* ,video/*"
            multiple
            onChange={handleImageChange}
          />
          <BtnLinks
            icon$img={Midia}
            nameHover="Image & Video"
            imgBoolean={true}
            openModalType="img&video"
            typeInputMidia={typeInputMidia}
            addCardImgVideo={addCardImgVideo}
            imgCard={imgCard}
          />
        </div>
        <BtnLinks
          icon$img={Text}
          nameHover="Text"
          imgBoolean={true}
          openModalType="text"
          addCardText={addCardText}
        />
        <BtnLinks
          icon$img={Map}
          nameHover="Mapa"
          imgBoolean={true}
          openModalType="map"
          addCardMap={addCardMap}
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
        <div
          className="modalShareLink"
          data-aos="fade-up"
          data-aos-duration="500"
        >
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
      )}
    </div>
  )
}

export default NavbarBottom
