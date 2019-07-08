import React, { Component } from 'react';

class List extends Component {
  handleDelete = (event) => {
    const { onDelete } = this.props
    const id = parseInt(event.target.dataset.id)
    console.log(id)
    onDelete(id)
  }
  render() {
    const { list } = this.props
    return (
      <>
        <li>
          name:{list.name},
          age:{list.age},
          school:{list.school}
        </li>
        <button data-id={list.id} onClick={this.handleDelete}>delete</button>
      </>  //内置组件
    )
  }
}

export default List