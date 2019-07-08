import React, { Component } from 'react';
import List from './List'
import CommentList from './CommentList'
import CommentInput from './CommentInput'
import logo from './logo.svg';
import './App.css';
let generateID = 1;
class App extends Component {
  state = {
    lists: [
      { name: 'xwt', age: 21, school: 'school1',id:0 },
      { name: 'sjy', age: 22, school: 'school2',id:1 }
    ],
    commentList:[]
  }
  handleAddInfo = () => {
    const lists = this.state.lists.slice(0) //做一个浅拷贝
    generateID++
    lists.push({ name: 'hcj', age: 20, school: 'school3' })
    this.setState({
      lists
    })
  }
  handleListDelete = (id) => {
    console.log('父组件收到id',id)
    const lists = this.state.lists.slice(0)
    const index = lists.findIndex(list => list.id === id)
    lists.splice(index,1)
    this.setState({
      lists
    })
  }
  handlePublish = (userName,commentContent) => {
    //push setState
    const commentList = this.state.commentList.slice(0)
    commentList.push({
      userName,
      commentContent
    })
    this.setState({
      commentList
    })
  }
  render() {
    const { lists } = this.state
    const { commentList } = this.state
    return (   //用括号包起来 里面是jsx
      <>
      <ul>
        <button onClick={this.handleAddInfo}>添加一条数据</button>
        {
          lists.map((list, i) => {
            return (
            <List list={list} a={1} b={2} onDelete={this.handleListDelete}></List>   //父组件通过props通信
            )
          })
        }
      </ul>
      <div>
        <CommentInput onPublish = { this.handlePublish }/>
        <CommentList commentList={commentList}/>
      </div>
      </>

    )
  }
}

export default App;
