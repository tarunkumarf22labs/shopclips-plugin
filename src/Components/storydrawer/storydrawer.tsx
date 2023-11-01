//@ts-nocheck
import { useEffect, useState } from "uelements";
import Customslider from "../customslider";
import { Variant, shopify } from "../types";
import { memo } from "preact/compat";
import Loader from "../Loader";
function StoryDrawer({
  setIsOpen,
  url,
  isSizeOpen,
  setIsSizeOpen,
  productname,
  startProgress,
  videoRef,
}: {
  isOpen: boolean;
  productname: string;
  setIsOpen : any
}) {   
  const [variant, setVariant] = useState("");
  const [textforCart, setTextforCart] = useState("Add to cart")
    



  const handleAddToCart = async () => {
    console.log({ variant });
    setTextforCart(<Loader />);
    const url = `https://${url}/cart/add`;
  
    const requestBody = {
      Style: 'Limited-2',
      quantity: 1,
      form_type: 'product',
      utf8: '✓',
      id: variant.id,
      sections: 'cart-notification-product,cart-notification-button,cart-icon-bubble',
      sections_url: '/products/gadwal-limited',
    };
  
    const jsonRequestBody = JSON.stringify(requestBody);
  
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Set the content type to JSON
      },
      body: jsonRequestBody, // Set the request body as the JSON string
    };
  
    try {
      const response = await fetch(url, requestOptions);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setTextforCart("added to cart");
    } catch (error) {
      setTextforCart("added to cart");
      console.error(error);
    }
  };
  
  return (
    <div
      className="plugin-inner_container"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {productname ? (
        <>
          <Customslider 
          productimages={productname?.images} 
          productName={productname.title} 
          productTitle={productname.title} 
          productPrice={productname.price} 
          productVariants={productname.variants} 
          setVariant={setVariant} 
          isSizeOpen={isSizeOpen} 
          setIsSizeOpen={setIsSizeOpen} 
          setIsOpen={setIsOpen}
          startProgress={startProgress}
          videoRef={videoRef}
          url={url}
          handle = {productname.handle}
          />
          
          <div
            className="size_container">
            <button  disabled={textforCart === "Add to cart"  ? false : true   }  onClick={handleAddToCart} className="atc_button" style={{ cursor: "pointer" }} >
              {textforCart}
             </button>
            <a href={`https://${url}/cart/${variant.id}:1?checkout`} className="atc_button">
              BUY NOW
            </a>
          </div>
        </>
      ) : (
        ""
      )}
      {/* <PoweredBy/> */}
    </div>
  );
}

export const MemoizedStoryDrawer = memo(StoryDrawer);
