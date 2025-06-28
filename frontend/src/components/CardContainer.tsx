import Card from "./Card";
import months from "../helpers/months";
import { useExpenseStore } from "../store";

const CardContainer = () => {
  const { expenses, categories } = useExpenseStore();
  // let categoryTotals: { [key: string]: number } = {};
  // for (const expense of expenses) {
  //   console.log(expense.id);

  //   if (categoryTotals[expense.category]) {
  //     categoryTotals[expense.category] += expense.amount;
  //   } else {
  //     categoryTotals[expense.category] = expense.amount;
  //   }
  // }
  // console.log("categoryTotals", categoryTotals);

  // console.log("EXPENSES", expenses);
  // console.log("CATEGORIES", categories);

  return (
    <div className="flex flex-wrap w-2/3 gap-4 mt-20 justify-center">
      {months.map((month, index) => (
        <div key={index} className="w-1/7 flex justify-center">
          {/* <Card month={month.name} amount={600} topCategories={expenses} /> */}
        </div>
      ))}
    </div>
  );
};

export default CardContainer;
