import { Expenses, Expense } from "../store";

export const convertExpenseMapToObject = (
  expensesMap: Map<string, Map<string, Expense[]>>
): Expenses => {
  const result: Expenses = {};

  for (const [year, monthMap] of expensesMap.entries()) {
    const monthObj: { [month: string]: { expenses: Expense[] } } = {};

    for (const [month, expenses] of monthMap.entries()) {
      monthObj[month] = { expenses };
    }

    result[year] = monthObj;
  }

  return result;
};
