import { useLocation } from "react-router-dom";
import { useState } from "react";
// import { expenseCategories } from "../helpers/expenses";
import DatePicker from "react-datepicker";
import { useApi } from "../hooks/useApi";
import { useExpenseStore } from "../store";
import months from "../helpers/months";

import "react-datepicker/dist/react-datepicker.css";

const AddExpenseModal = () => {
  const location = useLocation();
  const { categories, getExpenses, selectedYear } = useExpenseStore();
  const { month } = location.state as { month: string };
  const monthIndex = months.indexOf(month);
  const [expenseName, setExpenseName] = useState<string>("");
  const [expenseAmount, setExpenseAmount] = useState<string>("");
  const [expenseCategory, setExpenseCategory] = useState<string>("");
  const [expenseDate, setExpenseDate] = useState<Date>(new Date(selectedYear, monthIndex, 1));
  const { data, isPending, error, callApi } = useApi();
  console.log("MONTH", month);
  console.log("MONTH INDEX", monthIndex);
  console.log("EXPENSE DATE", expenseDate);

  console.log();

  const addExpense = async () => {
    const payload = {
      name: expenseName,
      amount: expenseAmount,
      category: expenseCategory,
      date: expenseDate.toLocaleDateString("sv-SE"),
    };
    console.log(data);

    await callApi("expenses/create", "POST", payload);
    if (error) {
      console.error(error);
    } else {
      console.log("Expense added successfully:", payload);
    }
    getExpenses(selectedYear.toString());
  };
  return (
    <div>
      <button className="btn" onClick={() => document.getElementById("expense_modal")?.showModal()}>
        Add expense
      </button>
      <dialog id="expense_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add expense</h3>
          <input
            className="input input-bordered w-full bg-inherit mt-8"
            id="expenseName"
            type="text"
            name="expenseName"
            placeholder="Expense name"
            onChange={(e) => setExpenseName(e.target.value)}
            required
          />
          <input
            className="input input-bordered w-full bg-inherit mt-8"
            id="expenseAmount"
            type="number"
            name="expenseAmount"
            placeholder="Amount"
            onChange={(e) => setExpenseAmount(e.target.value)}
            required
          />
          <select
            defaultValue="Category"
            className="select select-bordered w-full bg-inherit mt-8"
            id="expenseCategory"
            name="expenseCategory"
            onChange={(e) => setExpenseCategory(e.target.value)}
            required
          >
            <option disabled={true}>Select category</option>
            {categories.map((category, index) => (
              <option key={index} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <label className="block text-sm font-medium text-gray-700 mt-8">Select a date</label>
          <DatePicker
            className="input input-bordered w-full bg-inherit mt-2"
            selected={expenseDate}
            onChange={(date: Date) => setExpenseDate(date)}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select a date"
          />
          <div className="modal-action justify-start">
            <form method="dialog" className="flex justify-between w-full">
              <button className="btn" onClick={addExpense}>
                Save
              </button>
              <button className="btn">Cancel</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AddExpenseModal;
