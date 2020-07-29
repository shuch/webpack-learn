import { helloworld } from './helloworld';
import './style.css';
import img from './cat.jpg';

const cat = new Image();
cat.src = '../' + img;//'../dist/' + img;

document.body.appendChild(cat);

document.write(`<br>${helloworld()}</br>`);


// hot module replacement client
if (module.hot) {
  module.hot.accept();
}