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

let el = document.createElement('f22-plugin')
el.setAttribute('dataUrl', "https://api.jsonbin.io/v3/b/63da5a4fc0e7653a056bcd98")
document.body.append(el)