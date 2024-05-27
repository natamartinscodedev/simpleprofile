"use client"
import React from 'react'
import { signIn } from "next-auth/react"
import Image from 'next/image'
import LogoGoogle from "@/Images/google-logo.png"
import LogoGithub from "@/Images/github-logo.png"
// import LogoLinkedin from "@/Images/linkedin-logo.png"

const LoginAuth = () => {
    return (
        <div className=''>
            <button onClick={() => signIn("google", { callbackUrl: "/User" })}>
                <Image
                    src={LogoGoogle}
                    alt=''
                    width={25}
                    height={25}
                />
                Join with google
            </button>
            <button onClick={() => signIn("github", { callbackUrl: "/User" })}>
                <Image
                    src={LogoGithub}
                    alt=''
                    width={25}
                    height={25}
                />
                Join with github
            </button>
            {/* <button onClick={() => signIn("linkedin", { callbackUrl: "/User" })}>
                <Image
                    src={LogoLinkedin}
                    alt=''
                    width={25}
                    height={25}
                />
                Join with linkedin
            </button> */}
        </div>
    )
}

export default LoginAuth