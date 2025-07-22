import { useLocation } from "react-router-dom";
import CategoryContainer from "../components/CategoryContainer";
import AddExpenseModal from "../components/AddExpenseModal";
import "react-datepicker/dist/react-datepicker.css";
const ExpenseMonth = () => {
  const location = useLocation();
  const { month, monthlyExpenses, totalsByCategory } = location.state as {
    month: string;
    monthlyExpenses: any[];
    totalsByCategory: { [key: string]: number };
  };

  return (
    <div className="flex-col w-full h-full">
      <h1 className="text-3xl font-bold mb-12">{month}</h1>
      <div className="flex justify-center items-center">
        <div className="flex flex-col gap-12 w-2/12 items-center">
          <AddExpenseModal />
          <CategoryContainer month={month} />
        </div>
        <div className="w-10/12"></div>
      </div>
    </div>
  );
};

export default ExpenseMonth;
