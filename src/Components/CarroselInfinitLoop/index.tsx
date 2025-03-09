import React from 'react'
import CardReport from '@/Components/CardReport'
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
              description="Simply the best website to organize and showcase my professional journey in one place! and even more so with a unique personalized link...🚀"
            />
            <CardReport
              img={ImageHomePage}
              name="Naythan"
              level="Desenvolvedor Frontend"
              description="Simply the best website to organize and showcase my professional journey in one place! and even more so with a unique personalized link...🚀"
            />
            <CardReport
              img={ImageHomePage}
              name="Naythan"
              level="Desenvolvedor Frontend"
              description="Simply the best website to organize and showcase my professional journey in one place! and even more so with a unique personalized link...🚀"
            />
            <CardReport
              img={ImageHomePage}
              name="Naythan"
              level="Desenvolvedor Frontend"
              description="Simply the best website to organize and showcase my professional journey in one place! and even more so with a unique personalized link...🚀"
            />
            <CardReport
              img={ImageHomePage}
              name="Naythan"
              level="Desenvolvedor Frontend"
              description="Simply the best website to organize and showcase my professional journey in one place! and even more so with a unique personalized link...🚀"
            />
            <CardReport
              img={ImageHomePage}
              name="Naythan"
              level="Desenvolvedor Frontend"
              description="Simply the best website to organize and showcase my professional journey in one place! and even more so with a unique personalized link...🚀"
            />
            <CardReport
              img={ImageHomePage}
              name="Naythan"
              level="Desenvolvedor Frontend"
              description="Simply the best website to organize and showcase my professional journey in one place! and even more so with a unique personalized link...🚀"
            />
          </div>
          <div>
            <CardReport
              img={ImageHomePage}
              name="Naythan"
              level="Desenvolvedor Frontend"
              description="Simply the best website to organize and showcase my professional journey in one place! and even more so with a unique personalized link...🚀"
            />
            <CardReport
              img={ImageHomePage}
              name="Naythan"
              level="Desenvolvedor Frontend"
              description="Simply the best website to organize and showcase my professional journey in one place! and even more so with a unique personalized link...🚀"
            />
            <CardReport
              img={ImageHomePage}
              name="Naythan"
              level="Desenvolvedor Frontend"
              description="Simply the best website to organize and showcase my professional journey in one place! and even more so with a unique personalized link...🚀"
            />
            <CardReport
              img={ImageHomePage}
              name="Naythan"
              level="Desenvolvedor Frontend"
              description="Simply the best website to organize and showcase my professional journey in one place! and even more so with a unique personalized link...🚀"
            />
            <CardReport
              img={ImageHomePage}
              name="Naythan"
              level="Desenvolvedor Frontend"
              description="Simply the best website to organize and showcase my professional journey in one place! and even more so with a unique personalized link...🚀"
            />
            <CardReport
              img={ImageHomePage}
              name="Naythan"
              level="Desenvolvedor Frontend"
              description="Simply the best website to organize and showcase my professional journey in one place! and even more so with a unique personalized link...🚀"
            />
            <CardReport
              img={ImageHomePage}
              name="Naythan"
              level="Desenvolvedor Frontend"
              description="Simply the best website to organize and showcase my professional journey in one place! and even more so with a unique personalized link...🚀"
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
