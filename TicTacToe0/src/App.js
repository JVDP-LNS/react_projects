import { useState } from 'react'

//TODO: use stack which collects changed indices to implement UNDO

export default function Game() {
  const [turn, setTurn] = useState('X');
  const [curMove, setCurMove] = useState(0);
  const [history, setHistory] = useState([Array(9).fill(' ')]);
  const curHist = history[curMove];
  console.log(history);

  function handlePlay(newCells) {
    const newHist = [...history.slice(0, curMove+1), newCells];
    console.log(newHist);
    setHistory(newHist);
    setCurMove(newHist.length - 1);
    setTurn(turn === 'X' ? 'O' : 'X');
  }

  function jumpTo(nextMove) {
    setCurMove(nextMove);
    setTurn(curMove == 0 ? 'X' : 'O');
  }
  
  const moves = history.map((cells, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board curTurn={turn} curCells={curHist} onPlay={handlePlay}/>
      </div>
      <div className="game-info">
        <ol>
          {
            moves
          }
        </ol>
      </div>
    </div>
  );
}

const SquareComp = ({cellValue, handleOnClick}) => {
  return <button className="square" onClick={handleOnClick}>{cellValue}</button>;
}

const Board = ({curTurn, curCells, onPlay}) => {

  let statusText = "Game is running"
  const winner = calculateWinner(curCells);
  if(winner != ' ') {
    console.log("renderingWin")
    statusText = "Winner: " + winner;
  }
  else {
    console.log("renderingNone")
    statusText = "Winner: " + winner;
  }

  const handleClick = (i) => {
    if(curCells[i] !== ' ')
      return;
    const newCells = curCells.slice();
    newCells[i] = curTurn;
    onPlay(newCells);
  }

  return <>
    <div className='status'>
      {statusText}
    </div>
    <div className='board-row'>
      <SquareComp cellValue={curCells[0]} handleOnClick={() => handleClick(0)}/>
      <SquareComp cellValue={curCells[1]} handleOnClick={() => handleClick(1)}/>
      <SquareComp cellValue={curCells[2]} handleOnClick={() => handleClick(2)}/>
    </div>
    <div className='board-row'>
      <SquareComp cellValue={curCells[3]} handleOnClick={() => handleClick(3)}/>
      <SquareComp cellValue={curCells[4]} handleOnClick={() => handleClick(4)}/>
      <SquareComp cellValue={curCells[5]} handleOnClick={() => handleClick(5)}/>
    </div>
    <div className='board-row'>
      <SquareComp cellValue={curCells[6]} handleOnClick={() => handleClick(6)}/>
      <SquareComp cellValue={curCells[7]} handleOnClick={() => handleClick(7)}/>
      <SquareComp cellValue={curCells[8]} handleOnClick={() => handleClick(8)}/>
    </div>
  </>;
}

function calculateWinner(curCells) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (curCells[a] && curCells[a] === curCells[b] && curCells[a] === curCells[c]) {
      return curCells[a];
    }
  }
  return ' ';
}

