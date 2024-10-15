"use client";
import React, { useRef, useContext, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import BoardContext from "@/components/Board/context";
import CardLink from "../ComponentLink";
import CardImgVideo from "../ComponentImage";
import Link from "next/link";
import { Trash2 } from "lucide-react";

const ListItem = ({ date, index, lists, setLists }) => {
  const ID = index;
  const ref = useRef();
  const { move } = useContext(BoardContext);
  const [cardList, setCardList] = useState(lists);
  // console.log("List is Dragging ==>", cardList);

  const [{ isDragging }, dragRef] = useDrag({
    type: "CARD",
    item: { ID, index, id: date.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleDeletCrd = () => {
    const updatedCards = [...cardList];
    updatedCards.splice(index, 1);
    setLists(updatedCards);
  };

  const [, dropRef] = useDrop({
    accept: "CARD",
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
  // console.log("ID ==>", date);
  return (
    <>
      {date.type === "linkCard" && (
        <Link
          href={`${date.link}`}
          target="__blenck"
          ref={ref}
          className={`card_is-dragging ${isDragging ? "dragging" : ""}`}
        >
          {date.type === "linkCard" && <CardLink link={date.link} />}
          <div className="card_remove">
            <span>
              <Trash2 color="white" />
            </span>
          </div>
        </Link>
      )}
      {date.type === "imgCard" && (
        <div
          ref={ref}
          className={`card_is-dragging ${isDragging ? "dragging" : ""}`}
        >
          {date.type === "imgCard" && <CardImgVideo url={date.url} />}
          <div className="card_remove" onClick={() => handleDeletCrd()}>
            <span>
              <Trash2 color="white" />
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default ListItem;
