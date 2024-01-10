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

class StarsEffect {
  constructor() {
    this.initData();
    this.mooveEffect();
    this.drawSomeCirclesAtStart();

    const { drawFromLeft, drawFromRight } = this.drawLineWithStarsClosure();
    drawFromLeft();
    drawFromRight();
    setTimeout(() => {
      drawFromLeft();
      drawFromRight();
    }, 3200);
  }

  initData() {
    this.colors = ["2de1fc", "b2ffa9", "ff01fb"];
    this.star = document.querySelector("template");
  }

  mooveEffect() {
    let lastPosition = null;
    const DISTANCE = 30;
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

    window.addEventListener("mousemove", (e) => {
      let dx = 0;
      let dy = 0;
      let d = null;
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
        const color = this.colors[random];
        this.createStar({ pos: { x, y }, randomIndex: random });
        createShadow({ pos: { x, y } });
      }
    });
  }
  //done
  createStar({ pos: { x, y }, randomIndex = 0, parentNode = document.body }) {
    console.log("create star");
    const starCopy = this.star.content.cloneNode(true).querySelector("svg");

    starCopy.style.setProperty("--x", `${x}px`);
    starCopy.style.setProperty("--y", `${y}px`);
    starCopy.style.setProperty("--animationName", `fallingStar${randomIndex}`);
    starCopy.style.color = this.colors[randomIndex];
    starCopy.classList.add(`star`);

    parentNode.appendChild(starCopy);

    setTimeout(() => {
      starCopy.remove();
    }, 4000);
  }
  promiseDrawStar({
    x,
    y,
    randomIndex = getRandom(),
    afterDelay = 0,
    parentNode = document.window,
  }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.createStar({
          pos: { x, y },
          randomIndex: getRandom(),
          parentNode,
        });
        resolve(true);
      }, afterDelay);
    });
  }
  drawLineWithStarsClosure() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const maxDistance = Math.sqrt(width * width + height * height);

    const minDistance = 40;
    const maxPoints = maxDistance / minDistance;
    const dx = width / maxPoints;
    const dy = height / maxPoints;

    // Convertit l'angle en radians en degrés
    const yOffset = 100;
    let i = 0;

    const drawFromLeft = () => {
      let x = 0;
      let y = 0 + yOffset;

      const position = { x, y };
      const sign = 1;
      const condition = () => position.x < width;
      sharedPartPromise(position, condition, sign);
    };
    const drawFromRight = () => {
      let x = width;
      let y = height - yOffset;

      const position = { x, y };
      const sign = -1;
      const condition = () => position.x > 0;
      sharedPartPromise(position, condition, sign);
    };

    const sharedPartPromise = async (position, condition, sign) => {
      while (condition()) {
        await this.promiseDrawStar({
          x: position.x,
          y: position.y,
          randomIndex: getRandom(),
          afterDelay: 80,
        });
        position.x += dx * sign;
        position.y += dy * sign;
      }
      return new Promise((res) => res(true));
    };
    return { drawFromLeft, drawFromRight };
  }
  drawSomeCirclesAtStart() {
    const width = window.innerWidth;
    const time = 400;
    //le width en percentage percentage(10) => radius = 10% de $width
    const percentage = (per) => width * per * 0.01;
    const min = Math.min;
    this.drawCircleWithStarsPromise(min(percentage(10), 100), 1400, 2);
    this.drawCircleWithStarsPromise(min(percentage(10), 100), 3400);
    this.drawCircleWithStarsPromise(min(percentage(20), 200), 200);
    this.drawCircleWithStarsPromise(min(percentage(40), 400), 400);
  }

  drawCircleWithStarsPromise(radius, after = 0, degStep = null) {
    const centered = document.querySelector(".centered");

    let i = 0;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        for (let deg = 0; deg < 45; deg += degStep | 1) {
          const x = radius * Math.cos(deg);
          const y = radius * Math.sin(deg);
          console.log({ x, y, deg });

          this.promiseDrawStar({
            x,
            y,
            randomIndex: getRandom(),
            parentNode: centered,
          });
        }

        resolve(true);
      }, after);
    });
  }
}

new StarsEffect();
