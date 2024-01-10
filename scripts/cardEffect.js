const createDivWithClass = (className) => {
  const div = document.createElement("div");
  div.classList.add(className);
  return div;
};
const addCardEffect = () => {
  //sselectoionner pour lui append des élémens par la suite
  const card = document.querySelector(".card");

  //utiliser comme ref
  const card__inner = createDivWithClass("card__inner");

  const ANIMATION_DURATION = 7000; //6 secondes
  const INTERVAL_TIME = 2000; //1 seconde- intervale de création des stars
  const TIMEOUT_REMOVE_TIME = ANIMATION_DURATION * 1.1; //temps après lequel enlever les stars du dom(*1.6) pour s'assurer que l'animation est finie

  //set une variable sur le body, qui sera hérité par les card__inner
  document.body.style.setProperty(
    "--card__inner__duration",
    ANIMATION_DURATION + "ms"
  );

  const timer = setInterval(() => {
    //on utiliser des variables pour pouvoir éliminer les éléments après une certaine durée
    const card__inner_leftClone = card__inner.cloneNode(true);
    card__inner_leftClone.style.setProperty("--sign", -1);

    const card__inner_rightClone = card__inner.cloneNode(true);
    card__inner_rightClone.style.setProperty("--sign", 1);

    card.append(card__inner_leftClone);
    card.append(card__inner_rightClone);

    setTimeout(() => {
      card__inner_leftClone.remove();
      card__inner_rightClone.remove();
    }, TIMEOUT_REMOVE_TIME);
  }, INTERVAL_TIME);
};

addCardEffect();
