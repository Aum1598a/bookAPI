import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="pb-4">
      <div className="navbar bg-stone-800 px-12">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl h-full w-36">
            <Link to={"/"}>
              <img
                src="https://cdn.discordapp.com/attachments/1048191083911323648/1089869484380147854/Untitled-2.png"
                alt=""
                srcset=""
              />
            </Link>
          </a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/HomepageRandom"}>Random</Link>
            </li>
            {/* <li>
              <Link to={"/GroupSearch"}>GroupSearch</Link>
            </li> */}
            <li>
              <Link to={"/BookCreate"}>Book Add</Link>
            </li>
            <li>
              <Link to={"/Editbook"}>Edit book</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
