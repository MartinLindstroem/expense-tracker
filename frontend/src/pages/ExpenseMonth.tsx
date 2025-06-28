import { useLocation } from "react-router-dom";
import { useState } from "react";
import { expenseCategories } from "../helpers/expenses";
import DatePicker from "react-datepicker";
import { useApi } from "../hooks/useApi";

import "react-datepicker/dist/react-datepicker.css";
const ExpenseMonth = () => {
  const [expenseName, setExpenseName] = useState<string>("");
  const [expenseAmount, setExpenseAmount] = useState<string>("");
  const [expenseCategory, setExpenseCategory] = useState<string>("");
  const [expenseDate, setExpenseDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const location = useLocation();
  const { month } = location.state as { month: string };
  const { data, isPending, error, callApi } = useApi();

  const addExpense = async () => {
    const payload = {
      name: expenseName,
      amount: expenseAmount,
      category: expenseCategory,
      date: expenseDate,
    };
    console.log(data);

    await callApi("expenses/create", "POST", payload);
    if (error) {
      console.error(error);
    } else {
      console.log("Expense added successfully:", payload);
    }
  };
  return (
    <div>
      <div>ExpenseMonth</div>
      <div>{month}</div>
      <button className="btn" onClick={() => document.getElementById("expense_modal")?.showModal()}>
        open modal
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
            {expenseCategories.map((category, index) => (
              <option key={index} value={index}>
                {category}
              </option>
            ))}
          </select>
          <label className="block text-sm font-medium text-gray-700 mt-8">Select a date</label>
          <DatePicker
            className="input input-bordered w-full bg-inherit mt-2"
            selected={expenseDate}
            onChange={(date) => setExpenseDate(date.toISOString().split("T")[0])}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select a date"
          />
          <div className="modal-action justify-start">
            <form method="dialog" className="flex justify-between w-full">
              {/* if there is a button in form, it will close the modal */}
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

export default ExpenseMonth;
