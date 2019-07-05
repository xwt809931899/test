import React,{ Component } from 'react';
function foo (a) {
    console.log(a)
}
foo('内容来自子组件')
class Demo1 extends Component {
    render () {
        console.log(this.props)   //props就是父组件传过来的所有信息
        return (
            <div style= {{backgroundColor:'red'}} onClick={() => {
                const { onClick } = this.props
                onClick('内容来自子组件')
            }}> Demo1 </div>
        )
    }
}
export default Demo1;
