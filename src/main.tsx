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
document.body.append(el)