import print from './print';
import './style.css';

document.write(print('development'));

if (module.hot) {
  console.log('module', module);
  module.hot.accept('./print.js', function() {
    console.log('accept the updated printMe module');
    print('xx');
  })
}