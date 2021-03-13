const grid = document.querySelector('.grid')
const startButton = document.querySelector('#start')
const scoreDisplay = document.querySelector('#score')
let squares = []
let currentSnake = [2,1,0]
let direction = 1
const width = 10
let appleIndex = 0
let score = 0
let intervalTime = 1000
let speed = 0.5

function createGrid() {

  for (let i = 0; i < width*width; i++){
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

  if (
    (currentSnake[0] + width >= width*width && direction === width) ||
    (currentSnake[0] % width === width-1 && direction === 1) ||
    (currentSnake[0] % width === 0 && direction === -1) ||
    (currentSnake[0] - width < 0 && direction === -width) ||
    squares[currentSnake[0] + direction].classList.contains('snake')
  )
  return clearInterval(timerId)

  //remove last element from currentSnake array 
  const tail = currentSnake.pop()

  //remove styling from the last element
  squares[tail].classList.remove('snake')

  //add square in direction we are heading
  currentSnake.unshift(currentSnake[0] + direction)
  
  
  //snake head getting the apple
  if(squares[currentSnake[0]].classList.contains('apple')) {
    //remove the class of apple
    squares[currentSnake[0]].classList.remove('apple')
    //grow the snake by 1
    squares[tail].classList.add('snake')
    //grow our snake array
    currentSnake.push(tail)
    //generate a new apple
    generateApples()
    //add one to the score
    score++
    //display score
    scoreDisplay.textContent = score
    //speed up our snake
    clearInterval(timerId)
    intervalTime = intervalTime * speed
    timerId = setInterval(move, intervalTime)

  }


  //add styling so we can see it
  squares[currentSnake[0]].classList.add('snake')
}
move()

let timerId = setInterval(move, intervalTime)

function generateApples() {
  do {
    appleIndex = Math.floor(Math.random()*width*width)
    console.log(appleIndex)
  } while (squares[appleIndex].classList.contains('snake')) 

  squares[appleIndex].classList.add('apple')
}

generateApples()
// 39 - right arrow
// 38 - up arrow
// 37 - left arrow
// 40 - down arrow

function control(e) {
  if (e.keyCode == 39) {
    console.log('right')
    direction = 1
  } else if (e.keyCode === 38) {
    console.log('up')
    direction = -width
  } else if (e.keyCode === 37) {
    console.log('left')
    direction = -1
  } else if (e.keyCode === 40) {
    console.log('down')
    direction = width
  }
}

document.addEventListener('keyup', control)

