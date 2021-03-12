const grid = document.querySelector('.grid')
const startButton = document.querySelector('#start')
const score = document.querySelector('#score')
let squares = []
let currentSnake = [2,1,0]
let direction = 1

function createGrid() {

  for (let i = 0; i < 100; i++){
    //create 100 elements
    const square = document.createElement('div')

    //add styling to the element
    square.classList.add('square')

    //put element into grid
    grid.appendChild(square)

    //push it into a new squares array
    squares.push(square)
  }
}

createGrid()

currentSnake.forEach(index => squares[index].classList.add('snake'))

function move() {
  //remove last element from currentSnake array 
  const tail = currentSnake.pop()

  //remove styling from the last element
  squares[tail].classList.remove('snake')

  //add square in direction we are heading
  currentSnake.unshift(currentSnake[0] + direction)
  
  //add styling so we can see it
  squares[currentSnake[0]].classList.add('snake')
}

move()

let timerID = setInterval(move, 1000)


