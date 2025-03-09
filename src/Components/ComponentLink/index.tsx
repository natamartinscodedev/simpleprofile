'use client'

import React, { useEffect, useState } from 'react'
import { fetchDateNameLink } from '@/utils/fetchDateNameLinks'
import Link from 'next/link'
import { Github, Instagram, Linkedin, Youtube, Twitter, Twitch, Theater } from 'lucide-react'

const CardLink = ({ link }: any) => {
  const [date, setDate]: any = useState('')
  const [webNameLink, setWebNameLink]: any = useState('')

  const CardGithub = () => {
    return (
      <>
        <div>
          <span className={webNameLink === 'GitHub' ? 'black' : ''} />
          <Github size={35} />
          <h2>{date.name}</h2>
        </div>
        <Link href={`${link}`} target="__blnck">
          Seguir
        </Link>
      </>
    )
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { dateLink, WebName } = await fetchDateNameLink(link)

        setDate(dateLink)
        setWebNameLink(WebName)
      } catch (error) {
        console.error('Error fetching metadata', error)
      }
    }

    fetchData()
  }, [link])

  return (
    <div className="card-link">
      {webNameLink === 'GitHub' && CardGithub()}
      {webNameLink === 'LinkedIn' && (
        <>
          <div>
            <span className={webNameLink === 'LinkedIn' ? 'bluer' : ''} />
            <Linkedin size={35} />
            <p>{webNameLink}</p>
          </div>
          <Link href={`${link}`} target="__blnck">
            Seguir
          </Link>
        </>
      )}

      {webNameLink === 'Instagram' && (
        <>
          <div>
            <span className={webNameLink === 'Instagram' ? 'linear' : ''} />
            <Instagram size={35} />
            <p>{webNameLink}</p>
          </div>
          <Link href={`${link}`} target="__blnck">
            Seguir
          </Link>
        </>
      )}

      {webNameLink === 'Youtube' && (
        <>
          <div>
            <span className={webNameLink === 'Youtube' ? 'linear' : ''} />
            <Youtube size={35} />
            <p>{webNameLink}</p>
          </div>
          <Link href={`${link}`} target="__blnck">
            Inscrever-se
          </Link>
        </>
      )}

      {webNameLink === 'Twitch' && (
        <>
          <div>
            <span className={webNameLink === 'Twitch' ? 'linear' : ''} />
            <Twitch size={35} />
            <p>{webNameLink}</p>
          </div>
          <Link href={`${link}`} target="__blnck">
            Inscrever-se
          </Link>
        </>
      )}

      {webNameLink === 'Twitter' && (
        <>
          <div>
            <span className={webNameLink === 'Twitter' ? 'linear' : ''} />
            <Twitter size={35} />
            <p>{webNameLink}</p>
          </div>
          <Link href={`${link}`} target="__blnck">
            Seguir
          </Link>
        </>
      )}

      {/* {webNameLink === 'Theater' && (
        <>
          <div>
            <span className={webNameLink === 'www.threads.net' ? 'linear' : ''} />
            <Theater size={35} />
            <p>{webNameLink}</p>
          </div>
          <Link href={`${link}`} target="__blnck">
            Seguir
          </Link>
        </>
      )} */}
    </div>
  )
}

export default CardLink
