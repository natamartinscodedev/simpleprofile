'use client'
import React, { useRef, useContext } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import BoardContext from '@/Components/Board/context';

const ListItem = ({ name, index }) => {
    const ID = name.id;
    const ref = useRef();
    const { move } = useContext(BoardContext);

    const [{ isDragging }, dragRef] = useDrag({
        type: 'CARD',
        item: { ID, index, id: name.id },
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

    return (
        <div ref={ref} className={`card_is-dragging ${isDragging ? 'dragging' : ''}`}>
            <h2>{name.text}{isDragging && "📂"}</h2>
        </div>
    );
};

export default ListItem;
