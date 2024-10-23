import React from 'react'
import CardReport from '@/components/CardReport'
import ImageHomePage from '../../../public/Images/Logo_Home.svg'
import Image from 'next/image'
import BluerLeft from '../../../public/Images/Ellipse 7.svg'
import BluerRight from '../../../public/Images/Ellipse 7.svg'

const CardInfinitLoop = () => {
  return (
    <div className="carrosel_reports ">
      <span className="blur_left">
        <Image src={BluerLeft} width={500} height={500} alt="" />
      </span>
      <div className="container_loop-left">
        <div className="carrosel_infinit-loop-left">
          <div>
            <CardReport
              img={ImageHomePage}
              name="Naythan"
              level="Desenvolvedor Frontend"
              description="Simplismente o melhor site para organizar e mostrar minha jornada profissional em um só lugar! e ainda mais com um link personalizado unico...🚀"
            />
            <CardReport
              img={ImageHomePage}
              name="Naythan"
              level="Desenvolvedor Frontend"
              description="Simplismente o melhor site para organizar e mostrar minha jornada profissional em um só lugar! e ainda mais com um link personalizado unico...🚀"
            />
            <CardReport
              img={ImageHomePage}
              name="Naythan"
              level="Desenvolvedor Frontend"
              description="Simplismente o melhor site para organizar e mostrar minha jornada profissional em um só lugar! e ainda mais com um link personalizado unico...🚀"
            />
            <CardReport
              img={ImageHomePage}
              name="Naythan"
              level="Desenvolvedor Frontend"
              description="Simplismente o melhor site para organizar e mostrar minha jornada profissional em um só lugar! e ainda mais com um link personalizado unico...🚀"
            />
            <CardReport
              img={ImageHomePage}
              name="Naythan"
              level="Desenvolvedor Frontend"
              description="Simplismente o melhor site para organizar e mostrar minha jornada profissional em um só lugar! e ainda mais com um link personalizado unico...🚀"
            />
            <CardReport
              img={ImageHomePage}
              name="Naythan"
              level="Desenvolvedor Frontend"
              description="Simplismente o melhor site para organizar e mostrar minha jornada profissional em um só lugar! e ainda mais com um link personalizado unico...🚀"
            />
            <CardReport
              img={ImageHomePage}
              name="Naythan"
              level="Desenvolvedor Frontend"
              description="Simplismente o melhor site para organizar e mostrar minha jornada profissional em um só lugar! e ainda mais com um link personalizado unico...🚀"
            />
          </div>
          <div>
            <CardReport
              img={ImageHomePage}
              name="Naythan"
              level="Desenvolvedor Frontend"
              description="Simplismente o melhor site para organizar e mostrar minha jornada profissional em um só lugar! e ainda mais com um link personalizado unico...🚀"
            />
            <CardReport
              img={ImageHomePage}
              name="Naythan"
              level="Desenvolvedor Frontend"
              description="Simplismente o melhor site para organizar e mostrar minha jornada profissional em um só lugar! e ainda mais com um link personalizado unico...🚀"
            />
            <CardReport
              img={ImageHomePage}
              name="Naythan"
              level="Desenvolvedor Frontend"
              description="Simplismente o melhor site para organizar e mostrar minha jornada profissional em um só lugar! e ainda mais com um link personalizado unico...🚀"
            />
            <CardReport
              img={ImageHomePage}
              name="Naythan"
              level="Desenvolvedor Frontend"
              description="Simplismente o melhor site para organizar e mostrar minha jornada profissional em um só lugar! e ainda mais com um link personalizado unico...🚀"
            />
            <CardReport
              img={ImageHomePage}
              name="Naythan"
              level="Desenvolvedor Frontend"
              description="Simplismente o melhor site para organizar e mostrar minha jornada profissional em um só lugar! e ainda mais com um link personalizado unico...🚀"
            />
            <CardReport
              img={ImageHomePage}
              name="Naythan"
              level="Desenvolvedor Frontend"
              description="Simplismente o melhor site para organizar e mostrar minha jornada profissional em um só lugar! e ainda mais com um link personalizado unico...🚀"
            />
            <CardReport
              img={ImageHomePage}
              name="Naythan"
              level="Desenvolvedor Frontend"
              description="Simplismente o melhor site para organizar e mostrar minha jornada profissional em um só lugar! e ainda mais com um link personalizado unico...🚀"
            />
          </div>
        </div>
      </div>
      <span className="blur_right">
        <Image src={BluerRight} width={500} height={500} alt="" />
      </span>
    </div>
  )
}

export default CardInfinitLoop
