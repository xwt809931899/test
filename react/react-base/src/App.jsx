import React from 'react';
import logo from './logo.svg';
import Demo1 from './Demo1'
import Demo2 from './Demo2'
import './App.css';

function renderStr () {
  return 'string'
}
function App() {
  const age = 18;
  const styObj = { color: 'blue' }
  const foo = () => {
    console.log('blue')
  }
  const bar = () => {
    return function () {
      console.log('bar')
    }
  }
  const lis = [
    <li>1</li>,
    <li>2</li>,
    <li>3</li>
  ]
  const names = ['name1','name2','name3']
  const nameNodes = names.map((name,index) => {
    return (<div style = {styObj}>
      { name }
    </div>)
   // return结点用()抱起来
  })
  return (
   <div>
     <Demo1 names={ names } from='App' onClick={ (a) => {
       console.log(a)
     }} />
     <Demo2 names={ names } from='App' />
     <p style={{color:'red'}} onClick={() => {
       console.log('red')
     }}> { age } </p>
     <p style={ styObj } onClick={ foo }> { age }</p>
     <p onClick={ bar() }> {age} </p>
     { lis }
     {/* 自动将数组展开 */}
     {
       names.map((name,index) => {
         return (<div>
           { name }
         </div>)
        // return结点用()抱起来
       })
     }
     { nameNodes }
     { renderStr() }
     { true ? <div>登录</div> : <a href='#'>登录</a>}
   </div>
  );
}

export default App;
