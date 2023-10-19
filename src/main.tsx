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
        let el = document.createElement("f22-plugin");
        console.log(el);
		    document.body.appendChild(el)
    };
  } catch (error) {
    console.error(error);
  }
}
handlevalue();