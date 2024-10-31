'use client'

import {
  FileImage,
  FileVideo,
  Link,
  MapPinned,
  MonitorSmartphone,
  NotebookPen,
  TabletSmartphone,
  X
} from 'lucide-react'
import React, { useEffect, useState } from 'react'
import BtnLinks from './buttomLinks'
import Map from '../../../public/Images/icons/map.png'
import Text from '../../../public/Images/icons/text.png'
import QRCodeGenerator from '../QRCodeGenerator'
import uploadMidiaStorage from '@/utils/uploadMidiaStorage'

const NavbarBottom = ({
  addCardLink,
  addCardText,
  addCardMap,
  setImgCard,
  setVideoCard,
  setLink,
  link,
  imgCard,
  videoCard,
  addCardImg,
  addCardVideo,
  setChangWidth,
  nameLink,
}: any) => {
  const [openModal, setOpenModal] = useState(false)
  const [linkShared, setLinkShared] = useState('')
  const [typeInputMidia, setTypeInputMidia] = useState('')

  const handleImageChange = async (e: any) => {
    const file = e.target.files[0]
    const {downloadURL, fileType }: any = await uploadMidiaStorage(file)

    setImgCard(downloadURL)
    setTypeInputMidia(fileType)
  }

  const handleVideoChange = async (e: any) => {
    const file = e.target.files[0]
    const {downloadURL, fileType }:any = await uploadMidiaStorage(file)

    setVideoCard(downloadURL)
    setTypeInputMidia(fileType)
  }

  useEffect(() => {
    addCardImg(typeInputMidia)
    addCardVideo(typeInputMidia)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgCard, videoCard])

  const handleLinkUser = () => {
    try {
      setOpenModal(!openModal)
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
          Icon$img={<Link size={20} color="white" />}
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
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
          <BtnLinks
            Icon$img={<FileImage size={20} color="white"/>}
            nameHover="Image"
            imgBoolean={false}
            openModalType="img&video"
            typeInputMidia={typeInputMidia}
          />
        </div>

        <div className="card_imgvideo">
          <input
            type="file"
            id="videoInput"
            accept="video/*"
            multiple
            onChange={handleVideoChange}
          />
          <BtnLinks
            Icon$img={<FileVideo size={20} color="white" />}
            nameHover="Video"
            imgBoolean={false}
            openModalType="video"
            typeInputMidia={typeInputMidia}
          />
        </div>

        <BtnLinks
          Icon$img={<NotebookPen size={20} color="white"/>}
          nameHover="Text"
          imgBoolean={false}
          openModalType="text"
          addCardText={addCardText}
        />

        <BtnLinks
          Icon$img={<MapPinned size={20} color="white"/>}
          nameHover="Mapa"
          imgBoolean={false}
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
          <button id="closed" onClick={() => setOpenModal(!openModal)}>
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
