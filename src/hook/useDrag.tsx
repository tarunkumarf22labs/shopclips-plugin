import React from 'react'
import { useState } from 'uelements';

function useDrag() {
    const [dragging, setDragging] = useState(false);
    const [pos, setPos] = useState({ x: 0, y: 0 });
     

    const handleMouseDown = (e : MouseEvent ) => {
        e.stopPropagation()
        setDragging(true);
        setPos({ x: e.clientX, y: e.clientY });
      };

      const handleTouchStart = (e: TouchEvent) => {
        e.stopPropagation()
        setPos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
        setDragging(true);
      };

      const handleMouseUp = (e: MouseEvent | TouchEvent) => {
        e.stopPropagation()
        setDragging(false);
      };

      const handleMouseMove = (e : MouseEvent , divContainerRef : any ) => {
        e.stopPropagation()
        if (dragging) {
          const el = divContainerRef.current!;
          const newPos = {
            x: pos.x - e.clientX,
            y: pos.y - e.clientY,
          }
          const updatedPos = {
            x: el.offsetLeft - newPos.x,
            y: el.offsetTop - newPos.y,
          };
          
          const maxMoveX = Math.max(0, document.body.clientWidth - el.offsetWidth);
          const maxMoveY = Math.max(0, window.innerHeight - el.offsetHeight);
    
          if (updatedPos.x < 0) updatedPos.x = 0;
          if (updatedPos.y < 0) updatedPos.y = 0;
          if (updatedPos.x > maxMoveX) updatedPos.x = maxMoveX;
          if (updatedPos.y > maxMoveY) updatedPos.y = maxMoveY;
    
          el.style.left = `${updatedPos.x}px`;
          el.style.top = `${updatedPos.y}px`;
          setPos({ x: e.clientX, y: e.clientY });
        }
      };

      const handleTouchMove = (e : TouchEvent , divContainerRef : any) => {
        e.stopPropagation()
        if (dragging) {
          const el = divContainerRef.current!;
          const newPos = {
            x: pos.x - e.touches[0].clientX,
            y: pos.y - e.touches[0].clientY,
          }
          const updatedPos = {
            x: el.offsetLeft - newPos.x,
            y: el.offsetTop - newPos.y,
          };
          
          const maxMoveX = Math.max(0, document.body.clientWidth - el.offsetWidth);
          const maxMoveY = Math.max(0, window.innerHeight - el.offsetHeight);
          
          if (updatedPos.x < 0) updatedPos.x = 0;
          if (updatedPos.y < 0) updatedPos.y = 0;
          if (updatedPos.x > maxMoveX) updatedPos.x = maxMoveX;
          if (updatedPos.y > maxMoveY) updatedPos.y = maxMoveY;
          
          el.style.left = `${updatedPos.x}px`;
          el.style.top = `${updatedPos.y}px`;
        }
      };

  return { 
        handleMouseDown,
        handleTouchStart,
        handleMouseUp,
        handleMouseMove,
        handleTouchMove,
        dragging,
        pos
      }
    
}  

export default useDrag