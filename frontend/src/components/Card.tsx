import { Link } from "react-router-dom";

interface CardProps {
  month: string;
  amount: number;
  topCategories: { category: string; amount: number }[];
}

const Card: React.FC<CardProps> = ({ month, amount, topCategories }) => {
  return (
    <Link to={`/expenses/${month.toLowerCase()}`} state={{ month: month }}>
      <div className="card bg-primary text-primary-content w-64">
        <div className="card-body flex items-center">
          <h2 className="card-title">{month}</h2>
          <p>Amount spent: {amount}</p>
          <div>
            <h3>Top Categories</h3>
            <ul>
              {topCategories.map((cat, index) => (
                <li key={index}>
                  {cat.category}: {cat.amount}
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
