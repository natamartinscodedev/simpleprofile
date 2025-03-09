'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CircleCheck, Disc3, Instagram, Linkedin, Mail } from 'lucide-react'
import CardLink from '@/Components/components/cardLink'
import NavBar from '@/Components/Navbar'
import CardPlan from '@/Components/CardPlans'
import CardInfinitLoop from '@/Components/CarroselInfinitLoop'
import ImageHomePage from '../../../public/Images/Logo_Home.svg'
import Logo from '../../../public/Images/LogoBg0.svg'
import imgDesktop from '../../../public/Images/simpleprofileDesktop.jpeg'
import imgMobile from '../../../public/Images/simpleprofileMobile.png'
import LogoDiscord from '../../../public/Images/logoDiscord.svg'

const Home = () => {
  return (
    <>
      <NavBar />
      <main>
        <section className="container box_main">
          <div className="box_main-info">
            <h1 data-aos="zoom-in-up" data-aos-duration="1000">
              Professional Profile...🚀
            </h1>
            <h3 data-aos="zoom-in-up" data-aos-duration="2000">
              SimpleProfile is not just a "link in bio" it's an environment where anything can happen!
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
              What people are saying about Simple Profile...🚀
            </p>
            <>
              <CardInfinitLoop />
            </>
          </div>
        </section>
        <section className='section_info_description-simpeprofile container'>
          <h2 data-aos="fade-left" data-aos-duration="2000">
            "SimpeProfile is the best website to organize and showcase your professional journey in one place!
            Putting links to your professional networks and people in one place, with photos, videos, a quote from you on the note card?
            Only then can you create something with your own style and even more with a unique personalized link...🚀"
          </h2>
          <h3 data-aos="fade-up" data-aos-duration="2000">Let's build our space together?</h3>

          <h2 data-aos="fade-right" data-aos-duration="2000">Join our community and leave your suggestions for improvement in our professional space.</h2>
        </section>
        <section className="container card_plans">
          <div className="card_play-info">
            <h2 data-aos="fade-up">Price</h2>
          </div>
          <div className="container_plans">
            <div data-aos="fade-left" data-aos-duration="2000">
              <CardPlan
                tipePlan="Gold"
                price={20}
                state={true}
                disable={false}
                stateLink={true}
              >
                <li>
                  <CircleCheck size={20} />
                  Access all the Sass
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
                  <Link href="https://discord.gg/p8SnYKs6eZ" target="__blank" className="link_discord">
                    <Image
                      src={LogoDiscord}
                      width={30}
                      height={30}
                      alt='logo dicord' />
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.linkedin.com/company/simpleprofile"
                    target="_blank"
                  >
                    <Linkedin />
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.instagram.com/natamartinss"
                    target="_blank"
                  >
                    <Instagram />{' '}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="container_footer-box-email">
            <p>All rights reserved © 2024</p>
            <p>
              <Mail size={20} /> Email: nata.codedev@gmail.com
            </p>
          </div>
        </section>
      </footer>
    </>
  )
}

export default Home
