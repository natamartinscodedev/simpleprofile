import { Link } from 'lucide-react'
import React, { useState } from 'react'
import BtnLinks from './buttomLinks'
import Midia from '@/Images/icons/image.png'
import Text from '@/Images/icons/text.png'
import Map from '@/Images/icons/map.png'

const NavbarBottom = ({ addCard, setImgCard, setLink, link}: any) => {

    const handleImageChange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImgCard(imageUrl);
        }
    };

    return (
        <div className='card_navbar-bottom'>
            <button className='btn_mylink'>Meu link</button>
            <ul>
                <BtnLinks
                    icon$img={<Link size={20} color='white' />}
                    nameHover='Link'
                    imgBoolean={false}
                    openModalType='link'
                    addCard={addCard}
                    link={link}
                    setLink={setLink}
                />
                <div className='card_imgvideo'>
                    <input
                        type="file"
                        id="imageInput"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                    <BtnLinks
                        icon$img={Midia}
                        nameHover='Image & Video'
                        imgBoolean={true}
                        openModalType='img&video'
                    />
                </div>
                <BtnLinks
                    icon$img={Text}
                    nameHover='Text'
                    imgBoolean={true}
                    openModalType='text'
                />
                <BtnLinks
                    icon$img={Map}
                    nameHover='Mapa'
                    imgBoolean={true}
                    openModalType='map'
                />
            </ul>
            <div className='btn-responsive'>
                <button>Desktop</button>
                <button>Mobile</button>
            </div>
        </div>
    )
}

export default NavbarBottom