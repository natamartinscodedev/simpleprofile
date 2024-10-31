'use client'
import React, { useRef, useContext, useState, useEffect } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { useSearchParams } from 'next/navigation'
import BoardContext from '@/components/Board/context'
import CardLink from '../ComponentLink'
import CardImg from '../ComponentImage'
import CardVideo from '../ComponentVideo'
import { Trash2 } from 'lucide-react'
import { UpdateInfoUser } from '@/utils/updateInfoUser'
import MapComponent from '../ComponentMap'
import TextComponent from '../ComponentNote'

const ListItem = ({ date, index, lists, nameLink, changeImgVideo }) => {
  const [sharedProfile, setSharedProfile] = useState('')

  const ID = index
  const ref = useRef()
  const { move } = useContext(BoardContext)
  const [cardList, setCardList] = useState(lists)
  const typeImg = 'jpeg' || 'png' || 'svg'

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
    window.location.reload()
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

  useEffect(() => {
    const SharedProfile = window.localStorage.getItem('sharedProfile')
    setSharedProfile(SharedProfile)

  }, [])

  return (
    <>
      {date && date.type === 'linkCard' && (
        <div
          ref={ref}
          className={`card_is-dragging-links ${isDragging ? 'dragging' : ''}
           ${sharedProfile === 'true' ? 'card_is-dragging': 'hiderIcon' } `}
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
           ${sharedProfile === 'true' ? 'card_is-dragging' : 'hiderIcon' }`}
        >
          {date && date.type === 'imgCard' && (
            <>
              {
                changeImgVideo === `image/${typeImg}` ? (<CardImg url={date} changeImgVideo={changeImgVideo} />)
              : (<CardVideo url={date} changeImgVideo={changeImgVideo} />)
              }
            </>

          )}
          <div className="card_remove">
            <button onClick={() => handleDeletCrd(index)}>
              <Trash2 color="white" />
            </button>
          </div>
        </div>
      )}
      {date && date.type === 'map' && (
        <div
          ref={ref}
          className={` ${isDragging ? 'dragging' : ''}
          ${sharedProfile === 'true' ? 'card_is-dragging': 'hiderIcon' }`}
        >
          {date && date.type === 'map' && <MapComponent />}
          <div className="card_remove">
            <button onClick={() => handleDeletCrd(index)}>
              <Trash2 color="white" />
            </button>
          </div>
        </div>
      )}
      {date && date.type === 'text' && (
        <div
          ref={ref}
          className={` ${isDragging ? 'dragging' : ''}
         ${sharedProfile === 'true' ?  'card_is-dragging':'hiderIcon' }`}
        >
          {date && date.type === 'text' && <TextComponent />}
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
