import React from 'react';
import './App.css';
import toast from './toast/toast'
/**
 * toast:{
 * success:() => {}
 * loading:() => {}
 * } 
 */
const openNotificationWithIcon = (type) => {
  toast[type]('message')
}
function App() {
  return (
<div>
    <button onClick={() => openNotificationWithIcon('success')}>Success</button>
    <button onClick={() => openNotificationWithIcon('info')}>Info</button>
    <button onClick={() => openNotificationWithIcon('warning')}>Warning</button>
    <button onClick={() => openNotificationWithIcon('error')}>Error</button>
    <button onClick={() => openNotificationWithIcon('loading')}>Loading</button>
  </div>

  );
}

export default App;
