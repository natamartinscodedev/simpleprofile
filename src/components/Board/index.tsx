// 'use client'
// import React, { useState } from 'react';
// import { DndProvider} from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';
// import { produce } from 'immer';
// import Card from '@/Components/IsDragging/index';
// import BoardContext from './context'

// const Index = () => {
//     const data = [
//         { id: 1, text: 'Item 1' },
//         { id: 2, text: 'Item 2' },
//         { id: 3, text: 'Item 3' },
//         { id: 4, text: 'Item 4' },
//         { id: 5, text: 'Item 5' },
//     ]

//     const [lists, setLists] = useState(data)

//     function move(from: any, to: any) {
//         setLists(produce(lists, draft => {
//             const dragged = draft[from];

//             draft.splice(from, 1);
//             draft.splice(to, 0, dragged);

//         }))
//     }

//     return (
//         <BoardContext.Provider value={{ lists, move }}>
//             <DndProvider backend={HTML5Backend}>
//                 <div className='board_container '>
//                     <ul>
//                         {lists && lists.map((item, index) => (
//                             <Card key={item.id} index={index} name={item} />
//                         ))}
//                     </ul>
//                 </div>
//             </DndProvider>
//         </BoardContext.Provider>
//     );
// };

// export default Index;