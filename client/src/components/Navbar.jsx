import { useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const {user,logout} = useAuth();
    const loc = useLocation()
    return (
      <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
        <h1 className="text-xl font-bold">💰 MyBank</h1>
        <ul className="flex gap-4">
          <li><a href="/dashboard" className="hover:underline">Dashboard</a></li>
         {user && loc.pathname!="/login" && loc.pathname!="/register" ? (<li><a href="/logout" className="hover:underline" onClick={logout}>Logout</a></li>
         ):(<li><a href="/login" className="hover:underline">Login</a></li>
)}
        </ul>
      </nav>
    );
  };
  
  export default Navbar;
  