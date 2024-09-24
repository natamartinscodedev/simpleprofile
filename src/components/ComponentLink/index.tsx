"use client";

import React, { useEffect, useState } from "react";
import { fetchDateNameLink } from "@/utils/fetchDateNameLinks";
import Link from "next/link";
import { Github, Instagram, Linkedin } from "lucide-react";

const CardLink = ({ link }: any) => {
  const [date, setDate]: any = useState("");
  const [webNameLink, setWebNameLink]: any = useState("");
  const CardGithub = () => {
    return (
      <>
        <div>
          <span className={webNameLink === "GitHub" ? "black" : ""} />
          {/* <Image src={ImgGithub} alt='' /> */}
          <Github size={50} />
          <h2>{date.name}</h2>
        </div>
        <Link href="">Seguir</Link>
      </>
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { dateLink, WebName } = await fetchDateNameLink(link);

        setDate(dateLink);
        setWebNameLink(WebName);
      } catch (error) {
        console.error("Error fetching metadata", error);
      }
    };

    fetchData();
  }, [link]);

  return (
    <div className="card-link">
      {webNameLink === "GitHub" && CardGithub()}
      {webNameLink === "LinkedIn" && (
        <>
          <div>
            <span className={webNameLink === "LinkedIn" ? "bluer" : ""} />
            {/* <Image src={ImgLinkedin} alt='' /> */}
            <Linkedin size={50} />
            <p>{webNameLink}.com</p>
          </div>
          <Link href="">Seguir</Link>
        </>
      )}
      {webNameLink === "Instagram" && (
        <>
          <div>
            <span className={webNameLink === "Instagram" ? "linear" : ""} />
            {/* <Image src={ImgInstagram} alt='' /> */}
            <Instagram size={50} />
            <p>{webNameLink}.com</p>
          </div>
          <Link href="">Seguir</Link>
        </>
      )}
    </div>
  );
};

export default CardLink;
