import React from 'react';
import Home from 'assets/images/home.png';
import './style.scss';

export default function Content() {
  return (
    <div className="home-container min-height">
      <h1 className="home-container__title">
        Encontre passagens aéreas com desconto!
      </h1>
      <p className="home-container__subtitle pb-0">
        Compre passagens econômicas sem precisar ter milhas.
      </p>
      <img src={Home} alt="" className="home-container__background" />
    </div>
  );
}
