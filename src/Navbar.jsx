import React from "react";
import { Link } from "react-router-dom";
//import { useRoleFromToken } from "./hooks/useRoleFromToken.js";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const Navbar = () => {
  //const { rola, error, expired } = useRoleFromToken();
  //const navigate = useNavigate();
  //const location = useLocation();

  // const handleLogout = () => {
  //   localStorage.clear();
  //   if (location.pathname !== "/k_utovar") {
  //     navigate("/k_utovar");
  //   } else {
  //     navigate(0);
  //   }
  // };

  // const istekaoToken = () => {
  //   localStorage.clear();
  //   MySwal.fire({
  //     icon: "warning",
  //     title: "ISTEKLA VAM JE SESIJA",
  //     showConfirmButton: false,
  //     timer: 2500,
  //   });
  //   navigate("/k_utovar/login");
  // };

  // if (expired) {
  //   istekaoToken();
  // }

  return (
    <nav className="bg-lime-400 font-sans xl:text-xl 2xl:text-5xl backdrop-blur-sm shadow-xl text-slate-300 p-6 w-full absolute top-0 flex flex-row justify-center items-center gap-4">
        <span className="text-blue-950 font-bold">Rezervacija toplih obroka</span>
    </nav>
  );
};

export default Navbar;
