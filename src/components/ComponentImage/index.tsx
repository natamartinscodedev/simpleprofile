"use client";

import Image from "next/image";
import React from "react";

interface typeImgVd {
  url: string;
}

const ImageComponent = ({ url }: typeImgVd) => {
  return (
    <div className="box-img">
      <Image src={url} alt={url} width={100} height={100} />
    </div>
  );
};

export default ImageComponent;
