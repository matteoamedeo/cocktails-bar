import React, { useState, useEffect } from "react";

const MenuLinks = ({ horizontal }) => {
  const [windowLoaded, setWindowLoaded] = useState(false);

  useEffect(() => {
    setWindowLoaded(true);
  }, []);

  return (
    <div
      className={
        horizontal ? "menuLinks-wrapper-horizontal" : "menuLinks-wrapper"
      }
    >
      <ul className="list-group">
        <li
          className={
            "list-group-item border-0 p-3 text-white " +
            (windowLoaded ? "showLink" : "")
          }
        >
          <a
            className="text-white text-decoration-none"
            href="/tutti-i-cocktail"
          >
            Tutti i cocktail
          </a>
        </li>
        <li
          className={
            "list-group-item border-0 p-3 text-white " +
            (windowLoaded ? "showLink" : "")
          }
        >
          <a
            className="text-white text-decoration-none"
            href="/crea-il-tuo-cocktail"
          >
            Crea una ricetta
          </a>
        </li>
        <li
          className={
            "list-group-item border-0 p-3 text-white " +
            (windowLoaded ? "showLink" : "")
          }
        >
          <a className="text-white text-decoration-none" href="#">
            Cerca
          </a>
        </li>
      </ul>
    </div>
  );
};

export default MenuLinks;
