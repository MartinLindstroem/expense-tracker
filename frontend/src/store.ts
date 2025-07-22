import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { callApi } from "./utils/callApi";
import { convertExpenseMapToObject } from "./utils/convertMap";
import months from "./helpers/months";

interface User {
  email: string;
  username: string;
}

interface ApiResponse {
  data: [];
  status: number;
  user?: User;
}

export interface Expense {
  id: number;
  name: string;
  amount: number;
  category: string;
  date: string;
}

export interface Expenses {
  [year: string]: {
    [month: string]: {
      expenses: Expense[];
      totalsByCategory: { [key: string]: number };
      total: number;
    };
  };
}

interface Category {
  id: number;
  name: string;
  amount: number;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<ApiResponse | void>;
  logout: () => Promise<ApiResponse | void>;
}

interface ExpenseState {
  selectedYear: number;
  expenses: Expenses;
  categories: Category[];
  getExpenses: (year: string) => Promise<void>;
  getCategories: () => Promise<void>;
  setSelectedYear: (year: number) => void;
  // addExpense: (expense: Expense) => Promise<ApiResponse | void>;
  // updateExpense: (expense: Expense) => Promise<ApiResponse | void>;
  // deleteExpense: (id: number) => Promise<ApiResponse | void>;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isAuthenticated: false,
        login: async (email: string, password: string) => {
          try {
            const response = await callApi("auth/login", "POST", {
              email,
              password,
            });

            if (response.status === 200 && response.user) {
              set({ user: response.user, isAuthenticated: true });
            }

            return response;
          } catch (error) {
            console.error("Login error:", error);
          }
        },
        logout: async () => {
          try {
            const response = await callApi("auth/logout", "POST");

            if (response.status === 200) {
              set({ user: null, isAuthenticated: false });
            }

            return response;
          } catch (error) {
            console.error("Logout error:", error);
          }
        },
      }),
      { name: "authStore" }
    )
  )
);

export const useExpenseStore = create<ExpenseState>()(
  devtools(
    persist(
      (set, get) => ({
        selectedYear: new Date().getFullYear(),
        expenses: {},
        categories: [],
        getExpenses: async (year: string) => {
          try {
            const expensesResponse = await callApi(`expenses/${year}`, "GET");
            const yearObject: Expenses[string] = {};

            if (expensesResponse.status === 200) {
              const allExpenses: Expense[] = expensesResponse.data;

              for (const month of months) {
                const monthIndex = months.indexOf(month);
                const monthName = month.toLowerCase();

                const monthlyExpenses = allExpenses.filter(
                  (expense) => new Date(expense.date).getMonth() === monthIndex
                );

                let monthlyTotal = 0;
                const monthlyTotalsByCategory: { [key: string]: number } = {};

                for (const expense of monthlyExpenses) {
                  monthlyTotal += expense.amount;
                  monthlyTotalsByCategory[expense.category] =
                    (monthlyTotalsByCategory[expense.category] || 0) + expense.amount;
                }

                yearObject[monthName] = {
                  expenses: monthlyExpenses,
                  total: monthlyTotal,
                  totalsByCategory: monthlyTotalsByCategory,
                };
              }

              set((state) => ({
                expenses: {
                  ...state.expenses,
                  [year]: yearObject,
                },
              }));
            }
          } catch (error) {
            console.error("Fetch user data error:", error);
          }
        },
        getCategories: async () => {
          try {
            const response = await callApi("categories", "GET");
            if (response.status === 200) {
              const categories = response.data;
              set({ categories: categories });
            }
          } catch (error) {
            console.error("Fetch categories error:", error);
          }
        },
        setSelectedYear: async (year: number) => {
          set({ selectedYear: year });
          await get().getExpenses(year.toString());
          console.log("Selected year:", year);
        },
      }),
      { name: "expenseStore" }
    )
  )
);
