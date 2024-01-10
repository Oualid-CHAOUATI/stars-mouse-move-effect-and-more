const addClickCircleEffect = () => {
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
addClickCircleEffect();
