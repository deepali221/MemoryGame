const items = [
  {
    name:'bunny',
    img: './img/Bugs_Bunny.png'
  }, {
    name: 'duck',
    img: './img/Daffyduck.png'
  }, {
    name: 'minnie',
    img: './img/Minnie.png'
  }, {
    name: 'scooby',
    img: './img/scooby-doo.png'
  }, {
    name: 'sebastian',
    img: './img/Sebastian.png'
  }, {
    name: 'bob',
    img: './img/Sideshow_Bob.png'
  }
];

let selected, clickCount = 0, delay=1000;

let deck = items.concat(items);
// Randomize the deck
deck.sort(function () {
  return .5 - Math.random();
});
// Fetch game div by its ID
let game = document.getElementById('game');
// Creating the grid
const grid = document.createElement('div');
grid.setAttribute('class', 'grid');
// Add grid to the game
game.appendChild(grid);

deck.forEach((item)=>{
  let card = document.createElement('div');

  let front = document.createElement('div');
  front.classList.add('front')
  front.dataset.name = item.name;

  let back = document.createElement('div');
  back.classList.add('back')
  back.style.backgroundImage = `url(${item.img})`

  card.appendChild(back)
  card.appendChild(front)
  card.classList.add('card');
  grid.appendChild(card);
})

let resetCard = () =>{
  let selectedElements = document.querySelectorAll('.selected')
  for (i = 0; i < selectedElements.length; i++) {
    selectedElements[i].classList.remove('selected');
  }
  selected = false;
  clickCount = 0;
}

let cardsMatch = ()=>{
  let selectedElements = document.querySelectorAll('.selected')
  for (i = 0; i < selectedElements.length; i++) {
    selectedElements[i].classList.remove('selected');
    selectedElements[i].classList.add('match');
  }
  selected = false;
  clickCount = 0;
}

grid.addEventListener('click',function(e){
  if(clickCount === 2){return}

  let clicked = e.target;
  let parent = clicked.parentElement;
  if (clicked.classList.contains('grid') || parent.classList.contains('selected') || clicked.classList.contains('back')) {
    return
  }

  parent.classList.add('selected')
  clickCount++

  if (selected){
    if(selected === clicked.dataset.name){
      setTimeout(cardsMatch, delay);
    }else{
      setTimeout(resetCard, delay);
    }
  }else {
    selected = clicked.dataset.name
  }
})