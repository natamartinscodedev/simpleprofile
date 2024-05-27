"use client"
import React, { useEffect, useState } from 'react'
import { auth } from '@/config/firebase'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { produce } from 'immer';
import Card from '@/Components/IsDragging/index';
import BoardContext from '@/components/Board/context'
import Image from 'next/image';
import { SaveInfoUser } from '@/utils/saveInfoUser';
import { Login } from '@/auth/authServices';

const User = () => {
    const [image, setImage]: any = useState(null);
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');

    const { user, loadin } = Login()

    const handleImageChange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl);
        }
    };

    const data = [
        { id: 1, text: 'Item 1' },
        { id: 2, text: 'Item 2' },
        { id: 3, text: 'Item 3' },
        { id: 4, text: 'Item 4' },
        { id: 5, text: 'Item 5' },
        { id: 6, text: 'Item 5' },
        { id: 7, text: 'Item 5' },
    ]

    const [lists, setLists] = useState(data)

    function move(from: any, to: any) {
        setLists(produce(lists, draft => {
            const dragged = draft[from];

            draft.splice(from, 1);
            draft.splice(to, 0, dragged);

        }))
    }

    useEffect(() => {
        SaveInfoUser({
            name,
            bio,
            image,
            lists
        })
    }, [name, bio, image, lists])

    return (
        <>
            {
                loadin ? (
                    <p>Loading....</p>
                ) : (
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
                                                <input
                                                    type="text"
                                                    id="bioInput"
                                                    value={bio}
                                                    onChange={(e: any) => setBio(e.target.value)}
                                                    placeholder='Sua bio...'
                                                />
                                            </p>
                                        </div>
                                        {/* <button onClick={handleLogout}>Sair</button> */}
                                    </div>
                                    <div className='container_info-user'>
                                        <BoardContext.Provider value={{ lists, move }}>
                                            <DndProvider backend={HTML5Backend}>
                                                <div className='board_container '>
                                                    <ul>
                                                        {lists && lists.map((item, index) => (
                                                            <Card key={item.id} index={index} name={item} />
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
                )
            }
        </>
    )
}

export default User