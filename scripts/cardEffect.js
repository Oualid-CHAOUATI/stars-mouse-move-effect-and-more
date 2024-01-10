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

addCardEffect();
