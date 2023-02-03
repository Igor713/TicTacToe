import { useEffect } from 'react'
import { useState } from 'react'
import './styles.scss'

const winningCombinations = [
  //Horizontal
  { indexes: [0, 1, 2], position: 'horizontal' },
  { indexes: [3, 4, 5], position: 'horizontal' },
  { indexes: [6, 7, 8], position: 'horizontal' },

  //Vertical
  { indexes: [0, 3, 6], position: 'vertical' },
  { indexes: [1, 4, 7], position: 'vertical' },
  { indexes: [2, 5, 8], position: 'vertical' },

  //Diagonal
  { indexes: [0, 4, 8], position: 'diagonal-1' },
  { indexes: [2, 4, 6], position: 'diagonal-2' },
]
function App() {
  const [gameData, setGameData] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [turn, setTurn] = useState(1)
  const [winningCombo, setWinningCombo] = useState(null)

  const handleClick = (clickedIndex) => {

    if (gameData[clickedIndex] !== 0) {
      return
    }

    if (winningCombo) {
      return
    }

    setGameData((prev) => {
      const newGameData = [...prev]
      newGameData[clickedIndex] = turn
      return newGameData
    })

    setTurn((prev) => (prev === 1 ? 2 : 1))

    checkWinner()
  }

  useEffect(() => {
    if (!checkWinner()) {
      checkGameEnded()
    }

  }, [gameData])

  useEffect(() => {
    if (winningCombo) {
      alert('O jogo teve um vencedor')
    }
  }, [winningCombo])

  const checkGameEnded = () => {
    if (gameData.every((item) => item !== 0)) {
      alert('O jogo acabou, deu velha')
    }
  }

  const checkWinner = () => {
    let winner = null

    for (let combination of winningCombinations) {
      const { indexes } = combination
      if (
        gameData[indexes[0]] === 1 &&
        gameData[indexes[1]] === 1 &&
        gameData[indexes[2]] === 1
      ) {
        winner = 'Player 1'
      }
      if (
        gameData[indexes[0]] === 2 &&
        gameData[indexes[1]] === 2 &&
        gameData[indexes[2]] === 2
      ) {
        winner = 'Player 2'
      }
      if (winner) {
        setWinningCombo(combination)
        break
      }
    }
  }

  return (
    <>
      <h1>Jogo da velha</h1>
      <div className='board-game'>
        {gameData.map((value, index) => (
          <span
            onClick={() => {
              handleClick(index)
            }}
            key={index}
            className={winningCombo?.indexes.includes(index) ? winningCombo.position : undefined}
          >
            {value === 1 && 'X'}
            {value === 2 && 'O'}
          </span>
        ))}
      </div>
    </>
  )
}

export default App
