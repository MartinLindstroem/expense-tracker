import { Link } from "react-router-dom";
import { useExpenseStore } from "../store";
import months from "../helpers/months";

interface CardProps {
  month: string;
}

const Card: React.FC<CardProps> = ({ month }) => {
  const { selectedYear, categories, expenses } = useExpenseStore();
  if (!expenses[selectedYear]) {
    return null;
  }
  const monthlyExpenses = expenses[selectedYear][month]?.expenses || [];
  const totalsByCategory = expenses[selectedYear][month]?.totalsByCategory || {};
  const total = expenses[selectedYear][month]?.total;

  return (
    <Link
      to={`/expenses/${selectedYear}/${month?.toLowerCase()}`}
      state={{
        month: month,
        monthlyExpenses: monthlyExpenses,
        totalsByCategory: totalsByCategory,
      }}
    >
      <div className="card bg-primary text-primary-content w-64 h-64">
        <div className="card-body flex items-center">
          <h2 className="card-title">{month}</h2>
          <p>Amount spent: {total}</p>
          <div>
            <h3>Top Categories</h3>
            <ul>
              {Object.entries(totalsByCategory).map(([category, total]) => (
                <li key={category}>
                  {category}: {total}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
