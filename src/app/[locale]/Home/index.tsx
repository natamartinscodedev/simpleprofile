"use client"


import React from 'react'
import Image from 'next/image'
import CardLink from '@/components/components/cardLink'
import ImageHomePage from '@/Images/Logo_Home.svg'
import { CircleCheck } from 'lucide-react'
import NavBar from '@/components/Navbar'
import CardPlan from '@/components/CardPlans'
import CardInfinitLoop from '@/components/CarroselInfinitLoop'

const Home = ({ lang }: any) => {
    const t = lang["Homepage"]

    return (
        <>
            <header className="container">
                <NavBar />
            </header>
            <main>
                <section className='container box_main'>
                    <div className='box_main-info'>
                        <h1>{t.subtitle}</h1>
                        <h3>{t.description}</h3>

                        <CardLink text={`${t.btncreatelink}`} link="/LinkPersonalize" />
                    </div>
                    <div className='box_main-image'>
                        <Image src={ImageHomePage} alt='image ilustration page user in home' />
                    </div>
                </section>
                <section>
                    <div className='card_pubi'>
                        <ul className='container'>
                            <li className='text-animation01'>Simple Profile</li>
                            <li className='text-animation02'>Simple Profile</li>
                            <li className='text-animation01'>Simple Profile</li>
                            <li className='text-animation02'>Simple Profile</li>
                        </ul>
                    </div>
                    <div className='container_reports'>
                        <p className='container_reports-title'>{t.reportTitle}</p>
                        <>
                            <CardInfinitLoop />
                        </>
                    </div>
                </section>
                <section className='container card_plans'>
                    <div className=''>
                        <h2>Preços dos Planos</h2>
                        <p></p>
                    </div>
                    <div className='container_plans'>
                        <CardPlan
                            tipePlan='Simple'
                            price={'Free'}
                            state={false}
                        >
                            <li><CircleCheck size={20} />tsete01</li>
                            <li><CircleCheck size={20} />teste02</li>
                            <li><CircleCheck size={20} />teste03</li>
                            <li><CircleCheck size={20} />teste03</li>
                            <li><CircleCheck size={20} />teste03</li>
                        </CardPlan>
                        <CardPlan
                            tipePlan='Gold'
                            price={'149,99'}
                            state={true}
                        >
                            <li><CircleCheck size={20} />tsete01</li>
                            <li><CircleCheck size={20} />teste02</li>
                            <li><CircleCheck size={20} />teste03</li>
                            <li><CircleCheck size={20} />teste03</li>
                            <li><CircleCheck size={20} />teste03</li>
                            <li><CircleCheck size={20} />teste03</li>
                        </CardPlan>
                    </div>
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