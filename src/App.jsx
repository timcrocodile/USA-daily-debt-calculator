import { useState } from "react";

import "./App.css";
import Previous from "./previous";
import Previous2 from "./previous2";
import Previous3 from "./previous3";
import PreviousFirst from "./PreviousFirst";
import React from "react";
import Previous4 from "./previous4";

function App() {
  const [debtHeld, setDebtHeld] = useState(null);
  const [debtHeld2, setDebtHeld2] = useState(null);
  const [debtHeld3, setDebtHeld3] = useState(null);
  const [debtHeld4, setDebtHeld4] = useState(null);
  const [debtHeld5, setDebtHeld5] = useState(null);

  const handleDebtHeld = (value) => {
    setDebtHeld(value);
  };

  const handleDebtHeld2 = (value) => {
    setDebtHeld2(value);
  };

  const handleDebtHeld3 = (value) => {
    setDebtHeld3(value);
  };

  const handleDebtHeld4 = (value) => {
    setDebtHeld4(value);
  };
  const handleDebtHeld5 = (value) => {
    setDebtHeld5(value);
  };

  function numberWithWords(number) {
    const integerPart = Math.floor(number);
    const trillion = 1000000000000;
    const billion = 1000000000;
    const million = 1000000;

    let word = "";

    if (integerPart >= trillion) {
      word += Math.floor(integerPart / trillion) + " TRILLION ";
    }

    if (integerPart >= billion) {
      word += Math.floor(integerPart / billion) + " BILLION ";
    }
    if (integerPart >= million) {
      word += Math.floor((integerPart % billion) / million) + " MILLION ";
    }

    word += "$dollars💵 ";

    return word;
  }

  let difference;
  let debtToSubtract = debtHeld2 ?? debtHeld3 ?? debtHeld4 ?? debtHeld5;
  if (debtHeld) {
    difference = debtHeld - debtToSubtract;
  } else if (debtHeld2) {
    difference = debtHeld2 - (debtHeld3 ?? debtHeld4 ?? debtHeld5);
  } else if (debtHeld3) {
    difference = debtHeld3 - (debtHeld4 ?? debtHeld5);
  } else if (debtHeld4) {
    difference = debtHeld4 - debtHeld5;
  }

  let differenceText = "";
  if (difference > 0) {
    differenceText = `  Compared to yesterday the USA national debt has 🚀skyrocketed by: ${numberWithWords(
      difference
    )}`;
  } else if (difference < 0) {
    differenceText = ` Compared to yesterday the USA national debt has 🥱 decreased by: ${numberWithWords(
      Math.abs(difference)
    )}`;
  } else {
    differenceText = "";
  }

  const [showMessage, setShowMessage] = useState(false);

  const handleAsteriskClick = () => {
    setShowMessage(!showMessage);
  };

  return (
    <>
      <div className="container">
        <div>
          <p className="differencetext">
            {differenceText}{" "}
            <span onClick={handleAsteriskClick} style={{ cursor: "pointer" }}>
              (*)
            </span>
          </p>{" "}
          {showMessage && (
            <div>
              <p className="alert">
                * The measurement was carried out by comparing the most recent
                data available, which is usually from two days prior (t-2).
              </p>
            </div>
          )}
        </div>

        <PreviousFirst onDebtHeld={handleDebtHeld} />
        <Previous onDebtHeld2={handleDebtHeld2} />
        <Previous2 onDebtHeld3={handleDebtHeld3} />
        <Previous3 onDebtHeld4={handleDebtHeld4} />
        <Previous4 onDebtHeld5={handleDebtHeld5} />
      </div>
    </>
  );
}

export default App;
