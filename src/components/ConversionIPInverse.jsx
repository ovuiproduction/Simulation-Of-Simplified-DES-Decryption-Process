import React, { useEffect, useState } from "react";

import "../css/simple-des-max.css";
import "../css/simple-des-min.css";

export default function ConversionIPInverse({
  inputText,
  ipInverse,
  onResultUpdate,
}) {
  const [result, setResult] = useState([]);
  const [detailedText, setDetailedText] = useState([]);

  useEffect(() => {
    ipInverse.forEach((index, i) => {
      setTimeout(() => {
        setResult((prev) => {
          const newAnimatedKey = [...prev];
          newAnimatedKey[i] = inputText[index - 1];
          return newAnimatedKey;
        });
        setDetailedText((prev) => {
          const newText = [
            ...prev,
            `updatedPT[${i}] = Word[IP Inverse[${i}]-1] = PT[${index - 1}] = ${
              inputText[index - 1]
            }`,
          ];
          return newText;
        });
      }, i * 1000); // Adjust the delay as needed
    });
  }, []);

  useEffect(() => {
    if (result.length == inputText.length) {
      if (onResultUpdate) {
        onResultUpdate(result);
      }
    }
  }, [result]);

  return (
    <>
      <div className="result-number-block">
        <div className="bit-number-display">
          <h3>IP Inverse: </h3>
          <div className="bit-block">
            {ipInverse.map((element, j) => (
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
          <h3>Final Text : </h3>
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
