import { useState, useEffect } from "react";
const Previous = ({ onDebtHeld5 }) => {
  const [debt, setDebt] = useState(null);

  useEffect(() => {
    const today = new Date();
    today.setDate(today.getDate() - 6);
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
    if (debt) {
      const debtHeld5 = debt.data[0].tot_pub_debt_out_amt;
      onDebtHeld5(debtHeld5);
    }
  }, [debt, onDebtHeld5]);

  if (!debt) {
    return <p>Loading data...</p>;
  }
  if (debt.data.length === 0) {
    const today = new Date();
    today.setDate(today.getDate() - 6);
    const year = today.getFullYear();
    const month =
      today.getMonth() + 1 < 10
        ? `0${today.getMonth() + 1}`
        : today.getMonth() + 1;
    const day = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
    const date = `${year}-${month}-${day}`;
    return <p className="debt"> No data was released on{date} </p>;
  }

  const debtHeld5 = debt.data[0].tot_pub_debt_out_amt;
  return (
    <div>
      <p className="debt">
        Total USA Debt Outstanding amount as of {debt.data[0].record_date}: $
        {debtHeld5}
      </p>
    </div>
  );
};

export default Previous;
