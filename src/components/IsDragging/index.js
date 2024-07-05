'use client'
import React, { useRef, useContext, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import BoardContext from '@/components/Board/context';
import CardLink from '../ComponentLink';
import CardImgVideo from '../ComponentImage';
import Link from 'next/link';

const ListItem = ({ date, index }) => {
    const ID = date.id;
    const ref = useRef();
    const { move } = useContext(BoardContext);

    const [{ isDragging }, dragRef] = useDrag({
        type: 'CARD',
        item: { ID, index, id: date.id },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [, dropRef] = useDrop({
        accept: 'CARD',
        hover(item, monitor) {
            const draggedIndex = item.index;
            const targetIndex = index;

            if (draggedIndex === targetIndex) {
                return;
            }

            const targetSize = ref.current.getBoundingClientRect();
            const targetCenter = (targetSize.bottom - targetSize.top) / 2;

            const draggedOffset = monitor.getClientOffset();
            const draggedTop = draggedOffset.y - targetSize.top;

            if (draggedIndex < targetIndex && draggedTop < targetCenter) {
                return;
            }

            if (draggedIndex > targetIndex && draggedTop > targetCenter) {
                return;
            }

            move(draggedIndex, targetIndex);
            item.index = targetIndex;
        },
    });

    dragRef(dropRef(ref));

    console.log("Type cards ==>", date.type)

    return (
        <Link href={`${date.link}`} ref={ref} className={`card_is-dragging ${isDragging ? 'dragging' : ''}`}>
            {date.type === 'linkCard' && <CardLink link={date.link} />}
            {date.type === 'imgCard' && <CardImgVideo url={date.url} />}
        </Link>
    );
};

export default ListItem;
