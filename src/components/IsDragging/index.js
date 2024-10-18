'use client'
import React, { useRef, useContext, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { useSearchParams } from 'next/navigation'
import BoardContext from '@/components/Board/context'
import CardLink from '../ComponentLink'
import CardImgVideo from '../ComponentImage'
import { Trash2 } from 'lucide-react'
import { UpdateInfoUser } from '@/utils/updateInfoUser'

const ListItem = ({ date, index, lists, nameLink }) => {
  const searchParams = useSearchParams()
  const hideNavbar = searchParams.get('active')

  const ID = index
  const ref = useRef()
  const { move } = useContext(BoardContext)
  const [cardList, setCardList] = useState(lists)

  const [{ isDragging }, dragRef] = useDrag({
    type: 'CARD',
    item: { ID, index, id: date ? date.id : null },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  })

  const handleDeletCrd = index => {
    const updatedCards = [...cardList]
    updatedCards.splice(index, 1)

    UpdateInfoUser({ lists: updatedCards, nameLink })
  }

  const [, dropRef] = useDrop({
    accept: 'CARD',
    hover(item, monitor) {
      const draggedIndex = item.index
      const targetIndex = index

      if (draggedIndex === targetIndex) {
        return
      }

      const targetSize = ref.current.getBoundingClientRect()
      const targetCenter = (targetSize.bottom - targetSize.top) / 2

      const draggedOffset = monitor.getClientOffset()
      const draggedTop = draggedOffset.y - targetSize.top

      if (draggedIndex < targetIndex && draggedTop < targetCenter) {
        return
      }

      if (draggedIndex > targetIndex && draggedTop > targetCenter) {
        return
      }

      move(draggedIndex, targetIndex)
      item.index = targetIndex
    }
  })
  dragRef(dropRef(ref))
  // console.log("ID ==>", date);
  return (
    <>
      {date && date.type === 'linkCard' && (
        <div
          // href={`${date.link}`}
          ref={ref}
          className={`card_is-dragging-links ${isDragging ? 'dragging' : ''} 
            ${hideNavbar ? 'hiderIcon' : 'card_is-dragging'}`}
        >
          {date.type === 'linkCard' && <CardLink link={date.link} />}
          <div className="card_remove">
            <button onClick={() => handleDeletCrd(index)}>
              <Trash2 color="white" />
            </button>
          </div>
        </div>
      )}
      {date && date.type === 'imgCard' && (
        <div
          ref={ref}
          className={` ${isDragging ? 'dragging' : ''} 
          ${hideNavbar ? 'hiderIcon' : 'card_is-dragging'}`}
        >
          {date && date.type === 'imgCard' && <CardImgVideo url={date.url} />}
          <div className="card_remove">
            <button onClick={() => handleDeletCrd(index)}>
              <Trash2 color="white" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default ListItem
