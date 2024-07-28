import React, { useState, useEffect } from "react";

import "../css/simple-des-max.css";
import "../css/simple-des-min.css";

export default function DetermineXOR({
  inputText1,
  inputText2,
  onResultUpdate,
}) {
  const [result, setResult] = useState([]);
  const [detailedText, setDetailedText] = useState([]);

  useEffect(() => {
    inputText1.forEach((_, i) => {
      setTimeout(() => {
        setResult((prev) => {
          const newAnimatedKey = [...prev];
          newAnimatedKey[i] = inputText1[i] ^ inputText2[i];
          return newAnimatedKey;
        });
        setDetailedText((prev) => {
          const newText = [
            ...prev,
            `Result[${i}] = Block1[${i}] ^ Block2[${i}] = ${inputText1[i]} ^ ${
              inputText2[i]
            } = ${inputText1[i] ^ inputText2[i]}`,
          ];
          return newText;
        });
      }, i * 1000); // Adjust the delay as needed
    });
  }, []);

  useEffect(() => {
    {
      inputText1.length;
    }
    if (result.length == inputText2.length) {
      if (onResultUpdate) {
        onResultUpdate(result);
      }
    }
  }, [result]);

  return (
    <>
      <div className="result-number-block">
        <div className="bit-number-display">
          <h3>Block1 : </h3>
          <div className="bit-block">
            {inputText1.map((element, j) => (
              <span key={j} className="bit-element">
                {element}
              </span>
            ))}
          </div>
        </div>

        <div className="bit-number-display">
          <h3>Block2 : </h3>
          <div className="bit-block">
            {inputText2.map((element, j) => (
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
          <h3>Block1 ⊕ Block2 : </h3>
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
