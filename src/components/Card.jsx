import { forwardRef } from "react";
import questionImage from "../images/question.png";

const Card = forwardRef(({ imageCard, isDisabled, onClick }, ref) => {
  return (
    // <div className="w-auto">
    //   <img src={questionImage} alt="question" />
    // </div>
    <div
      className="flip-box"
      onClick={(e) => {
        !isDisabled && onClick(e);
      }}
      disabled={isDisabled}
    >
      <div ref={ref} className="flip-box-inner">
        <div className="flip-box-front">
          <img src={questionImage} alt="Paris" />
        </div>
        <div className="flip-box-back">
          <img src={require("../images/" + imageCard.src)} alt="Paris" />
        </div>
      </div>
    </div>
  );
});
export { Card };
