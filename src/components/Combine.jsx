import React, { useEffect, useState } from "react";

import "../css/simple-des-max.css";
import "../css/simple-des-min.css";

export default function Combine({ inputText1, inputText2, onResultUpdate }) {

  const [result, setResult] = useState([]);

  useEffect(() => {
    setResult([...inputText1, ...inputText2]);
  },[]);

  useEffect(()=>{
    if(result.length == 8){
        if(onResultUpdate){
          onResultUpdate(result);
        }
    }
},[result]);

  return (
    <>
      <div className="result-number-block">
        <div className="combine-block">

        <div className="bit-number-display-lcs1">
        <h3>P4 ⊕ Initial Nibble Left : </h3>
          <div className="bit-block">
            {inputText1.map((element, j) => (
              <span key={j} className="bit-element">
                {element}
              </span>
            ))}
          </div>
        </div>

        <div className="bit-number-display-lcs1">
        <h3>Initial Nibble Right :  </h3>
          <div className="bit-block">
            {inputText2.map((element, j) => (
              <span key={j} className="bit-element">
                {element}
              </span>
            ))}
          </div>
        </div>
        </div>

        <div className="bit-number-display">
        <h3>New (8 bit) Word  : {" "} </h3>
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
