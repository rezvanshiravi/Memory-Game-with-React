import { useEffect, useRef, useState } from "react";
import { useShuffleCards } from "./useShuffleCards";

const imageArray = [
  {
    name: "1",
    src: "1.png",
  },
  {
    name: "2",
    src: "2.png",
  },
  {
    name: "3",
    src: "3.png",
  },
  {
    name: "4",
    src: "4.png",
  },
  {
    name: "5",
    src: "5.png",
  },
  {
    name: "6",
    src: "6.png",
  },
  {
    name: "7",
    src: "7.png",
  },
  {
    name: "8",
    src: "8.png",
  },
  {
    name: "9",
    src: "9.png",
  },
  {
    name: "10",
    src: "10.png",
  },
];

const useMemoryGame = () => {
  const [imgCards, setimgArrayCards] = useState(
    useShuffleCards([...imageArray, ...imageArray])
  );

  const [matchedCards, setMatchedCards] = useState([]);

  const [score, setScore] = useState({
    yourScore: 0,
    bestScore: 1000,
  });

  const [showModal, setShowModal] = useState(false);

  const frontRef = useRef([]);
  const { yourScore, bestScore } = score;
  let openCardsArray = [];
  const handleStart = () => {
    frontRef.current.map((item) => (item.style.transform = ""));
    setMatchedCards([]);

    setScore((score) => {
      return { ...score, yourScore: 0 };
    });
    setShowModal(false);

    setTimeout(
      () => {
        frontRef.current.map(
          (item) => (item.style.transform = "rotateY(180deg)")
        );

        setimgArrayCards(useShuffleCards([...imageArray, ...imageArray]));
      },

      1000
    );
    setTimeout(
      () => {
        frontRef.current.map((item) => (item.style.transform = ""));
      },

      2000
    );
  };

  const checkMatchedCards = () => {
    if (openCardsArray.length === 2) {
      if (openCardsArray[0].name == openCardsArray[1].name) {
        setMatchedCards((matchedCards) => [
          ...matchedCards,
          openCardsArray[0].name,
        ]);
      } else {
        setTimeout(() => {
          openCardsArray.map(
            (cards) => (frontRef.current[cards.index].style.transform = "")
          );
          openCardsArray = [];
        }, 500);
      }

      setScore((score) => {
        return { ...score, yourScore: score.yourScore + 1 };
      });
      // openCardsArray = [];
      //setDisableCards(false);
    }
  };

  const handleClickCard = (e, item, index) => {
    e.preventDefault();
    const name = item.name;
    if (
      openCardsArray.length < 2 &&
      !openCardsArray.some((cards) => cards.index === index)
    ) {
      frontRef.current[index].style.transform = "rotateY(180deg)";

      openCardsArray.push({ name, index });
      checkMatchedCards();
    }
  };

  const checkDisability = (name) => {
    return matchedCards.includes(name);
  };

  const handleHideModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (matchedCards.length == imageArray.length) {
      setShowModal(true);
      const highScore = Math.min(score.yourScore, score.bestScore);
      setScore((score) => {
        return { ...score, bestScore: highScore };
      });

      localStorage.setItem("bestScore", bestScore);
    }
  }, [matchedCards]);
  return {
    imgCards,
    yourScore,
    bestScore,
    showModal,

    frontRef,
    handleClickCard,
    handleStart,
    handleHideModal,
    checkDisability,
  };
};
export { useMemoryGame };
