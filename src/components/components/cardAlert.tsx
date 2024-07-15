'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
interface typeParams {
  text: string,
  state?: any,
  open?: any,
}

export default function Modal({ text, state, open }: typeParams) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    if (open === true) {
      setIsOpen(true)
      if (!state) {
        router.push('/LinkPersonalize')
      }
    } else {
      setIsOpen(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      {isOpen && (
        <div className="modalBackground">
          <div className="modalContent">
            <button className="closeButton" onClick={toggleModal}>
              Fechar
            </button>
            <p>{text}</p>
          </div>
        </div>
      )}
    </div>
  );
}

