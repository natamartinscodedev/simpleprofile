import React from 'react'
import CardReport from '@/components/CardReport'
import ImageHomePage from '@/Images/Logo_Home.svg'
import Image from 'next/image'
import BluerLeft from '@/Images/Ellipse 7.svg'
import BluerRight from '@/Images/Ellipse 7.svg'

const CardInfinitLoop = () => {
    return (
        <div className='carrosel_reports carrosel_infinit-loop'>
            <span className='blur_left'>
                <Image src={BluerLeft} alt='' />
            </span>
            <div className='left'>
                <div>
                    <CardReport
                        img={ImageHomePage}
                        name='Naythan'
                        level='Desenvolvedor Frontend'
                        description='Simplismente o melhor site para organizar e mostrar minha jornada profissional em um só lugar! e ainda mais com um link personalizado unico...🚀'
                    />
                    <CardReport
                        img={ImageHomePage}
                        name='Naythan'
                        level='Desenvolvedor Frontend'
                        description='Simplismente o melhor site para organizar e mostrar minha jornada profissional em um só lugar! e ainda mais com um link personalizado unico...🚀'
                    />
                    <CardReport
                        img={ImageHomePage}
                        name='Naythan'
                        level='Desenvolvedor Frontend'
                        description='Simplismente o melhor site para organizar e mostrar minha jornada profissional em um só lugar! e ainda mais com um link personalizado unico...🚀'
                    />
                    <CardReport
                        img={ImageHomePage}
                        name='Naythan'
                        level='Desenvolvedor Frontend'
                        description='Simplismente o melhor site para organizar e mostrar minha jornada profissional em um só lugar! e ainda mais com um link personalizado unico...🚀'
                    />
                    <CardReport
                        img={ImageHomePage}
                        name='Naythan'
                        level='Desenvolvedor Frontend'
                        description='Simplismente o melhor site para organizar e mostrar minha jornada profissional em um só lugar! e ainda mais com um link personalizado unico...🚀'
                    />
                </div>
                <div>
                    <CardReport
                        img={ImageHomePage}
                        name='Naythan'
                        level='Desenvolvedor Frontend'
                        description='Simplismente o melhor site para organizar e mostrar minha jornada profissional em um só lugar! e ainda mais com um link personalizado unico...🚀'
                    />
                    <CardReport
                        img={ImageHomePage}
                        name='Naythan'
                        level='Desenvolvedor Frontend'
                        description='Simplismente o melhor site para organizar e mostrar minha jornada profissional em um só lugar! e ainda mais com um link personalizado unico...🚀'
                    />
                    <CardReport
                        img={ImageHomePage}
                        name='Naythan'
                        level='Desenvolvedor Frontend'
                        description='Simplismente o melhor site para organizar e mostrar minha jornada profissional em um só lugar! e ainda mais com um link personalizado unico...🚀'
                    />
                    <CardReport
                        img={ImageHomePage}
                        name='Naythan'
                        level='Desenvolvedor Frontend'
                        description='Simplismente o melhor site para organizar e mostrar minha jornada profissional em um só lugar! e ainda mais com um link personalizado unico...🚀'
                    />
                    <CardReport
                        img={ImageHomePage}
                        name='Naythan'
                        level='Desenvolvedor Frontend'
                        description='Simplismente o melhor site para organizar e mostrar minha jornada profissional em um só lugar! e ainda mais com um link personalizado unico...🚀'
                    />
                </div>
            </div>
            <span className='blur_right'>
                <Image src={BluerRight} alt='' />
            </span>
        </div>
    )
}

export default CardInfinitLoop