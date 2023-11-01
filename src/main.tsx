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

    // window.onload = async () => {
        let el = document.createElement("f22-plugin");
		      document.body.appendChild(el)

}
handlevalue();
