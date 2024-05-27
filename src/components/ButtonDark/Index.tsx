"use clinet"
import { Moon, Sun } from 'lucide-react'
import React, { useState } from 'react'

const Index = () => {
    const [isDarkMode, setIsDarkMode] = useState(false)
    const toogleTheme = () => {
        setIsDarkMode(!isDarkMode)
        document.documentElement.classList.toggle('dark')
    }
    const styleButton = {
        borderRadius: '50%',
        padding: '4px 4px',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        border: 'none',
        background: 'none',
        transition: 'background-color 0.3s ease'
    }

    return (
        <button
            aria-label="Toggle Dark Mode"
            className="toggle-button"
            onClick={toogleTheme}
            style={styleButton}
        >
            {
                isDarkMode ? (
                    <Moon color='white' />
                ) : (
                    <Sun color='black' />
                )
            }
        </button>
    )
}

export default Index