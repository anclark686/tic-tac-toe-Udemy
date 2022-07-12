import './App.css';
import React, { useState } from "react"
import { Routes, Route } from "react-router-dom";

const Square = (props) => {

  return (
    <button 
    onClick={props.onClick}
    className="square">
      {props.value}
    </button>
    )
}

const Board = () => {
  const initialSquares = Array(9).fill(null)
  const [squares, setSquares] = useState(initialSquares)
  const [xIsNext, setxIsNext] = useState(true)

  const handleClick = (i) => {
    // make a copy of the squares state array
    const newSquares = [...squares]

    const winnerDeclared = Boolean(checkWinner(newSquares))
    const squareFilled = Boolean(newSquares[i])
    if (winnerDeclared || squareFilled) {
      return
    }

    //mutate the copy, setting the i-th element to 'x'
    newSquares[i] = xIsNext ? 'X' : 'O'

    // call the setSquares function with the mutated copy
    setSquares(newSquares)
    setxIsNext(!xIsNext)
  }

  const renderSquare = (i) => {
    return (
      <Square 
      onClick={() => handleClick(i)}
      value={squares[i]}/>
    )
  }

  const winner = checkWinner(squares)
const status = winner ?
  `Winner: ${winner}` :
  `Next player: ${xIsNext ? 'X' : 'O'}`

  return (
    <div>
      <dic className="status">{status}</dic>
      <div className="board-row">
        {renderSquare(0)}{renderSquare(1)}{renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}{renderSquare(4)}{renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}{renderSquare(7)}{renderSquare(8)}
      </div>
    </div>
  )
}


const Game = () => {
  return (
    <div className="game">
      <h1>Tic-Tac-Toe</h1>
      <Board />
    </div>
  )
}

const checkWinner = (squares) => {
  const lines = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,5], [2,5,8],
    [0,4,8], [2,4,6]
  ]

  for (let line of lines) {
    const [a, b, c] =line;

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Game />} />
      </Routes>

    </div>
  );
}

export default App;
