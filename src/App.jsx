import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Previous from "./previous";
import Previous2 from "./previous2";
import Previous3 from "./previous3";
import PreviousFirst from "./PreviousFirst";
import React from "react";
import { GiHamburgerMenu, GiHearingDisabled } from "react-icons/gi";
import Operations from "./operations";
import Menu from "./hamburger";
import Video from "./assets/ocean.mp4";
import Image from "./assets/sfondo.jpg";

function App() {
  const [debtHeld, setDebtHeld] = useState(null);
  const [debtHeld2, setDebtHeld2] = useState(null);
  const [debtHeld3, setDebtHeld3] = useState(null);
  const [debtHeld4, setDebtHeld4] = useState(null);

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

  // useEffect(() => {
  //   const today = new Date();
  //   today.setDate(today.getDate() - 2);
  //   const year = today.getFullYear();
  //   const month =
  //     today.getMonth() + 1 < 10
  //       ? `0${today.getMonth() + 1}`
  //       : today.getMonth() + 1;
  //   const day = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
  //   const date = `${year}-${month}-${day}`;
  //   const url = `https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v2/accounting/od/debt_to_penny?filter=record_date:eq:${date}`;
  //   const fetchData = async () => {
  //     try {

  //       const response = await fetch(url);
  //       const result = await response.json();
  //       setDebt(result);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  // if (!debt) {
  //   return <p>Loading data...</p>;
  // }

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

  // const difference = debtHeld - debtHeld2;
  let difference;
  let debtToSubtract = debtHeld2 ?? debtHeld3 ?? debtHeld4;
  if (debtHeld) {
    difference = debtHeld - debtToSubtract;
  } else if (debtHeld2) {
    // difference = debtHeld2 - debtToSubtract;
    difference = debtHeld2 - (debtHeld3 ?? debtHeld4);
  } else if (debtHeld3) {
    difference = debtHeld3 - debtHeld4;
  }

  let differenceText = "";
  if (difference > 0) {
    differenceText = ` 🚀 Compared to yesterday (*) the USA national debt has skyrocketed by: ${numberWithWords(
      difference
    )}`;
  } else if (difference < 0) {
    differenceText = ` 🥱 Compared to yesterday (*) the USA national debt has decreased by: ${numberWithWords(
      Math.abs(difference)
    )}`;
  } else {
    differenceText = "Il debito è rimasto invariato rispetto a ieri.";
  }

  // let differenceText = "";
  // if (difference > 0) {
  //   differenceText = `rispetto a ieri il debito è aumentato di: $${difference}`;
  // } else if (difference < 0) {
  //   differenceText = `rispetto a ieri il debito è diminuito di: $${Math.abs(
  //     difference
  //   )}`;
  // } else {
  //   differenceText = "Il debito è rimasto invariato rispetto a ieri.";
  // }

  return (
    <>
      {/* <video playsInLine muted autoPlay loop src={Video} class="video"></video> */}
      {/* <Menu /> */}
      <div class="container">
        <div>
          {/* <p>Debt Held 2: {debtHeld2}</p> */}
          {/* <p>rispetto a ieri il debito è aumentato di : {difference}</p> */}
          <p className="differencetext">{differenceText}</p>
        </div>
        {/* <GiHamburgerMenu className="hamburger" /> */}
        {/* <p>
          Total USA Debt Outstanding amount as of
          {debt.data[0].record_date}: ${debtHeld}
        </p> */}
        <Operations debtHeld={debtHeld} />
        <PreviousFirst onDebtHeld={handleDebtHeld} />
        <Previous onDebtHeld2={handleDebtHeld2} />
        <Previous2 onDebtHeld3={handleDebtHeld3} />
        <Previous3 onDebtHeld4={handleDebtHeld4} />
        <div className="fred-graph">
          <iframe
            src="https://fred.stlouisfed.org/graph/graph-landing.php?g=11dhx&width=650&height=275"
            style={{
              width: "650px",
              height: "350px",
              border: "1px solid blue",
              margin: "auto",
            }}
          />
          {/* <a
          href="https://fred.stlouisfed.org/series/CPIAUCSL/?utm_source=fred-glance-widget&amp;utm_medium=widget&amp;utm_campaign=fred-glance-widget"
          target="_parent"
          title="Consumer Price Index for All Urban Consumers: All Items in U.S. City Average"
        >
          <strong>CPI</strong>
        </a> */}
        </div>
      </div>
    </>
  );
}

export default App;
