import React, { Component } from 'react'
import propTypes from 'prop-types'

export default class Context15 extends Component {
  state = {
    theme:'red'
  }
  //后代组件从这里取信息
  getChildContext() {
    return {
      theme:this.state.theme
    }
  }
  // handleToggleTheme = (e) => {
  //   const theme = e.target.dataset.theme
  //   this.setState({
  //     theme
  //   })
  // }
  handleToggleTheme = (theme) => () => {
    this.setState({
          theme
        })
  }
  render() {
    const msg = ['str1','str2','str3']
    return (
      <div>
        {
          msg.map((item,i) => {
            return (
              <Message key={i} text={item}/>
            )
          })
        }
        <button onClick={this.handleToggleTheme('purple')} data-theme>purple</button>
        <button onClick={this.handleToggleTheme('yellowGreen')}>yellowGreen</button>
      </div>
    )
  }
  // Context15.child
}
class Message extends Component {
  shouldComponentUpdate () {
    return false
  }
  render () {
    const { text } = this.props
    return (
      <li>
        {text}
        <MyButton />
      </li>
    )
  }
}
class MyButton extends Component {
  static contextTypes = {
    theme:propTypes.string
  }
  render() {
    const { theme } = this.context
    return (
      <button style={ {color:theme} }>delete</button>
    )
  }
}