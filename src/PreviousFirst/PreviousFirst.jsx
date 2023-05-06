import { useState, useEffect } from "react";

const PreviousFirst = ({ onDebtHeld }) => {
  const [debt, setDebt] = useState(null);

  useEffect(() => {
    const today = new Date();
    today.setDate(today.getDate() - 2);
    const year = today.getFullYear();
    const month =
      today.getMonth() + 1 < 10
        ? `0${today.getMonth() + 1}`
        : today.getMonth() + 1;
    const day = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
    const date = `${year}-${month}-${day}`;
    const url = `https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v2/accounting/od/debt_to_penny?filter=record_date:eq:${date}`;
    const fetchData = async () => {
      try {
        // const response = await fetch(
        //   "https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v2/accounting/od/debt_to_penny?filter=record_date:eq:2023-05-01"
        // );
        const response = await fetch(url);
        const result = await response.json();
        setDebt(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // if (debt) {
    if (debt && debt.data && debt.data.length > 0) {
      const debtHeld = debt.data[0].tot_pub_debt_out_amt;
      onDebtHeld(debtHeld);
    }
  }, [debt, onDebtHeld]);

  if (!debt) {
    return <p>Loading data...</p>;
  }
  if (debt.data.length === 0) {
    const today = new Date();
    today.setDate(today.getDate() - 2);
    const year = today.getFullYear();
    const month =
      today.getMonth() + 1 < 10
        ? `0${today.getMonth() + 1}`
        : today.getMonth() + 1;
    const day = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
    const date = `${year}-${month}-${day}`;
    return <p> No data was released on {date} </p>;
  }

  const debtHeld = debt.data[0].tot_pub_debt_out_amt;
  // onDebtHeld2(debtHeld2);

  return (
    <div>
      <p className="debt">
        Total USA Debt Outstanding amount as of
        {debt.data[0].record_date} : ${debtHeld}
      </p>

      {/* <span className={styles.hamburger}></span> */}
    </div>
  );
};

export default PreviousFirst;
