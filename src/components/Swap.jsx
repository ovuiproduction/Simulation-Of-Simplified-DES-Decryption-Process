import React, { useEffect, useState } from "react";

import "../css/simple-des-max.css";
import "../css/simple-des-min.css";

export default function Swap({ inputText, onResultUpdate }) {
  const [result, setResult] = useState([]);
  const leftNibble = inputText.slice(0, inputText.length / 2);
  const rightNibble = inputText.slice(inputText.length / 2);

  useEffect(() => {
    setResult([...rightNibble, ...leftNibble]);
  }, []);

  useEffect(() => {
    if (result.length == 8) {
      if (onResultUpdate) {
        onResultUpdate(result);
      }
    }
  }, [result]);

  return (
    <>
      <div className="result-number-block">
        <div className="bit-number-display">
          <h3>Combine key : </h3>
          <div className="bit-block">
            {inputText.map((element, j) => (
              <span key={j} className="bit-element">
                {element}
              </span>
            ))}
          </div>
        </div>

        <div className="combine-block">
          <div className="bit-number-display">
            <h3>Left Nibble : </h3>
            <div className="bit-block">
              {leftNibble.map((element, j) => (
                <span key={j} className="bit-element">
                  {element}
                </span>
              ))}
            </div>
          </div>

          <div className="bit-number-display">
            <h3>Right Nibble :</h3>
            <div className="bit-block">
              {rightNibble.map((element, j) => (
                <span key={j} className="bit-element">
                  {element}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="bit-number-display">
          <h3>Swap result : </h3>
          <div className="bit-block">
            {result.map((char, i) => (
              <span key={i} className="bit-element">
                {char}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
