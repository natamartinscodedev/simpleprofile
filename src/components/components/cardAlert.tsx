'use client'

import { useEffect, useState } from 'react';
interface typeParams {
  text: string,
  state?: any
}

export default function Modal({ text, state }: typeParams) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (state === true) {
      setIsOpen(true)
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

