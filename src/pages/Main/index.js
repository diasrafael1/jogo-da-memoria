import { useState } from "react";
import Cards from "../../cards";
import "./style.css";
import Icon from "../../assets/icon.png";
import CardBack from "../../assets/card-back.png";
import Congratulations from "../../assets/congrats.png";

function Main() {
  let index = Cards.length;

  while (index) {
    const randomIndex = Math.floor(Math.random() * index--);
    [Cards[index], Cards[randomIndex]] = [Cards[randomIndex], Cards[index]];
  }
  const [card, setCard] = useState(Cards);
  const [cardsTurneds, setCardTurneds] = useState([]);
  let endGame = false;

  function handleTurnCard(cardName, cardId) {
    let localCardsTurneds = [...cardsTurneds];
    if (localCardsTurneds.length > 1) return;

    const localCards = [...card];
    const findCard = localCards.find((card) => card.id === cardId);
    findCard.turned = true;
    setCard(localCards);

    localCardsTurneds.push({ cardName, cardId });
    setCardTurneds(localCardsTurneds);

    if (localCardsTurneds[0].cardId === localCardsTurneds[1].cardId) {
      return localCardsTurneds.splice(1, 1);
    }

    if (localCardsTurneds.length === 2) {
      if (localCardsTurneds[0].cardName === localCardsTurneds[1].cardName) {
        setTimeout(() => {
          localCardsTurneds.forEach((cardTurned) => {
            const removeCards = localCards.filter((card) => {
              return card.slug !== cardTurned.cardName;
            });
            setCard(removeCards);
            localCardsTurneds = [];
            setCardTurneds(localCardsTurneds);
          });
        }, 500);
      } else {
        setTimeout(() => {
          localCardsTurneds = [];
          setCardTurneds(localCardsTurneds);
          handleReset();
        }, 500);
      }
    }
  }

  function handleReset() {
    const localCards = [...card];
    localCards.map((card) => {
      return (card.turned = false);
    });
    setCard(localCards);
  }

  function handleResetGame() {
    const localCards = [...Cards];
    localCards.map((card) => {
      return (card.turned = false);
    });
    setCard(localCards);
  }

  if (card.length === 0) {
    endGame = true;
  }
  return (
    <div className="container">
      <aside className="menu">
        <div className="menu__logo">
          <img src={Icon} alt="Icon" />
          <h1>CUBOS PUZZLE</h1>
        </div>
        <button onClick={() => handleResetGame()}>RESET</button>
      </aside>
      <main className="game">
        {card.map((card) => (
          <img
            className="game__card"
            src={card.turned ? card.image : CardBack}
            onClick={() => handleTurnCard(card.slug, card.id)}
            alt="Cards back"
          />
        ))}
        {endGame && (
          <img
            className="game__end"
            src={Congratulations}
            alt="Congratulations"
          />
        )}
      </main>
    </div>
  );
}

export default Main;
