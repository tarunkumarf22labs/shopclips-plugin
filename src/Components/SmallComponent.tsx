import { useEffect, useRef, useState } from "uelements";
import { SmallComponentprops } from "../types";
function SmallComponent({
  video,
  handlePopup,
  
}: SmallComponentprops) {
  const [dragging, setDragging] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const divContainerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e : MouseEvent ) => {
    e.stopPropagation()
    setDragging(true);
    setPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = (e) => {
    e.stopPropagation()
    setDragging(false);
  };


  const handleMouseMove = (e : MouseEvent ) => {
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
      const maxMoveY = Math.max(0, document.body.clientHeight - el.offsetHeight);
      // console.log(document.body.clientHeight - el.offsetHeight , document.body.clientHeight , el.offsetHeight  , "el.offsetHeight " );
      
      if (updatedPos.x < 0) updatedPos.x = 0;
          if (updatedPos.y < 0) updatedPos.y = 0;
      if (updatedPos.x > maxMoveX) updatedPos.x = maxMoveX;
      // console.log(updatedPos.y > maxMoveY , updatedPos.y , maxMoveY  );
      
      // if (updatedPos.y > maxMoveY) updatedPos.y = maxMoveY;

      el.style.left = `${updatedPos.x}px`;
      el.style.top = `${updatedPos.y}px`;
      setPos({ x: e.clientX, y: e.clientY });
    }
  };

  
  useEffect(() => {
    const el = divContainerRef.current;
    if (el) {
      el.addEventListener("mousedown", handleMouseDown);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("mousemove", handleMouseMove);

      return () => {
        el.removeEventListener("mousedown", handleMouseDown);
        document.removeEventListener("mouseup", handleMouseUp);
        document.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, [dragging, pos]);

  return (
    <>
      <>
        <div className={`small-video-container-box `}
         ref={divContainerRef} 
         style={{position: 'fixed'}}
        >
          <div className={"smvideo-container"} data-customattribute={"red"}>
            <video
              src={video}
              autoPlay
              id="videos"
              muted
              loop
              playsInline
              onClick={handlePopup}
              // ref={videoref}
            />
          </div>
        </div>
      </>
    </>
  );
}

export default SmallComponent;
