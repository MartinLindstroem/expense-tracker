import React, { useState } from "react";
import { Expense } from "../store";
import { useApi } from "../hooks/useApi";
import { Trash, Pen } from "@phosphor-icons/react";
import { useExpenseStore } from "../store";
import { useRef } from "react";
import ExpenseModal from "./ExpenseModal";

interface ShowExpensesModalProps {
  category: string;
  amount: number;
  expenses: Expense[];
}

const ShowExpensesModal: React.FC<ShowExpensesModalProps> = ({ category, amount, expenses }) => {
  const dialogId = `category_expenses_modal_${category}`;
  const { callApi, isPending, error } = useApi();
  const { selectedYear, getExpenses } = useExpenseStore();
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const deleteExpense = async (id: number) => {
    setDeletingId(id);

    const payload = { id };

    await callApi("expenses/delete", "DELETE", payload);

    if (error) {
      console.error("Delete error:", error);
    } else {
      await getExpenses(selectedYear.toString());
    }

    setDeletingId(null);
  };

  const editExpense = (expense: Expense) => {
    console.log("Edit expense:", expense);
  };

  return (
    <div>
      <button
        className="btn w-full justify-between bg-transparent border-0 shadow-none hover:bg-transparent hover:shadow text-primary"
        onClick={() => (document.getElementById(dialogId) as HTMLDialogElement | null)?.showModal()}
      >
        <span>{category}</span>
        <span className="font-semibold">{amount}</span>
      </button>

      <dialog id={dialogId} className="modal">
        <div className="modal-box relative w-[80vw] h-[80vh] max-w-none overflow-y-auto rounded-2xl">
          <form method="dialog">
            <button
              type="submit"
              aria-label="Close"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form>

          <h3 className="font-bold text-lg mb-4">{category} Expenses</h3>

          <table className="table table-sm w-full">
            <thead>
              <tr>
                <th className="text-left">Name</th>
                <th className="text-left">Notes</th>
                <th className="text-left">Amount</th>
                <th className="text-left">Date</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.length > 0 ? (
                expenses.map((expense) => (
                  <tr key={expense.id}>
                    <td>{expense.name}</td>
                    <td>{expense.notes}</td>
                    <td className="text-left">{expense.amount}</td>
                    <td>{expense.date.split("T")[0]}</td>
                    <td className="text-center">
                      <>
                        <button
                          onClick={() => modalRef.current?.showModal()}
                          className="btn btn-sm btn-ghost"
                        >
                          <Pen size={20} />
                        </button>
                        <ExpenseModal ref={modalRef} month="July" action="edit" expense={expense} />
                      </>
                      <button
                        onClick={() => deleteExpense(expense.id)}
                        className="btn btn-sm btn-ghost"
                        disabled={isPending && deletingId === expense.id}
                      >
                        {isPending && deletingId === expense.id ? (
                          <span className="loading loading-spinner loading-sm text-error" />
                        ) : (
                          <Trash size={20} className="text-error" />
                        )}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center opacity-70 py-4">
                    No expenses found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button aria-label="Close modal">close</button>
        </form>
      </dialog>
    </div>
  );
};

export default ShowExpensesModal;
