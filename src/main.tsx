import { define } from 'uelements'
import  App  from './app'
import './index.css'

define(
	"f22-plugin",
	(el) => <App dataURL={(el.getAttribute("dataURL") || "")}  
	/>,
	["dataURL" ],
	() => console.log("F22 Plugin cleanup")
);


function handlevalue() {
  try {
    window.onload = async () => {
      // value.record.forEach((element : any ) => {
    //   const mainelementsofstories = document.querySelector(`#f22-storiesplugin1`);
    //   if (mainelementsofstories) {
        let el = document.createElement("f22-plugin");
        //@ts-ignore
        let  result = window.Shopify?.shop?.split(".")[0] || "ekkatha";
        // let  result = window.Shopify?.shop?.split(".")[0];
        // console.log(result);
        // el.setAttribute("dataUrl", `https://s3.f22labs.cloud/shopclips/${result}.json`);
        el.setAttribute("dataUrl", `https://s3.f22labs.cloud/shopclips/paper-with-video.json`);
        console.log(el);
		
		document.body.appendChild(el)
      }
    // };
  } catch (error) {
    console.error(error);
  }
}
handlevalue();