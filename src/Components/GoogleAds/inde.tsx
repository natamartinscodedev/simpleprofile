"use client";

import Script from 'next/script';

export function GoogleAds() {
    return (
        <>
            {/* Carrega o script do Google Ads */}
            <Script
                strategy="afterInteractive"
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXX"
                crossOrigin="anonymous"
            />
            {/* Unidade de anúncio */}
            <ins
                className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client="ca-pub-XXXXXXXXXXXXXX"
                data-ad-slot="YYYYYYYYYY"
                data-ad-format="auto"
                data-full-width-responsive="true"
            ></ins>
            {/* Inicializa o anúncio */}
            <Script id="ads-init" strategy="afterInteractive">
                {`
          (adsbygoogle = window.adsbygoogle || []).push({});
        `}
            </Script>
        </>
    );
}
