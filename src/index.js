import { helloworld } from './helloworld';
import './style.css';
import img from './cat.jpg';

const cat = new Image();
cat.src = img;

document.body.appendChild(cat);

document.write(helloworld());