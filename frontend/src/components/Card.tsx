import { Link } from "react-router-dom";
import { useExpenseStore } from "../store";

interface CardProps {
  month: string;
}

const Card: React.FC<CardProps> = ({ month }) => {
  const { selectedYear, expenses } = useExpenseStore();
  if (!expenses[selectedYear]) {
    return null;
  }
  const totalsByCategory = expenses[selectedYear][month]?.totalsByCategory || {};
  const total = expenses[selectedYear][month]?.total;

  const totalsByCategorySorted = Object.entries(totalsByCategory)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  return (
    <Link
      to={`/expenses/${selectedYear}/${month?.toLowerCase()}`}
      state={{
        month: month,
      }}
    >
      <div className="card bg-primary text-primary-content w-64 h-64">
        <div className="card-body flex flex-col items-center gap-2">
          <h2 className="text-2xl font-semibold">{month}</h2>
          <h2 className="text-md">Amount spent: {total}</h2>
          <div>
            {Object.entries(totalsByCategorySorted).length > 0 && <h3>Top Categories</h3>}
            <ul>
              {Object.entries(totalsByCategorySorted).map(([category, total]) => (
                <li key={category}>
                  {total[0]}: {total[1]}
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
