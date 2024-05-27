"use client"


import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import CardLink from '@/components/components/cardLink'
import ImageHomePage from '@/Images/Logo_Home.svg'
import ImageUserHome from '@/Images/User_home.png'

import NavBar from '@/components/Navbar'
import CardReport from '@/components/CardReport'

const Home = ({ t }: any) => {

    return (
        <>
            <header className="container">
                <NavBar />
            </header>
            <main >
                <section className='container box_main'>
                    <div className='box_main-info'>
                        <h1>{t.subtitle}</h1>
                        <h3>{t.description}</h3>

                        <CardLink text={`${t.btncreatelink}`} link="/pages/Login" />
                    </div>
                    <div className='box_main-image'>
                        <Image src={ImageHomePage} alt='image ilustration page user in home' />
                    </div>
                </section>
                <section>
                    <div className='card_pubi'>
                        <ul className='container'>
                            <li>Simple Profile</li>
                            <li>Simple Profile</li>
                            <li>Simple Profile</li>
                            <li>Simple Profile</li>
                            <li>Simple Profile</li>
                        </ul>
                    </div>
                    <div className='container_reports'>
                        <p>Depoimento de pessoas</p>
                        <CardReport />
                    </div>
                </section>
                <section className='card_plans'>

                </section>
            </main>
            <footer>
                <section>
                    <div>
                        <div>
                            {/* logo */}
                        </div>
                        <div>
                            {/* lijnks */}
                        </div>
                    </div>
                    <div>
                        {/* midia social */}
                    </div>
                    <div>
                        {/* direitos reservados */}
                    </div>
                </section>
            </footer>
        </>
    )
}

export default Home