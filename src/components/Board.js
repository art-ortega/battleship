import React, { Component } from 'react';
import Square from './Square'
class Board extends Component {
  constructor(props) {
    super(props)
    this.state = {
      array: ["rom","asd",4,true,9],
      compBoard: [
        "", "", "", "", "",
        "", "", "", "", "",
        "", "", "", "", "",
        "", "", "", "", "",
        "", "", "", "", ""],
      userBoard: [
        "", "", "", "", "",
        "", "", "", "", "",
        "", "", "", "", "",
        "", "", "", "", "",
        "", "", "", "", ""],
      compBoardHide: [
        "🤪", "🤪", "🤪", "🤪", "🤪",
        "🤪", "🤪", "🤪", "🤪", "🤪",
        "🤪", "🤪", "🤪", "🤪", "🤪",
        "🤪", "🤪", "🤪", "🤪", "🤪",
        "🤪", "🤪", "🤪", "🤪", "🤪"],
      userBoardHide: [
        "🤪", "🤪", "🤪", "🤪", "🤪",
        "🤪", "🤪", "🤪", "🤪", "🤪",
        "🤪", "🤪", "🤪", "🤪", "🤪",
        "🤪", "🤪", "🤪", "🤪", "🤪",
        "🤪", "🤪", "🤪", "🤪", "🤪"],
      gameStart: 0,
      userShips: 2,
      compShips: 2,
      shipArray: [],
      userArray: [],
      userTurn: "user",
      userStatus: "",
      hitMessage: ""
    }
  }
  handleBoard = (index) => {
    let { compBoard, compBoardHide, compShips, userArray, gameStart } = this.state
    if (!(userArray.includes(index)) && gameStart === 1) {
      compBoard[index] = compBoardHide[index]
      userArray.push(index)
      if (compBoard[index] === "🛥💥") {
        this.setState({
          compShips: --compShips,
          hitMessage: "You got him!"
        })
      } else {
        this.setState({ hitMessage: "You missed!" })
      }
      this.setState({
        compBoard: compBoard,
        compBoardHide: compBoardHide,
        userTurn: "computer",
        userArray: userArray
      })
      if (compShips < 1) {
        this.setState({
          userStatus: "You sunk the enemies bootay! You win!"
        })
      }
    } else if (userArray.includes(index)) {
      alert("You already took your shot there, try a different spot!")
    } else if (gameStart === 0) {
      alert("Start the game!")
    }
  }

  resetGame = () => {
    let { compBoard, userBoard, compBoardHide, userBoardHide, userStatus, gameStart } = this.state
    compBoard = compBoard.map(value => value = "")
    userBoard = userBoard.map(value => value = "")
    compBoardHide = compBoardHide.map(value => value = "🤪")
    userBoardHide = userBoardHide.map(value => value = "🤪")
    userStatus = ""
    this.setState({
      compBoard: compBoard,
      userBoard: userBoard,
      compBoardHide: compBoardHide,
      userBoardHide: userBoardHide,
      userStatus: userStatus,
      gameStart: 0,
      hitMessage: "",
      userShips: 2,
      compShips: 2,
      userTurn: "user",
      userArray: [],
      shipArray: []
    })

  }
  //

  randomize = () => {
    // comp = computer , user = you
    let { userBoard, compBoardHide, userBoardHide, gameStart} = this.state
    // finds random index that will assign battleships to compBoardHide
    if (!gameStart) {
      let randomCompBH1 = Math.floor(Math.random() * compBoardHide.length)
      let randomCompBH2 = Math.floor(Math.random() * compBoardHide.length)
      while (randomCompBH1 === randomCompBH2) {
        randomCompBH2 = Math.floor(Math.random() * compBoardHide.length)
      }
      // finds random index that will assign battleships to userBoardHide
      let randomUserBH1 = Math.floor(Math.random() * userBoardHide.length)
      let randomUserBH2 = Math.floor(Math.random() * userBoardHide.length)
      while (randomUserBH1 === randomUserBH2) {
        randomUserBH2 = Math.floor(Math.random() * userBoardHide.length)
      }
      userBoard[randomUserBH1] = "⛵️"
      userBoard[randomUserBH2] = "⛵️"
      userBoardHide[randomUserBH1] = "⛵️"
      userBoardHide[randomUserBH2] = "⛵️"
      compBoardHide[randomCompBH1] = "🛥💥"
      compBoardHide[randomCompBH2] = "🛥💥"
      this.setState({
        userBoard: userBoard,
        compBoardHide: compBoardHide,
        userBoardHide: userBoardHide,
        gameStart: 1
      })
    }
  }
  compChoose = () => {
    let { userBoard, userBoardHide, userShips, shipArray, gameStart, userStatus, userTurn } = this.state
    if (!gameStart) {
      alert("Start the game!")
    } else if (gameStart && userStatus === "" && userTurn === "computer") {
      let compChoice = Math.floor(Math.random() * userBoardHide.length)
      // while(userBoard[compChoice] = "🤪"){
      //     compChoice = Math.floor(Math.random()* userBoardHide.length)
      // }
      while (shipArray.includes(compChoice)) {
        compChoice = Math.floor(Math.random() * userBoardHide.length)
      }
      shipArray.push(compChoice)
      userBoard[compChoice] = userBoardHide[compChoice]
      if (userBoard[compChoice] === "⛵️") {
        userBoard[compChoice] = "⛵️💥"
        this.setState({
          userShips: --userShips,
          hitMessage: "You got hit!"
        })
      } else {
        this.setState({
          hitMessage: "The computer missed!"
        })
      }
      this.setState({
        userBoard: userBoard,
        userBoardHide: userBoardHide,
        userTurn: "user",
        shipArray: shipArray
      })
      if (userShips < 1) {
        this.setState({
          userStatus: "Enemy sunk your bootay!"
        })
      }
      // console.log(compChoice)
      // console.log(shipArray)
    }
  }

  render() {
    let { compBoard, userBoard, userStatus, userTurn, userArray } = this.state
    let compB = compBoard.map((value, index) =>
      <Square
        handleBoard={this.handleBoard}
        index={index}
        value={value}
        userStatus={userStatus}
        userTurn={userTurn}
        userArray={userArray}
      />)
    let userB = userBoard.map((value) =>
      <Square
        value={value}
      />
    )

    return (
      <div className="all">
        <h1>BATTLESHIP</h1>
        <br />
        <div className="full">
          <div className="compbutt">
            <p>Enemy water </p>
            <button onClick={this.compChoose}>Computers Turn</button>
          </div>
          <br />
          <div className="board">
            {compB}
          </div>
          <p>Enemy Ships: {this.state.compShips}</p>
        </div>
        <div className="middlemessage">
          <h1>{this.state.userStatus}</h1>
          <br />
          <p>{this.state.hitMessage}</p>
        </div>
        <br />
        <div className="fullone">
          <div className="notsure">
            <p>Your Water</p>
          </div>
          <br />
          <div className="board">
            {userB}
          </div>
          <p>Your ships:  {this.state.userShips}</p>
        </div>
        <div className="normbutt">
          <button onClick={this.randomize} >Start Game</button>
          <button onClick={this.resetGame}>Reset Game</button>
        </div>
      </div>
    );
  }
}

export default Board
