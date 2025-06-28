interface Expense {
  category: string;
  amount: number;
}

export const expenses: Expense[] = [
  {
    category: "Takeout",
    amount: 500,
  },
  {
    category: "Games",
    amount: 879,
  },
  {
    category: "Car",
    amount: 1000,
  },
  {
    category: "Clothes",
    amount: 699,
  },
  {
    category: "Groceries",
    amount: 3000,
  },
];

export const expenseCategories = ["Takeout", "Games", "Car", "Clothes", "Groceries"];

// expenses.sort((a, b) => b.amount - a.amount);
