// @ts-nocheck
import { useEffect, useState, JSX, useReducer, useRef } from "uelements";
import SmallComponent from "./Components/SmallComponent";
import { mediaHandler } from "./reducers";
import { Crossicon, Muteicon, UnMuteicon } from "./assets/Icons";
import ProductCard from "./Components/productcard";
import { MemoizedStoryDrawer } from "./Components/storydrawer/storydrawer";

const mediaHandlerState = {
  toogleopen: false,
  videolength: null,
  ismute: false,
  url : "",
  token : ""
};

function App({ dataURL }: { dataURL: string }): JSX.Element {
  const [state, dispatch] = useReducer(mediaHandler, mediaHandlerState);
  const videoEl = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);
  const [data, setData] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [productName, setproductName] = useState("");
  const [mute, setmute] = useState(false)
  const handlePopup = (event: MouseEvent): void => {
    dispatch({
      type: "SETTOGGLE",
      payload: undefined,
    });
  };

  const handleLoadedMetadata = () => {
    const video = videoEl.current!;
    if (!video) return;
    dispatch({ type: "SETVIDEOLENGTH", payload: video.duration });
  };


  function dataPrecessor(value) {
    console.log(value  , "pappaappaapp");
    
    const Dvalue = value?.attributes?.clips[0]
    const video = Dvalue?.video
    const productNames = Dvalue?.tags?.map((data: any) => { 
       console.log(value , "binidoini");
      return data.handle
    
    });   
    console.log(productNames);
    setData({  productNames , video});
  }
  async function handleData() {
    const myHeaders = new Headers();
    myHeaders.append("accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };
  
    try {
      const [storeResponse, clipsResponse] = await Promise.all([
        fetch(
          `https://shopify-shopclips.uakhui.easypanel.host/api/clips?filters[Store][$contains]=${window.Shopify.shop}&populate=deep`,
          requestOptions
        ),
        fetch(
          `https://shopify-shopclips.uakhui.easypanel.host/api/stores?filters[name][$contains]=${window.Shopify.shop}`,
          requestOptions
        )
      ]);
  
      const storeData = await storeResponse.json();
      const clipsData = await clipsResponse.json();
       console.log(clipsData , "clipsData" , clipsData);
       
      dispatch({ type : "SETTOKENS" , payload : {
        url  :  clipsData?.data?.[0].attributes.name ,
        token :  clipsData?.data?.[0].attributes.borderColor
      }  })       
      const storeValue = storeData.data.find( (data) => data.attributes.clips[0].url === window.location.href.split("?")[0]);
       console.log(storeValue);
      dataPrecessor(storeValue);
  
      return {
        storeData: storeValue,
        clipsData: clipsData,
      };
    } catch (error) {
      console.log(error);
    }
  }
  


  useEffect(() => {
    handleData();
  }, []);
  useEffect(() => {
    videoEl?.current?.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      videoEl?.current?.removeEventListener("timeupdate", () => setProgress(0));
    };
  }, [videoEl?.current]);

  const handleTimeUpdate = () => {
    if (!videoEl.current) return;
    const progress = (videoEl.current!.currentTime / state.videolength!) * 100;
    setProgress(progress);
  };

  const handleToogle = () => {
    const video = videoEl.current;
    if (!video) return;
    setmute((prev) => !prev )
    video.muted = !mute;
  };

  if (!data?.video) return <></> 

  if (state.toogleopen) {
    return (
      <div>
        <div className="overlay-thing"></div>
        <div className="video-box">
          {state.videolength ? (
            <>
              <div
                className="playbar"
                style={{
                  gridTemplateColumns: ` repeat($1 ,1fr)  `,
                }}
              >
                <div className="playbarinline__wrapper">
                  <div
                    style={{
                      display: "block !important",
                      transform: `scaleX(${progress / 100})`,
                    }}
                    className={`playbarinline   `}
                  ></div>
                  <div className="playbarinline__background"></div>
                </div>
              </div>
              <div className="muteop" onClick={handleToogle}>
                {mute ? <UnMuteicon /> : <Muteicon /> }
              </div>
              <div className="crossiconop" onClick={handlePopup}>
                <Crossicon />
              </div>
            </>
          ) : (
            ""
          )}

          <video
            ref={videoEl}
            src={data?.video}
            onLoadedMetadata={handleLoadedMetadata}
            autoPlay
          />
        </div>
      </div>
    );
  }
  return (
    <>
      <SmallComponent
        video={data?.video}
        handlePopup={handlePopup}
      />
    </>
  );
}

export default App;
