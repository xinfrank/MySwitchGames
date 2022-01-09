import { useContext } from "react";
import { useLogin } from "../hooks/useLogin";
import { useLogout } from "../hooks/useLogout";
import { AuthContext } from "../context/AuthContext";
import { FaGoogle } from "react-icons/fa";

export const Navbar = () => {
  const { userAuth } = useContext(AuthContext);
  const { login } = useLogin();
  const { logout } = useLogout();

  return (
    <nav className="w-full h-20 bg-background-900 flex justify-between items-center">
      <h1 className="text-neutral-50 font-bold text-3xl">MySwitchGames</h1>
      {!userAuth.state && (
        <>
          <button
            onClick={login}
            className="bg-buttonbg-900 text-neutral-50 px-8 h-12 font-medium rounded-md flex justify-center items-center"
          >
            <FaGoogle size={14} className="inline-block mr-3" />
            Sign In
          </button>
        </>
      )}
      {userAuth.state && (
        <>
          <button
            onClick={logout}
            className="bg-buttonbg-900 text-neutral-50 px-8 h-12 font-medium rounded-md flex justify-center items-center"
          >
            Sign Out
          </button>
        </>
      )}
    </nav>
  );
};
