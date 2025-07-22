import CardContainer from "../components/CardContainer";
import { useExpenseStore } from "../store";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { Outlet, Link } from "react-router-dom";

const Expenses = () => {
  const { selectedYear, setSelectedYear } = useExpenseStore();

  return (
    <div className="w-full flex-col justify-center items-center">
      <div className="flex items-center justify-center gap-4">
        <Link to={`/expenses/${selectedYear - 1}`}>
          <button className="btn" onClick={() => setSelectedYear(selectedYear - 1)}>
            <CaretLeft size={32} />
          </button>
        </Link>
        <h1 className="text-5xl font-bold">{selectedYear}</h1>
        <Link to={`/expenses/${selectedYear + 1}`}>
          <button className="btn" onClick={() => setSelectedYear(selectedYear + 1)}>
            <CaretRight size={32} />
          </button>
        </Link>
      </div>

      <div className="w-full flex justify-center">
        <CardContainer />
      </div>
    </div>
  );
};

export default Expenses;
