import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import Home from "./pages/Home";
import Expenses from "./pages/Expenses";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NoPage from "./pages/NoPage";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import ExpenseMonth from "./pages/ExpenseMonth";
import { useAuthStore, useExpenseStore } from "./store";

function App() {
  const { getExpenses, getCategories, selectedYear, setSelectedYear } = useExpenseStore();

  useEffect(() => {
    setSelectedYear(new Date().getFullYear());
    getExpenses(selectedYear.toString());
    getCategories();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="expenses/:year" element={<Expenses />} />
          <Route path="expenses/:year/:month" element={<ExpenseMonth />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
