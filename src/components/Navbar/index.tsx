"use client";
import React, { useEffect, useState } from "react";
import DarkMode from "@/components/ButtonDark/Index";
import CardLink from "@/components/components/cardLink";
import Image from "next/image";
import Logo from "../../../public/Images/LogoBg0.svg";
import Link from "next/link";
// import Langues from '@/components/ChangeLeangue/language-switcher'

interface typeState {
  state?: any;
}

const NavBar = ({ state }: typeState) => {
  const [on, setOn] = useState(false);

  useEffect(() => {
    setOn(state);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <header className="container">
      <nav className=" container card_navbar">
        <Link href="/">
          <Image src={Logo} width={100} alt="logo" priority/>
        </Link>
        <ul>
          <li>
            <DarkMode />
          </li>
          {on ?? (
            <li>
              <CardLink text="Login" link="/Login" />
            </li>
          )}
          {/* <Langues /> */}
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
