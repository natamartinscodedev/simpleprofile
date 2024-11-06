'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CircleCheck, Disc3, Instagram, Linkedin, Mail } from 'lucide-react'
import CardLink from '@/components/components/cardLink'
import NavBar from '@/components/Navbar'
import CardPlan from '@/components/CardPlans'
import CardInfinitLoop from '@/components/CarroselInfinitLoop'
import ImageHomePage from '../../../public/Images/Logo_Home.svg'
import Logo from '../../../public/Images/LogoBg0.svg'
import imgDesktop from '../../../public/Images/simpleprofileDesktop.jpeg'
import imgMobile from '../../../public/Images/simpleprofileMobile.png'
// import BuyButton from '@/components/button-stripe-payment'

const Home = () => {
  return (
    <>
      <NavBar />
      <main>
        {/* <BuyButton /> */}
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
              priority
            />
          </div>
        </section>
        <section className="container">
          <div className="box_img-simpleprofile">
            <div className="box_img-desktop">
              <Image
                src={imgDesktop}
                alt=""
                id="dektop"
                data-aos="fade-right"
                data-aos-offset="300"
                data-aos-easing="ease-in-sine"
                data-aos-duration="1200"
              />
            </div>
            <div className="box_img-mobile">
              <Image
                src={imgMobile}
                alt=""
                id="mobile"
                data-aos="fade-left"
                data-aos-anchor="#example-anchor"
                data-aos-offset="500"
                data-aos-duration="1500"
              />
            </div>
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
                price={'Free'}
                state={false}
                stateLink={true}
              >
                <li>
                  <CircleCheck size={20} />
                  Links
                </li>
                <li>
                  <CircleCheck size={20} />
                  Total de 6 card no plano Free
                </li>
              </CardPlan>
            </div>
            <div data-aos="fade-left" data-aos-duration="2000">
              <CardPlan
                tipePlan="Gold"
                price={'49,99'}
                state={true}
                disable={true}
                stateLink={true}
              >
                <li>
                  <CircleCheck size={20} />
                  Imagens
                </li>
                <li>
                  <CircleCheck size={20} />
                  Videos
                </li>
                <li>
                  <CircleCheck size={20} />
                  Location
                </li>
                <li>
                  <CircleCheck size={20} />
                  Nota
                </li>
                <li>
                  <CircleCheck size={20} />
                  Social Midias
                </li>
                <li>
                  <CircleCheck size={20} />
                  Infinit card!
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
              <Image src={Logo} width={150} alt="logo" priority />
            </Link>
            <div>
              <ul className="social_midia">
                <li>
                  <Link href="https://discord.gg/p8SnYKs6eZ" target="_blank">
                    <Disc3 />
                  </Link>
                </li>
                <li>
                  <Link href="https://www.linkedin.com/company/simpleprofile" target="_blank">
                    <Linkedin />
                  </Link>
                </li>
                <li>
                  <Link href="" target="_blank">
                    <Instagram />{' '}
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
  )
}

export default Home
