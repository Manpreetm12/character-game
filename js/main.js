const character = document.getElementById('character-wrapper');
const hands = document.querySelectorAll('.hands');
const leftHand = document.getElementById('left-hand');
const rightHand = document.getElementById('right-hand');
const map = document.getElementById('map');
const popUp = document.querySelector('.pop-menu');
const items = document.getElementById('items');
const item2 = document.getElementById('items2');
const body = document.querySelector('body')



let x = 0;
let y = 0;
let prevX = 0;
let prevY = 0;

const speed = 10;
let direction = 0;

const inset = 50;

const length = 20
let mapWidth = 0;
let mapHeight = 0;

let charRect;
let clickX = 0;
let clickY = 0;


mapWidth = mapHeight = length

map.style.width = mapWidth * 128;
map.style.height = mapHeight * 128;

const keys = {};

document.addEventListener('keydown', (e) => {
  keys[e.key.toLowerCase()] = true;
  hands.forEach(hand => hand.classList.add('hands-ani'));
  popUp.style.display = 'none'
});

document.addEventListener('keyup', (e) => {
  keys[e.key.toLowerCase()] = false;
  hands.forEach(hand => hand.classList.remove('hands-ani'));
});

function move() {

  const characterRect = character.getBoundingClientRect();
  const mapRect = map.getBoundingClientRect();



  if (keys['w'] && keys['a']) {
    direction = -45;
  } else if (keys['w'] && keys['d']) {
    direction = 45;
  } else if (keys['s'] && keys['a']) {
    direction = -135;
  } else if (keys['s'] && keys['d']) {
    direction = 135;
  } else if (keys['w']) {
    direction = 0;
  } else if (keys['s']) {
    direction = 180;
  } else if (keys['a']) {
    direction = -90;
  } else if (keys['d']) {
    direction = 90;
  }

  if (keys['w'] && characterRect.top >= mapRect.top + inset) {
    y -= speed;
  };
  if (keys['s'] && characterRect.bottom <= mapRect.bottom - inset) {
    y += speed;
  };
  if (keys['a'] && characterRect.left >= mapRect.left + inset) {
    x -= speed;
  };
  if (keys['d'] && characterRect.right <= mapRect.right - inset) {
    x += speed;
  };


  character.style.transform = `translate(${x}px, ${y}px) rotate(${direction}deg)`;

  if (x === prevX) {
    // console.log('nom')
  } else if (x < prevX && characterRect.right <= mapRect.right / 1.5) {
    // console.log('x left');
    window.scrollBy(-10, 0);
  } else if (x > prevX && characterRect.left >= mapRect.left + mapRect.width * 0.2) {
    // console.log('x right');
    window.scrollBy(10, 0);
  }

  prevX = x;

  if (y === prevY) {
    // console.log('nom')
  } else if (y < prevY && characterRect.bottom <= mapRect.bottom / 1.5) {
    // console.log('y down');
    window.scrollBy(0, -10);
  } else if (y > prevY && characterRect.top >= mapRect.top + mapRect.height * 0.15) {
    // console.log('y up');
    window.scrollBy(0, 10);
  }

  prevY = y;

  requestAnimationFrame(move);
}

move();

for (let i = 0; i < mapWidth; i++) {
  const mapLanes = document.createElement('div');
  mapLanes.classList.add('lanes');
  map.appendChild(mapLanes);

  for (let i = 0; i < mapHeight; i++) {
    const environment = document.createElement('div');
    if (i % 2 === 0) {
      environment.classList.add('grass');
    } else {
      environment.classList.add('water');
    }
    mapLanes.appendChild(environment)
  }
}

window.addEventListener('beforeunload', () => {
  window.scrollTo(0, 0)
});

let onePress = true

document.addEventListener('keydown', (e) => {
  if (e.key === ' ') {
    e.preventDefault();
  }

  if (e.key === ' ' && onePress) {
    console.log('Spacebar Pressed');
    popUp.style.display = 'block';

    charRect = character.getBoundingClientRect();

    charX = charRect.left + window.scrollX;
    charY = charRect.top + window.scrollY;

    popUp.style.transform = `translate(${charX + 100}px, ${charY}px)`;

    onePress = false;
  }
})

popUp.addEventListener('click', (e) => {

  popUp.style.display = 'none';

  if (e.target.classList.contains('item-1')) {
    console.log('1');
    items.classList.add('bow');
    item2.classList.add('arrow');
    leftHand.style.left = '25px';
    leftHand.style.top = '-30px';
    rightHand.style.right = '10px';
    rightHand.style.top = '-5px';
  };

  if (e.target.classList.contains('item-2')) {
    console.log('2');
    items.classList.add('sword');
  };

  if (e.target.classList.contains('item-3')) {
    console.log('3');
    items.classList.add('axe');
  };

});

document.addEventListener('click', (e) => {
  clickX = e.clientX;
  clickY = e.clientY;
  
  charRect = character.getBoundingClientRect();

  const charCenterX = charRect.left + charRect.width / 2;
  const charCenterY = charRect.top + charRect.height / 2;

  const angleRad = Math.atan2(clickY - charCenterY, clickX - charCenterX);
  const angleDeg = angleRad * (180 / Math.PI);

  direction = angleDeg + 90;
  character.style.transform = `translate(${x}px, ${y}px) rotate(${direction}deg)`;

  console.log(direction)
});

let canShoot = true;
let isMouseDown = false;

document.addEventListener('mousedown', (e) => {
  if (!canShoot) return;
  if (!document.querySelector('.bow')) return;

  isMouseDown = true;
  setTimeout(() => {
  items.classList.remove('bow');
  item2.classList.remove('arrow');
  items.classList.add('pulled');
  rightHand.style.zIndex = -1;
  rightHand.style.top = '10px';
  }, 200);

  

});

document.addEventListener('mouseup', (e) => {
  if (!isMouseDown) return;
  isMouseDown = false;

  canShoot = false;
  setTimeout(() => {
    canShoot = true;
  }, 500);

  setTimeout(() => {

  items.classList.remove('pulled');
  items.classList.add('bow');
  item2.classList.add('arrow');
  rightHand.style.top = '-10px';
  rightHand.style.zIndex = 1;
  }, 200);

});



