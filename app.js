/**
 *
 * @param  max :
 * @returns Number included in [0,max]
 */

function getRandom(max = 2) {
  let random = Math.random() * (max + 1);
  random = Math.ceil(random) - 1;
  return random;
}

const addStarsEffect = () => {
  const colors = ["2de1fc", "b2ffa9", "ff01fb"];
  let lastPosition = null;
  const DISTANCE = 30;
  const star = document.querySelector("template");

  function createStar({
    pos: { x, y },
    randomIndex = 0,
    parentNode = document.body,
  }) {
    const starCopy = star.content.cloneNode(true).querySelector("svg");

    starCopy.style.setProperty("--x", `${x}px`);
    starCopy.style.setProperty("--y", `${y}px`);
    starCopy.style.setProperty("--animationName", `fallingStar${randomIndex}`);
    starCopy.style.color = colors[randomIndex];
    starCopy.classList.add(`star`);
    // starCopy.classList.add(className);

    parentNode.appendChild(starCopy);

    setTimeout(() => {
      starCopy.remove();
    }, 4000);
  }
  function createShadow({ pos: { x, y }, parentNode = document.body }) {
    const shadow = document.createElement("div");

    shadow.classList.add(`shadow`);
    shadow.style.setProperty("--x", `${x}px`);
    shadow.style.setProperty("--y", `${y}px`);
    parentNode.append(shadow);

    setTimeout(() => {
      shadow.remove();
    }, 4000);
  }

  function drawCircleWithStars(radius) {
    const centered = document.querySelector(".centered");

    for (let deg = 0; deg < 360; deg += 20) {
      const x = radius * Math.cos(deg);
      const y = radius * Math.sin(deg);

      createStar({
        pos: { x, y },
        randomIndex: getRandom(),
        parentNode: centered,
      });
    }
  }

  function promiseDrawCircle(radius, time) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        drawCircleWithStars(radius);
        resolve(true);
      }, time);
    });
  }

  promiseDrawCircle(40, 200)
    .then(() => promiseDrawCircle(80, 500))
    .then(() => promiseDrawCircle(120, 400))
    .then(() => promiseDrawCircle(180, 500))
    .then(() => promiseDrawCircle(400, 300))
    .then(() => promiseDrawCircle(230, 600));

  let dx = 0;
  let dy = 0;
  let d = null;
  window.addEventListener("mousemove", (e) => {
    const { x, y } = e;
    // console.log(position);
    if (lastPosition) {
      dx = lastPosition.x - x;
      //^   dx = Math.abs(dx); -> no need because we need  dx^2 (which is positive)
      dy = lastPosition.y - y;
      //   dy = Math.abs(dy);
      d = Math.sqrt(dx * dx + dy * dy);
    }
    // console.log(d);

    if (d == null || d > DISTANCE) {
      lastPosition = { x, y };
      const random = getRandom();
      const color = colors[random];
      createStar({ pos: { x, y }, randomIndex: random });
      createShadow({ pos: { x, y } });
    }
  });
};

const addCircleEffect = () => {
  window.addEventListener("click", (e) => {
    const { x, y } = e;

    const circle = document.createElement("div");
    circle.classList.add("circle");
    circle.style.setProperty("--x", x + "px");
    circle.style.setProperty("--y", y + "px");

    document.body.appendChild(circle);
    console.log("creating cirlce");

    setTimeout(() => {
      console.log("removing circle");
      console.log(circle);
      circle.remove();
    }, 3000);
  });
};

const addCardEffect = () => {
  const card = document.querySelector(".card");
  const div = document.createElement("div");
  const cardLeft = div.cloneNode(true);
  cardLeft.classList.add("card__left");
  cardLeft.style.setProperty("--sign", -1);

  const cardRight = div.cloneNode(true);
  cardRight.classList.add("card__right");
  cardRight.style.setProperty("--sign", 1);

  const card__inner = div.cloneNode(true);
  card__inner.classList.add("card__inner");

  card.append(cardLeft);
  card.append(cardRight);

  setInterval(() => {
    const card__inner_leftClone = card__inner.cloneNode(true);
    const card__inner_rightClone = card__inner.cloneNode(true);
    cardLeft.appendChild(card__inner_leftClone);
    cardRight.appendChild(card__inner_rightClone);

    setInterval(() => {
      card__inner_leftClone.remove();
      card__inner_rightClone.remove();
    }, 10000);
  }, 1000);
};

addStarsEffect();
addCircleEffect();
addCardEffect();
