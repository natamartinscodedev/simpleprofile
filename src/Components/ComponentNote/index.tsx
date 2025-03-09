'use client'

import { useEffect, useState } from 'react'
import { UpdateInfoUser } from '@/utils/updateInfoUser'

const TextComponent = ({ notedate, lists, nameLink }: any) => {
  const [note, setNote] = useState<string>(notedate.text)

  const updateCardText = (cardId: any, newText: any) => {
    const updatedList = lists.map((card: any) => {
      if (card && card.id === cardId) {
        return { ...card, text: newText };
      }
      return card;
    });

    UpdateInfoUser({ lists: updatedList, nameLink });
  };

  useEffect(() => {
    updateCardText(notedate.id, note)
  }, [note])

  return (
    <div className='card_note'>
      <textarea
        name="note"
        id="note"
        value={note}
        onChange={(e: any) => setNote(e.target.value)}
        placeholder='Sua frase...'
      ></textarea>
    </div>
  )
}

export default TextComponent
