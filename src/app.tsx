import { useEffect, useState, JSX, useReducer, useRef } from "uelements";
import SmallComponent from "./Components/SmallComponent";
import { mediaHandler } from "./reducers";
import { Crossicon, Muteicon, UnMuteicon } from "./assets/Icons";
// import { Fakedata } from "./data"
import ProductCard from "./Components/productcard";
import { MemoizedStoryDrawer } from "./Components/storydrawer/Storydrawer";

const mediaHandlerState = {
  toogleopen: false,
  videolength: null,
  ismute: false,
};

function App({ dataURL }: { dataURL: string }): JSX.Element {
  const [state, dispatch] = useReducer(mediaHandler, mediaHandlerState);
  const videoEl = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);
  const [data, setData] = useState(null);
  const [dummy, setdummydata] = useState([] as any);
  const [isOpen, setIsOpen] = useState(false);
  const [productName, setproductName] = useState("");

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

  async function handleData() {
    const myHeaders = new Headers();
    myHeaders.append("accept", "application/json");
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    try {
      const Store = await fetch(
        `https://shopify-shopclips.bmohox.easypanel.host/api/clips?filters[store][$contains]=test-for-qa&populate=deep`,
        requestOptions
      );
      const data = await Store.json();
      const value = data?.data?.find(
        (data: any) =>
          data?.attributes?.clips?.[0].url ===
          "https://admin.shopify.com/store/test-for-qa/apps/herostars/app"
      );
      console.log(JSON.stringify(value), data, "productName");
      dataPrecessor();
      setData(value);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  function dataPrecessor() {
    const data = Fakedata.data[0].attributes.clips[0].tags.map((data: any) => {
      const productName = data.handle;
      const images = data.images.map((data: any) => data.originalSrc);
      const variants = data.variants.map((data: any) => {
        return {
          availableForSale: data.availableForSale,
          inventoryItem: data?.inventoryItem.id.replace(
            "gid://shopify/InventoryItem/",
            ""
          ),
          selectedOptions: data.selectedOptions[0].value,
          price: data.price,
        };
      });
      return {
        name: productName,
        //  images,
        //  variants
      };
    });
    setdummydata(data);
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
    if (!state.ismute) {
      videoEl.current!.muted = true;
    } else {
      videoEl.current!.muted = false;
    }
  };

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
                {!state.ismute ? <Muteicon /> : <UnMuteicon />}
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
            // src={data?.attributes?.clips?.[0].video}
            src={"https://d1b94xdk5eff5f.cloudfront.net/file_a86870a1f5.mp4"}
            onLoadedMetadata={handleLoadedMetadata}
            autoPlay
          />

          <div className="product-cards-container">
            <div className="product-cards">
              {[
                { name: "emilia-blazer-in-white-linen" },
                { name: "matilda-trousers-in-white-linen" },
              ].map((data) => {
                return (
                  <ProductCard
                    productname={data}
                    setIsOpen={setIsOpen}
                    setproductName={setproductName}
                  />
                );
              })}
            </div>
          </div>
          <div
        className={`f22storiesdrawer ${isOpen ? "f22open" : ""}`}
        onClick={() => {
          setIsOpen((prev) => !prev);
          // startProgress();
          // videoRef.current.play();
          // setIsSizeOpen(false);
        }}
      >
          <MemoizedStoryDrawer
            productname={productName}
            setIsOpen={setIsOpen}
            isOpen={isOpen}
          />
          </div>
        </div>
      </div>
    );
  }
  // if(!data) return <></>

  return (
    <>
      <SmallComponent
        video={data?.attributes?.clips?.[0].video}
        handlePopup={handlePopup}
      />
    </>
  );
}

export default App;
