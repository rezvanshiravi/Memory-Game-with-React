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

  const [openCards, setOpenCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [disablecards, setDisableCards] = useState(true);
  const [score, setScore] = useState({
    yourScore: 0,
    bestScore: 1000,
  });

  const [showModal, setShowModal] = useState(false);

  const frontRef = useRef([]);
  const { yourScore, bestScore } = score;

  const handleStart = () => {
    frontRef.current.map((item) => (item.style.transform = ""));
    setMatchedCards([]);
    setOpenCards([]);
    setScore((score) => {
      return { ...score, yourScore: 0 };
    });
    setShowModal(false);

    setDisableCards(false);

    setTimeout(
      () => {
        frontRef.current.map(
          (item) => (item.style.transform = "rotateY(180deg)")
        );
        console.log(1);
        setimgArrayCards(useShuffleCards([...imageArray, ...imageArray]));
        console.log(2);
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
    if (openCards.length == 2) {
      if (openCards[0].item == openCards[1].item) {
        setMatchedCards((matchedCards) => [...matchedCards, openCards[0].item]);
      } else {
        openCards.map(
          (cards) => (frontRef.current[cards.index].style.transform = "")
        );
      }
      setOpenCards([]);
      setDisableCards(false);
      setScore((score) => {
        return { ...score, yourScore: score.yourScore + 1 };
      });
    }
  };

  const handleClickCard = (e, item, index) => {
    frontRef.current[index].style.transform = "rotateY(180deg)";
    setOpenCards((openCards) => [
      ...openCards,
      { item: item.name, index: index },
    ]);

    if (openCards.length === 1) {
      setDisableCards(true);
    }
  };

  const checkDisability = (name) => {
    return matchedCards.includes(name);
  };

  const handleHideModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (openCards.length == 2) {
      setTimeout(() => {
        checkMatchedCards();
      }, 500);
    }
  }, [openCards]);

  useEffect(() => {
    if (matchedCards.length == imageArray.length) {
      setShowModal(true);
      const highScore = Math.min(yourScore, bestScore);
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
    disablecards,
    frontRef,
    handleClickCard,
    handleStart,
    handleHideModal,
    checkDisability,
    openCards,
  };
};
export { useMemoryGame };
