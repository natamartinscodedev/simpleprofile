"use client";

import React, { useEffect, useState } from "react";
import {
  SaveKeyLocalStorage,
  VerificarChaveValida,
} from "@/utils/saveKeyLocalStorage";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { produce } from "immer";
import Card from "@/components/IsDragging/index";
import BoardContext from "@/components/Board/context";
import Image from "next/image";
import { updateInfoUser } from "@/utils/updateInfoUser";
import { Login } from "@/auth/authServices";
import NavbarBottom from "@/components/NavBarBottom";
import { useSearchParams, useRouter } from "next/navigation";
import { GetDataUser } from "@/utils/getInfoUser";
import { BadgePlus } from "lucide-react";
import { signInWithEmailLink } from "firebase/auth";
import { auth } from "@/firebase/firebase";

const User = ({ params }: any) => {
  const nameLink: any = params.username;
  const searchParams = useSearchParams();
  const router = useRouter();
  const apiKey = searchParams.get("apiKey");
  const oobCode = searchParams.get("oobCode");
  const { user, loadin } = Login();

  const [dataUser, setDataUser]: any = useState("");
  console.log("User on? ==>", dataUser);

  const [image, setImage]: any = useState("");
  const [name, setName]: any = useState("");
  const [bio, setBio]: any = useState("");
  const [lists, setLists] = useState([]);
  const [link, setLink] = useState("");
  const [imgCard, setImgCard]: any = useState();

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  function move(from: any, to: any) {
    setLists(
      produce(lists, (draft) => {
        const dragged = draft[from];

        draft.splice(from, 1);
        draft.splice(to, 0, dragged);
      })
    );
  }

  const addCard = async () => {
    setLists(
      produce(lists, (draft: any) => {
        draft.push({ id: 0, type: "linkCard", link: link });
      })
    );
    setLink("");
  };

  const addCardImgVideo = async () => {
    if (imgCard) {
      setLists(
        produce(lists, (draft: any) => {
          draft.push({ id: 0, type: "imgCard", url: imgCard });
        })
      );
    }
    setImgCard("");
  };

  if (imgCard) {
    addCardImgVideo();
  }

  useEffect(() => {
    SaveKeyLocalStorage(apiKey, oobCode);

    // const handleSignInWithEmailLink = async () => {
    //   let email = window.localStorage.getItem("emailForSignIn");

    //   if (!email) {
    //     alert("E-mail para login não encontrado, Faça login novamente!");
    //     return router.push("/Login");
    //   }

    //   try {
    //     await signInWithEmailLink(auth, email, window.location.href);
    //     return router.replace(`/User/${nameLink}`);
    //   } catch (error) {
    //     console.error("Erro ao completar o login com link mágico:", error);
    //     router.push("/error");
    //   }
    // };

    try {
      // if (VerificarChaveValida(apiKey)) {
      //     handleSignInWithEmailLink()
      // }
    } catch (err: any) {
      window.localStorage.removeItem("emailForSignIn");
      window.localStorage.removeItem("apiKey");
      window.localStorage.removeItem("expiryTime");
      window.localStorage.removeItem("oobCode");

      router.push("/Login");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // save date in realtime
  const getUser = async () => {
    const email = window.localStorage.getItem("emailForSignIn");
    const User: any = await GetDataUser(email);
    const data = User.User;
    setDataUser(data);
  };

  useEffect(() => {
    getUser();

    updateInfoUser({
      nameLink,
      name,
      bio,
      image,
      lists,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, bio, image, lists, nameLink]);

  return (
    <>
      {loadin ? (
        <p>Loading....</p>
      ) : (
        <>
          <div>
            {!user && (
              <div className="container_user container">
                <div className="box-infor_user">
                  <div className="box_info-user">
                    <div className="box_img-user">
                      {image ? (
                        <div>
                          <span>
                            <BadgePlus size={30} />
                          </span>
                          <input
                            type="file"
                            id="imageInput"
                            accept="image/*"
                            onChange={handleImageChange}
                          />
                          <Image
                            src={image}
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
                            onChange={handleImageChange}
                          />
                        </div>
                      )}
                    </div>
                    <h1>
                      <input
                        type="text"
                        id="nameInput"
                        value={dataUser.email}
                        onChange={(e: any) => setName(e.target.value)}
                        placeholder="Seu nome..."
                      />
                    </h1>
                    <p>
                      <textarea
                        id="bioInput"
                        value={dataUser.email}
                        onChange={(e: any) => setBio(e.target.value)}
                        placeholder="Sua bio..."
                      ></textarea>
                    </p>
                  </div>
                  {/* <button onClick={handleLogout}>Sair</button> */}
                </div>
                <div className="container_info-user">
                  <BoardContext.Provider value={{ lists, move }}>
                    <DndProvider backend={HTML5Backend}>
                      <div className="board_container ">
                        <ul>
                          {lists &&
                            lists.map((date: any, index) => (
                              <Card
                                key={index}
                                index={index}
                                date={date}
                                lists={lists}
                                setLists={setLists}
                              />
                            ))}
                        </ul>
                      </div>
                    </DndProvider>
                  </BoardContext.Provider>
                </div>
              </div>
            )}
          </div>
          <NavbarBottom
            addCard={addCard}
            link={link}
            setLink={setLink}
            setImgCard={setImgCard}
            addCardImgVideo={addCardImgVideo}
          />
        </>
      )}
    </>
  );
};

export default User;
