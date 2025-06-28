import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header />
      <div className="flex flex-1">
        <aside className="w-64 h-full fixed bg-gray-300 p-4 top-[80px] hidden md:block">
          <nav className="mt-40">
            <ul className="space-y-5">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <a href="#">Categories</a>
              </li>
            </ul>
          </nav>
        </aside>
        <main className="flex-1 p-4 mt-[64px] md:ml-64">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
