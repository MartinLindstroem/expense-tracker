import { useLocation } from "react-router-dom";
import CategoryContainer from "../components/CategoryContainer";
import ExpenseModal from "../components/ExpenseModal";
import DonutChart from "../components/DonutChart";
import { useExpenseStore } from "../store";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { Outlet, Link, Navigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import months from "../helpers/months";
import { useRef } from "react";
const ExpenseMonth = () => {
  const { selectedYear, setSelectedYear, categories, expenses } = useExpenseStore();
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const location = useLocation();
  let selectedMonth: string;
  if (location.state?.month) {
    selectedMonth = location.state.month;
  } else {
    selectedMonth = location.pathname.split("/")[3];
    if (months.indexOf(selectedMonth) === -1) {
      return <Navigate to="/nopage" />;
    }
  }

  const openModal = () => {
    modalRef.current?.showModal();
  };

  const handleButtonClick = (month: string) => {
    setSelectedYear(selectedYear);
  };

  let nextMonth: string =
    months.indexOf(selectedMonth) === 11 ? months[0] : months[months.indexOf(selectedMonth) + 1];
  let previousMonth: string =
    months.indexOf(selectedMonth) === 0 ? months[11] : months[months.indexOf(selectedMonth) - 1];

  const totalsByCategory = expenses[selectedYear][selectedMonth]?.totalsByCategory || {};
  const monthlyTotal = expenses[selectedYear][selectedMonth]?.total;
  console.log(window.location.pathname);
  console.log(months.indexOf("december"));

  return (
    <div className="flex-col w-full h-full">
      <div className="flex items-center justify-center gap-4">
        <Link to={`/expenses/${selectedYear}/${previousMonth}`} state={{ month: previousMonth }}>
          <button
            className="btn bg-transparent border-0 shadow-none hover:bg-transparent hover:text-primary"
            onClick={() => handleButtonClick(selectedMonth)}
          >
            <CaretLeft size={32} />
          </button>
        </Link>
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold mb-12">
            {selectedYear}
            <br />
            {selectedMonth}
          </h1>
        </div>
        <Link to={`/expenses/${selectedYear}/${nextMonth}`} state={{ month: nextMonth }}>
          <button className="btn bg-transparent border-0 shadow-none hover:bg-transparent hover:text-primary">
            <CaretRight size={32} />
          </button>
        </Link>
      </div>
      <div className="flex justify-center items-center">
        <div className="flex flex-col gap-12 w-2/12 items-center">
          {/* <ExpenseModal month={selectedMonth} action="add" /> */}
          <button
            className="btn"
            onClick={() => document.getElementById("expense_modal")?.showModal()}
          >
            Add expense
          </button>
          <ExpenseModal ref={modalRef} month={selectedMonth} action="add" />
          <CategoryContainer month={selectedMonth} />
        </div>
        <div className="w-10/12">
          <DonutChart
            data={Object.entries(totalsByCategory).map(([category, categoryTotal]) => ({
              label: `${category}: ${((categoryTotal / monthlyTotal) * 100).toFixed(2)}%`,
              value: categoryTotal,
            }))}
          />
        </div>
      </div>
    </div>
  );
};

export default ExpenseMonth;
