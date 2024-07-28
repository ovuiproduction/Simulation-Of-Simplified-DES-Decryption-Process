import React, { useEffect, useState } from "react";

import "../css/simple-des-max.css";
import "../css/simple-des-min.css";

export default function ConversionP4({ inputText, p4, onResultUpdate }) {
  const [result, setResult] = useState([]);
  const [detailedText, setDetailedText] = useState([]);

  useEffect(() => {
    p4.forEach((index, i) => {
      setTimeout(() => {
        setResult((prev) => {
          const newAnimatedKey = [...prev];
          newAnimatedKey[i] = inputText[index - 1];
          return newAnimatedKey;
        });
        setDetailedText((prev) => {
          const newText = [
            ...prev,
            `updatedPT[${i}] = sBoxResult[P4[${i}]-1] = sBoxResult[${
              index - 1
            }] = ${inputText[index - 1]}`,
          ];
          return newText;
        });
      }, i * 1000); // Adjust the delay as needed
    });
  }, []);

  useEffect(() => {
    if (result.length == 4) {
      if (onResultUpdate) {
        onResultUpdate(result);
      }
    }
  }, [result]);

  return (
    <>
      <div className="result-number-block">
        <div className="bit-number-display">
          <h3>SBox Result :</h3>
          <div className="bit-block">
            {inputText.map((element, j) => (
              <span key={j} className="bit-element">
                {element}
              </span>
            ))}
          </div>
        </div>

        <div className="bit-number-display">
          <h3>P4 :</h3>
          <div className="bit-block">
            {p4.map((element, j) => (
              <span key={j} className="bit-element">
                {element}
              </span>
            ))}
          </div>
        </div>

        <div className="array-generation-block">
          {detailedText.map((text, i) => (
            <p className="generation-line" key={i}>
              {text}
            </p>
          ))}
        </div>

        <div className="bit-number-display">
        <h3>Updated Text :{" "} </h3>
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
