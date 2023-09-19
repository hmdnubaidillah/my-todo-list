import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function Home() {
  /* eslint-disable */
  const [cookies, setCookies, removeCookies] = useCookies(["jwt"]);
  const navigate = useNavigate();

  function handleLogout() {
    const logout = confirm("You sure want to logout?");

    if (logout) {
      removeCookies("jwt");
      localStorage.removeItem("user");
      navigate("/login");
    }
    return;
  }

  return (
    <main>
      <nav className="fixed w-full">
        <div className="w-[90%] m-auto flex justify-between items-center py-4">
          <h1 className="font-semibold text-2xl">MyTodo</h1>
          <div className="flex gap-5">
            <NavLink to="/" className="font-semibold cursor-pointer hover:underline">
              Home
            </NavLink>
            {cookies.jwt ? (
              <button
                className="font-semibold cursor-pointer hover:underline"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="font-semibold cursor-pointer hover:underline"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className="font-semibold cursor-pointer hover:underline"
                >
                  Signup
                </NavLink>
              </>
            )}
          </div>
        </div>
      </nav>

      <div>
        <Outlet />
      </div>
    </main>
  );
}
