// // import { useLocation } from "react-router-dom";
// import { useState } from "react";
// // import { expenseCategories } from "../helpers/expenses";
// import DatePicker from "react-datepicker";
// import { useApi } from "../hooks/useApi";
// import { useExpenseStore, Expense } from "../store";
// import months from "../helpers/months";
// import "react-datepicker/dist/react-datepicker.css";
// import { forwardRef } from "react";

// interface ExpenseProps {
//   month: string;
//   expense?: Expense;
//   action: "add" | "edit";
// }

// const ExpenseModal = forwardRef<HTMLDialogElement, ExpenseProps>(
//   ({ month, action, expense }, ref) => {
//     const { categories, getExpenses, selectedYear } = useExpenseStore();
//     const monthIndex = months.indexOf(month);
//     const [expenseName, setExpenseName] = useState<string>("");
//     const [expenseAmount, setExpenseAmount] = useState<string>("");
//     const [expenseNotes, setExpenseNotes] = useState<string>("");
//     const [expenseCategory, setExpenseCategory] = useState<string>("");
//     const [expenseDate, setExpenseDate] = useState<Date>(new Date(selectedYear, monthIndex, 1));
//     const { data, isPending, error, callApi } = useApi();

//     const handleExpense = async () => {
//       if (isNaN(parseInt(expenseAmount)) || isNaN(parseInt(expenseCategory))) {
//         return;
//       }
//       if (action === "edit") {
//         const payload = {
//           id: expense?.id,
//           name: expenseName,
//           amount: expenseAmount,
//           notes: expenseNotes,
//           category: expenseCategory,
//           date: expenseDate.toLocaleDateString("sv-SE"),
//         };
//         await callApi(`expenses/update/${expense?.id}`, "PUT", payload);
//         if (error) {
//           console.error(error);
//         } else {
//           console.log("Expense updated successfully:", payload);
//         }
//       } else if (action === "add") {
//         const payload = {
//           name: expenseName,
//           amount: expenseAmount,
//           notes: expenseNotes,
//           category: expenseCategory,
//           date: expenseDate.toLocaleDateString("sv-SE"),
//         };

//         await callApi("expenses/create", "POST", payload);
//         if (error) {
//           console.error(error);
//         } else {
//           console.log("Expense added successfully:", payload);
//         }
//       }
//       setExpenseName("");
//       setExpenseAmount("");
//       setExpenseNotes("");
//       setExpenseCategory("");
//       getExpenses(selectedYear.toString());
//       return;
//     };
//     return (
//       <div>
//         {/* <button className="btn" onClick={() => document.getElementById("expense_modal")?.showModal()}>
//         {action === "add" ? "Add expense" : "Edit expense"}
//       </button> */}
//         <dialog ref={ref} id="expense_modal" className="modal">
//           <div className="modal-box">
//             <h3 className="font-bold text-lg">
//               {action === "add" ? "Add expense" : "Edit expense"}
//             </h3>
//             <input
//               className="input input-bordered w-full bg-inherit mt-8"
//               id="expenseName"
//               type="text"
//               name="expenseName"
//               value={action === "edit" ? expense?.name : expenseName}
//               placeholder="Expense name"
//               onChange={(e) => setExpenseName(e.target.value)}
//               required
//             />
//             <input
//               className="input input-bordered w-full bg-inherit mt-8"
//               id="expenseAmount"
//               type="number"
//               name="expenseAmount"
//               value={action === "edit" ? expense?.amount : expenseAmount}
//               placeholder="Amount"
//               onChange={(e) => setExpenseAmount(e.target.value)}
//               required
//             />
//             <select
//               defaultValue="Category"
//               className="select select-bordered w-full bg-inherit mt-8"
//               id="expenseCategory"
//               name="expenseCategory"
//               value={action === "edit" ? expense?.category : expenseCategory}
//               onChange={(e) => setExpenseCategory(e.target.value)}
//               required
//             >
//               <option disabled={true}>Select category</option>
//               {categories.map((category, index) => (
//                 <option key={index} value={category.id}>
//                   {category.name}
//                 </option>
//               ))}
//             </select>
//             <textarea
//               className="textarea textarea-bordered w-full bg-inherit mt-8"
//               maxLength={150}
//               id="expenseNotes"
//               name="expenseNotes"
//               value={action === "edit" ? expense?.notes : expenseNotes}
//               placeholder="Notes"
//               onChange={(e) => setExpenseNotes(e.target.value)}
//             ></textarea>
//             <label className="block text-sm font-medium text-gray-700 mt-8">Select a date</label>
//             <DatePicker
//               className="input input-bordered w-full bg-inherit mt-2"
//               selected={expenseDate}
//               onChange={(date: Date) => setExpenseDate(date)}
//               dateFormat="yyyy-MM-dd"
//               placeholderText="Select a date"
//             />
//             <div className="modal-action justify-start">
//               <form method="dialog" className="flex justify-between w-full">
//                 <button className="btn" onClick={handleExpense}>
//                   Save
//                 </button>
//                 <button className="btn">Cancel</button>
//               </form>
//             </div>
//           </div>
//         </dialog>
//       </div>
//     );
//   }
// );

// export default ExpenseModal;

import { useState, forwardRef } from "react";
import DatePicker from "react-datepicker";
import { useApi } from "../hooks/useApi";
import { useExpenseStore, Expense } from "../store";
import months from "../helpers/months";
import "react-datepicker/dist/react-datepicker.css";

interface ExpenseProps {
  month: string;
  expense?: Expense;
  action: "add" | "edit";
}

const ExpenseModal = forwardRef<HTMLDialogElement, ExpenseProps>(
  ({ month, action, expense }, ref) => {
    const { categories, getExpenses, selectedYear } = useExpenseStore();
    const monthIndex = months.indexOf(month);

    const [expenseName, setExpenseName] = useState<string>(expense?.name || "");
    const [expenseAmount, setExpenseAmount] = useState<string>(expense?.amount.toString() || "");
    const [expenseNotes, setExpenseNotes] = useState<string>(expense?.notes || "");
    const [expenseCategory, setExpenseCategory] = useState<string>(expense?.category || "");
    const [expenseDate, setExpenseDate] = useState<Date>(new Date(selectedYear, monthIndex, 1));

    const { error, callApi } = useApi();
    console.log("Expense:", expense);

    const handleExpense = async () => {
      // if (isNaN(parseInt(expenseAmount)) || isNaN(parseInt(expenseCategory))) {
      //   return;
      // }

      const payload = {
        name: expenseName,
        amount: expenseAmount,
        notes: expenseNotes,
        category: expenseCategory,
        date: expenseDate.toLocaleDateString("sv-SE"),
      };

      if (action === "edit" && expense?.id) {
        await callApi("expenses/update/", "PUT", { ...payload, id: expense.id });
        if (error) {
          console.error(error);
        } else {
          console.log("Expense updated successfully:", payload);
        }
      } else {
        await callApi("expenses/create", "POST", payload);
        if (error) {
          console.error(error);
        } else {
          console.log("Expense added successfully:", payload);
        }
      }

      setExpenseName("");
      setExpenseAmount("");
      setExpenseNotes("");
      setExpenseCategory("");

      getExpenses(selectedYear.toString());
    };

    return (
      <dialog ref={ref} id="expense_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{action === "add" ? "Add expense" : "Edit expense"}</h3>
          <input
            className="input input-bordered w-full bg-inherit mt-8"
            id="expenseName"
            type="text"
            name="expenseName"
            value={expenseName}
            placeholder="Expense name"
            onChange={(e) => setExpenseName(e.target.value)}
            required
          />
          <input
            className="input input-bordered w-full bg-inherit mt-8"
            id="expenseAmount"
            type="number"
            name="expenseAmount"
            value={expenseAmount}
            placeholder="Amount"
            onChange={(e) => setExpenseAmount(e.target.value)}
            required
          />
          <select
            className="select select-bordered w-full bg-inherit mt-8"
            id="expenseCategory"
            name="expenseCategory"
            value={expenseCategory}
            onChange={(e) => setExpenseCategory(e.target.value)}
            required
          >
            <option disabled>Select category</option>
            {categories.map((category, index) => (
              <option key={index} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <textarea
            className="textarea textarea-bordered w-full bg-inherit mt-8"
            maxLength={150}
            id="expenseNotes"
            name="expenseNotes"
            value={expenseNotes}
            placeholder="Notes"
            onChange={(e) => setExpenseNotes(e.target.value)}
          ></textarea>
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
              <button className="btn" onClick={handleExpense}>
                Save
              </button>
              <button className="btn">Cancel</button>
            </form>
          </div>
        </div>
      </dialog>
    );
  }
);

// Optional: name for debugging
ExpenseModal.displayName = "ExpenseModal";

export default ExpenseModal;
