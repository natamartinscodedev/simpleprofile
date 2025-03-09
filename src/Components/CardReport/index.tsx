import Image from "next/image";
import React from "react";
import { Rocket } from 'lucide-react'

interface typeItems {
  img: any;
  name: string;
  level: string;
  description: string;
}

const CardReport = ({ img, name, level, description }: typeItems) => {
  return (
    <div className="card_report">
      <div className="cardf_report-infouser">
        <Image src={img} alt={"Imagem do(a)" + name} />
        <span>
          <p>{name}</p>
          <p>{level}</p>
        </span>
      </div>
      <div className="cardf_report-desciber">
        <p>{description}</p>
      </div>
      <div className="cardf_report-icons">
        <Rocket size={20}/>
      </div>
    </div>
  );
};

export default CardReport;
