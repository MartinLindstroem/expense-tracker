import { useAuthStore } from "../store";
import { useNavigate, Link } from "react-router-dom";

const Header = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    useAuthStore.getState().logout();
    navigate("/");
  };

  return (
    <header className="fixed mb-1 top-0 left-0 w-full text-inherit p-4 flex h-20 justify-between border-b-2 border-gray-300 bg-inherit z-999">
      <h1 className="text-3xl font-bold">Expense Insights</h1>
      {isAuthenticated ? (
        <div className="flex items-center">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} className="avatar placeholder cursor-pointer">
              <div className="bg-neutral text-neutral-content w-16 rounded-full">
                <span className="text-3xl">{user?.username.charAt(0).toUpperCase()}</span>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>{user?.username}</li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    handleLogout();
                  }}
                >
                  Sign out
                </button>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <Link to="/login" className="btn">
          Sign in
        </Link>
      )}
    </header>
  );
};

export default Header;
