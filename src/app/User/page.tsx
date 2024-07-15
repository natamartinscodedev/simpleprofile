"use client"


import React, { useEffect, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { produce } from 'immer'
import Card from '@/components/IsDragging/index'
import BoardContext from '@/components/Board/context'
import Image from 'next/image'
import { SaveInfoUser } from '@/utils/saveInfoUser'
import { GetDataUser } from '@/utils/fetchGetDataUser'
import { Login } from '@/auth/authServices'
import NavbarBottom from '@/components/NavBarBottom'
import { useRouter } from 'next/navigation'
// import { getAuth, isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth'

const User = () => {
    const { user, loadin } = Login()
    // console.log("User ==>", user)
    const router = useRouter();
    const [image, setImage]: any = useState(null)
    const [name, setName] = useState('')
    const [bio, setBio] = useState('')
    const [lists, setLists] = useState([])
    const [link, setLink] = useState('')
    const [imgCard, setImgCard]: any = useState(null)

    const handleImageChange = (e: any) => {
        const file = e.target.files[0]
        if (file) {
            const imageUrl = URL.createObjectURL(file)
            setImage(imageUrl)
        }
    }

    function move(from: any, to: any) {
        setLists(produce(lists, draft => {
            const dragged = draft[from]

            draft.splice(from, 1)
            draft.splice(to, 0, dragged)

        }))
    }

    const addCard = async () => {
        setLists(produce(lists, (draft: any) => {
            draft.push({ id: 0, type: 'linkCard', link: link })
        }))
        setLink("")
    }

    const addCardImgVideo = async () => {
        if (imgCard) {
            setLists(produce(lists, (draft: any) => {
                draft.push({ id: 0, type: 'imgCard', url: imgCard })
            }))
        }
        setImgCard("")
    }

    if (imgCard) {
        addCardImgVideo()
    }

    useEffect(() => {
                SaveInfoUser({
            name,
            bio,
            image,
            lists
        })
    }, [name, bio, image, lists,])

    return (
        <>
            {
                loadin ? (
                    <p>Loading....</p>
                ) : (
                    <>
                        <div>
                            {
                                user && (
                                    <div className='container_user container'>
                                        <div className='box-infor_user'>
                                            <div className='box_info-user'>
                                                <div className='box_img-user'>
                                                    {image ? (
                                                        <div>
                                                            <Image src={image} alt="Selected" width={200} height={200} />
                                                        </div>
                                                    ) : (
                                                        <input
                                                            type="file"
                                                            id="imageInput"
                                                            accept="image/*"
                                                            onChange={handleImageChange}
                                                        />
                                                    )}
                                                </div>
                                                <h1>
                                                    <input
                                                        type="text"
                                                        id="nameInput"
                                                        value={name}
                                                        onChange={(e: any) => setName(e.target.value)}
                                                        placeholder='Seu nome...'
                                                    />
                                                </h1>
                                                <p>
                                                    <textarea
                                                        id="bioInput"
                                                        value={bio}
                                                        onChange={(e: any) => setBio(e.target.value)}
                                                        placeholder='Sua bio...'
                                                    ></textarea>
                                                </p>
                                            </div>
                                            {/* <button onClick={handleLogout}>Sair</button> */}
                                        </div>
                                        <div className='container_info-user'>
                                            <BoardContext.Provider value={{ lists, move }}>
                                                <DndProvider backend={HTML5Backend}>
                                                    <div className='board_container '>
                                                        <ul>
                                                            {lists && lists.map((date: any, index) => (
                                                                <Card key={index} index={index} date={date} />

                                                            ))}
                                                        </ul>
                                                    </div>
                                                </DndProvider>
                                            </BoardContext.Provider>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                        <NavbarBottom
                            addCard={addCard}
                            link={link}
                            setLink={setLink}
                            setImgCard={setImgCard}
                            addCardImgVideo={addCardImgVideo}
                        />
                    </>
                )
            }
        </>
    )
}

export default User