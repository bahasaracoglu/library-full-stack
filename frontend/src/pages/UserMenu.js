import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

function UserMenu() {
  //const { setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSignOut = () => {
    navigate("/login");
  };

  return (
    <nav className="flex justify-evenly w-[93%] bg-indigo-400 text-white font-medium p-4  rounded-xl max-w-screen-md mt-4">
      <a
        onClick={() => navigate("/book-list")}
        className="hover:cursor-pointer hover:text-slate-200 "
      >
        Kitap Listesi
      </a>
      <a
        className="hover:cursor-pointer hover:text-slate-200 "
        onClick={handleSignOut}
      >
        Çıkış
      </a>
    </nav>
  );
}

export default UserMenu;
