import { useMemo } from "react";
import { Card } from "./components/Card";
import { Header } from "./components/Header";
import { Modal } from "./components/Modal";
import { useMemoryGame } from "./hooks/useMemoryGame";

const App = () => {
  const {
    imgCards,
    yourScore,
    bestScore,
    showModal,

    frontRef,
    handleClickCard,
    handleStart,
    handleHideModal,
    checkDisability,
  } = useMemoryGame();

  return (
    <>
      {showModal && (
        <Modal
          yourScore={yourScore}
          bestScore={bestScore}
          onHideModal={handleHideModal}
          onRestart={handleStart}
        />
      )}
      <div className="max-w-xl mx-auto bg-white shadow py-5 px-6 my-8 rounded">
        <Header />
        <div className="border-2 rounded border-blue-300 my-2 p-2 text-base font-bold">
          <div>Your Score: {yourScore}</div>
          <div> Best Score: {bestScore}</div>
        </div>
        <div className="grid grid-rows-4 gap-y-2 grid-flow-col gap-3  rounded p-3 border-blue-300 border-2">
          {imgCards.map((item, index) => {
            return (
              <Card
                key={index}
                imageCard={item}
                ref={(el) => (frontRef.current[index] = el)}
                isDisabled={checkDisability(item.name)}
                onClick={(e) => handleClickCard(e, item, index)}
              />
            );
          })}
        </div>
        <div className=" my-3 p-3 flex justify-center">
          <button
            onClick={handleStart}
            className="text-xl  py-2 px-6  border  rounded bg-blue-500 hover:bg-blue-700 text-white font-semibold border-blue-700 disabled:bg-gray-300 "
          >
            start
          </button>
        </div>
      </div>
    </>
  );
};

export default App;
