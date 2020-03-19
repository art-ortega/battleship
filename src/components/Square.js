import React,{Component} from 'react'
import Board from './Board'

class Square extends Component {
    
    handleClick = () =>{
        if(this.props.userStatus === "" && this.props.userTurn === "user" ){
         this.props.handleBoard(this.props.index)
        }
    }
    
    render(){
        return(
           <div className ="square" onClick={this.handleClick} >
               {this.props.value}
           </div> 
        )
    }
}

export default Square