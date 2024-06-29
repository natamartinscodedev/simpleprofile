'use client'


import React, { useEffect, useState } from 'react';
import { fetchDateNameLink } from '@/utils/fetchDateNameLinks';
import Image from 'next/image';

const CardLink = ({ link }: any) => {
    const [date, setDate]: any = useState('')
    console.log(date)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { dateLink } = await fetchDateNameLink(link)
                setDate(dateLink)
            } catch (error) {
                console.error('Error fetching metadata', error);
            }
        };

        fetchData();
    }, [link]);

    return (
        <div className='card-link'>
            <div>
                <Image src={date.avatar_url} alt='' width={100} height={100} />
                <h2>{date.name}</h2>
            </div>
            <p>{date.bio}</p>
        </div>
    );
};

const styles: any = {
    card: {

    },
    image: {
        width: '100px',
        height: '100px',
        objectFit: 'cover',
        marginRight: '16px',
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
    },
    title: {
        fontSize: '18px',
        fontWeight: 'bold',
        margin: '0 0 8px 0',
    },
    url: {
        color: '#0070f3',
        textDecoration: 'none',
    },
};

export default CardLink;
