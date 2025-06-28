import { pool } from "../config/db";
import logger from "../logger/logger";
import { HttpException } from "../utils/customError";

export const getAllUserExpenses = async (userId: number) => {
  const expenses = await pool.query(
    ` SELECT e.expense_id as id, e.expense_name as name, e.expense_amount as amount, c.category_name as category, e.expense_date as date
FROM expenses e
JOIN categories c ON e.expense_category = c.category_id
WHERE e.user_id = $1
`,
    [userId]
  );

  return expenses;
};

export const getExpensesFromYear = async (userId: string, year: string) => {
  if (isNaN(parseInt(year))) {
    throw new HttpException(400, "Invalid data");
  }
  const jan = new Date(parseInt(year), 0, 1);
  const dec = new Date(parseInt(year), 11, 31);

  const expenses = await pool.query(
    `SELECT e.expense_id as id, e.expense_name as name, e.expense_amount as amount, c.category_name as category, e.expense_date as date
      FROM expenses e
      JOIN categories c ON e.expense_category = c.category_id
      WHERE e.user_id = $1
      AND e.expense_date BETWEEN $2 AND $3;`,
    [userId, jan, dec]
  );

  return expenses;
};

export const createExpense = async (
  userId: string,
  expenseName: string,
  expenseAmount: string,
  dateString: string,
  expenseCategory: string
) => {
  try {
    const date = new Date(dateString);
    if (
      isNaN(parseInt(expenseAmount)) ||
      isNaN(parseInt(expenseCategory)) ||
      isNaN(date.getTime())
    ) {
      throw new HttpException(400, "Invalid data given");
    }

    await pool.query(
      `INSERT INTO expenses (user_id, expense_name, expense_amount, expense_date, expense_category) VALUES ($1, $2, $3, $4, $5)`,
      [userId, expenseName, expenseAmount, dateString, expenseCategory]
    );
  } catch (error: any) {
    logger.error("Error creating expense", { service: "expense-service", error: error.detail });
    // throw error;
    throw new HttpException(500, "Error creating expense");
  }
};

export const updateExpense = async (
  expenseId: string,
  expenseName: string,
  expenseAmount: string,
  dateString: string,
  expenseCategory: string
) => {
  const date = new Date(dateString);
  if (
    isNaN(parseInt(expenseId)) ||
    isNaN(parseInt(expenseAmount)) ||
    isNaN(parseInt(expenseCategory)) ||
    isNaN(date.getTime())
  ) {
    throw new HttpException(400, "Invalid data given");
  }

  await pool.query(
    `UPDATE expenses SET expense_name=$1, expense_amount=$2, expense_date=$3, expense_category=$4 WHERE expense_id = $5`,
    [expenseName, expenseAmount, dateString, expenseCategory, expenseId]
  );
};

export const deleteExpense = async (expenseId: string) => {
  if (isNaN(parseInt(expenseId))) {
    throw new HttpException(400, "Invalid data given");
  }

  await pool.query(`DELETE FROM expenses WHERE expense_id = $1`, [expenseId]);
};
