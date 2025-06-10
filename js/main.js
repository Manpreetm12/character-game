const character = document.getElementById('character-wrapper');
const hands = document.querySelectorAll('.hands');
const map = document.getElementById('map');
const popUp = document.querySelector('.pop-menu');


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

mapWidth = mapHeight = length

map.style.width = mapWidth * 128;
map.style.height = mapHeight * 128;


function c(log) {
  const [label] = Object.key(log)
  console.log(`${label}`, log[label])
}

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
    console.log('x left');
    window.scrollBy(-10, 0);
  } else if (x > prevX && characterRect.left >= mapRect.left + mapRect.width * 0.2) {
    console.log('x right');
    window.scrollBy(10, 0);
  }

  prevX = x;

  if (y === prevY) {
    // console.log('nom')
  } else if (y < prevY && characterRect.bottom <= mapRect.bottom / 1.5) {
    console.log('y down');
    window.scrollBy(0, -10);
  } else if (y > prevY && characterRect.top >= mapRect.top + mapRect.height * 0.15) {
    console.log('y up');
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
  window.scrollTo(0 , 0)
});

document.addEventListener('keydown', (e) => {
  if (e.key === ' ') {
    e.preventDefault();
    console.log('Spacebar Pressed');
    popUp.style.display = 'block'; 

    charRect = character.getBoundingClientRect();

    charX = charRect.left + window.scrollX;
    charY = charRect.top + window.scrollY;

    popUp.style.transform = `translate(${charX + 100}px, ${charY}px)`;

  }
})