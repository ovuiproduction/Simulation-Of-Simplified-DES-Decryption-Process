import React, { useEffect, useState } from "react";

import "../css/simple-des-max.css";
import "../css/simple-des-min.css";

export default function DivideAndEP({ inputText, ep, onResultUpdate }) {
  const [epRightNibble, setEPRightNibble] = useState([]);
  const [detailedTextRightNibble, setDetailedTextRightNibble] = useState([]);

  const leftNibble = inputText.slice(0, inputText.length / 2);
  const rightNibble = inputText.slice(inputText.length / 2);

  useEffect(() => {
    ep.forEach((index, i) => {
      setTimeout(() => {
        setEPRightNibble((prev) => {
          const newAnimatedKey = [...prev];
          newAnimatedKey[i] = rightNibble[index - 1];
          return newAnimatedKey;
        });
        setDetailedTextRightNibble((prev) => {
          const newText = [
            ...prev,
            `updatedPT[${i}] = PT[EP[${i}]-1] = PT[${index - 1}] = ${
              rightNibble[index - 1]
            }`,
          ];
          return newText;
        });
      }, i * 1000); // Adjust the delay as needed
    });
  }, []);

  useEffect(() => {
    if (epRightNibble.length == 8) {
      if (onResultUpdate) {
        onResultUpdate({ leftNibble, rightNibble, epRightNibble });
      }
    }
  }, [epRightNibble]);

  return (
    <>
      <div className="result-number-block">
        <div className="bit-number-display">
          <h3>Initial Permuted Text :</h3>
          <div className="bit-block">
            {inputText.map((element, j) => (
              <span key={j} className="bit-element">
                {element}
              </span>
            ))}
          </div>
        </div>

        <div className="bit-number-display">
          <h3>EP :</h3>
          <div className="bit-block">
            {ep.map((element, j) => (
              <span key={j} className="bit-element">
                {element}
              </span>
            ))}
          </div>
        </div>

        <div className="lsc1-main-block">
          <div className="lsc1-sub-block">
            <div className="bit-number-display">
              <h3>Left Nibble :</h3>
              <div className="bit-block">
                {leftNibble.map((element, j) => (
                  <span key={`left-${j}`} className="bit-element">
                    {element}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="lsc1-sub-block">
            <div className="bit-number-display">
              <h3>Right Nibble : </h3>
              <div className="bit-block">
                {rightNibble.map((element, j) => (
                  <span key={`right-${j}`} className="bit-element">
                    {element}
                  </span>
                ))}
              </div>
            </div>

            <div className="array-generation-block">
              {detailedTextRightNibble.map((element, i) => (
                <p className="generation-line" key={i}>
                  {element}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="bit-number-display">
          <h3>Updated Right Nibble: </h3>
          <div className="bit-block">
            {epRightNibble.map((element, j) => (
              <span key={`right-updated-${j}`} className="bit-element">
                {element}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
