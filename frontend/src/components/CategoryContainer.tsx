import React from "react";
import { useExpenseStore } from "../store";
import ShowExpensesModal from "./ShowExpensesModal";
import { useRef } from "react";

interface CategoryProps {
  month: string;
}

const CategoryContainer: React.FC<CategoryProps> = ({ month }) => {
  const { categories, expenses, selectedYear } = useExpenseStore();
  const monthExpenses = expenses[selectedYear]?.[month]?.expenses || [];
  const monthlyTotal = expenses[selectedYear]?.[month]?.total;
  console.log(expenses[selectedYear]?.[month]?.expenses);

  const modalRef = useRef<HTMLDialogElement | null>(null);

  const openModal = () => {
    modalRef.current?.showModal();
  };

  return (
    <div className="p-6 rounded-2xl shadow-lg  w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Expenses by Category</h2>
      <div className="overflow-y-auto max-h-full">
        <ul className="bg-gray-50">
          {categories.map((category) => {
            const categoryExpenses = monthExpenses.filter(
              (expense) => expense.category === category.name
            );
            const total = categoryExpenses.reduce((sum, e) => sum + Number(e.amount), 0);

            return (
              <li key={category.id} className="rounded-xl bg-gray-50 p-4">
                <ShowExpensesModal
                  category={category.name}
                  amount={total}
                  expenses={categoryExpenses}
                />
              </li>
            );
          })}
        </ul>
      </div>
      <h2 className="text-2xl font-bold mt-6 text-primary">Total: {monthlyTotal}</h2>
    </div>
  );
};

export default CategoryContainer;
