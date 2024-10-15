"use client";

import React from "react";
import Image from "next/image";
import CardLink from "@/components/components/cardLink";
import ImageHomePage from "@/Images/Logo_Home.svg";
import Logo from "@/Images/Logo.svg";
import { CircleCheck, Disc3, Instagram, Linkedin, Mail } from "lucide-react";
import NavBar from "@/components/Navbar";
import CardPlan from "@/components/CardPlans";
import CardInfinitLoop from "@/components/CarroselInfinitLoop";
import Link from "next/link";

const Home = () => {
  return (
    <>
      <NavBar />
      <main>
        <section className="container box_main">
          <div className="box_main-info">
            <h1 data-aos="zoom-in-up" data-aos-duration="1000">
              Professional Profile
            </h1>
            <h3 data-aos="zoom-in-up" data-aos-duration="2000">
              Sua página pessoal para mostrar quem você é e seu trabalho.
              Compartilhe seu perfil com seu link personalizado!
            </h3>

            <CardLink text="Crie seu link" link="/LinkPersonalize" />
          </div>
          <div
            className="box_main-image"
            data-aos="zoom-in-left"
            data-aos-duration="2000"
          >
            <Image
              src={ImageHomePage}
              alt="image ilustration page user in home"
            />
          </div>
        </section>
        <section>
          <div className="container_loop">
            <div className="card_pubi">
              <ul className="container">
                <li className="text-animation01">Simple Profile</li>
                <li className="text-animation02">Simple Profile</li>
                <li className="text-animation01">Simple Profile</li>
                <li className="text-animation02">Simple Profile</li>
              </ul>
              <ul className="container">
                <li className="text-animation01">Simple Profile</li>
                <li className="text-animation02">Simple Profile</li>
                <li className="text-animation01">Simple Profile</li>
                <li className="text-animation02">Simple Profile</li>
              </ul>
            </div>
          </div>
          <div className="container_reports">
            <p
              className="container_reports-title"
              data-aos="fade-up"
              data-aos-duration="2000"
            >
              O que as pessoas estão dizendo sobre o Simple Profile...🚀
            </p>
            <>
              <CardInfinitLoop />
            </>
          </div>
        </section>
        <section className="container card_plans">
          <div className="card_play-info">
            <h2 data-aos="fade-up">Preço dos Planos</h2>
          </div>
          <div className="container_plans">
            <div data-aos="fade-right" data-aos-duration="2000">
              <CardPlan
                tipePlan="Simple"
                price={"Free"}
                state={false}
                stateLink={true}
              >
                <li>
                  <CircleCheck size={20} />
                  tsete01
                </li>
                <li>
                  <CircleCheck size={20} />
                  teste02
                </li>
                <li>
                  <CircleCheck size={20} />
                  teste03
                </li>
                <li>
                  <CircleCheck size={20} />
                  teste03
                </li>
                <li>
                  <CircleCheck size={20} />
                  teste03
                </li>
              </CardPlan>
            </div>
            <div data-aos="fade-left" data-aos-duration="2000">
              <CardPlan
                tipePlan="Gold"
                price={"89,99"}
                state={true}
                disable={true}
                stateLink={true}
              >
                <li>
                  <CircleCheck size={20} />
                  tsete01
                </li>
                <li>
                  <CircleCheck size={20} />
                  teste02
                </li>
                <li>
                  <CircleCheck size={20} />
                  teste03
                </li>
                <li>
                  <CircleCheck size={20} />
                  teste03
                </li>
                <li>
                  <CircleCheck size={20} />
                  teste03
                </li>
                <li>
                  <CircleCheck size={20} />
                  teste03
                </li>
              </CardPlan>
            </div>
          </div>
        </section>
      </main>
      <footer className="container">
        <section className="container_footer">
          <div className="container_footer-box-info">
            <Link href="/">
              <Image src={Logo} width={150} alt="logo" />
            </Link>
            <div>
              <ul>
                <li>
                  <Link href="">About </Link>
                </li>
                <li>
                  <Link href="">Company </Link>
                </li>
                <li>
                  <Link href="">Home </Link>
                </li>
              </ul>
              <ul>
                <li>
                  <Link href="">Contact </Link>
                </li>
                <li>
                  <Link href="">Email </Link>
                </li>
                <li>
                  <Link href="">locale </Link>
                </li>
              </ul>
              <ul className="social_midia">
                <li>
                  <Link href="">
                    <Disc3 />
                  </Link>
                </li>
                <li>
                  <Link href="">
                    <Linkedin />
                  </Link>
                </li>
                <li>
                  <Link href="">
                    <Instagram />{" "}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="container_footer-box-email">
            <p>Todos os direitor reservados © 2024</p>
            <p>
              <Mail size={20} /> Email
            </p>
          </div>
        </section>
      </footer>
    </>
  );
};

export default Home;
