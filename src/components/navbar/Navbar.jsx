import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { GlobalContext } from "../../context";

const Navbar = () => {
  const { searchParam, setSearchParam, handleSubmit } =
    useContext(GlobalContext);
  return (
    <div className="flex md:flex-row flex-col gap-5 p-3 justify-between items-center">
      <h1 className="text-3xl font-bold text-red-800">
        <NavLink to={"/"}>Food Recipes</NavLink>
      </h1>
      <form onSubmit={handleSubmit}>
        <input
          className="rounded-full text-xl p-3 px-8 shadow-lg shadow-red-300 focus:shadow-red-400 outline-none"
          type="text"
          name="search-recipes"
          value={searchParam}
          onChange={(e) => setSearchParam(e.target.value)}
          placeholder="Enter Item..."
        />
      </form>
      <ul className="list-none flex gap-8">
        <li className="text-xl font-semibold">
          <NavLink to={"/"}>Home</NavLink>
        </li>
        <li className="text-xl font-semibold">
          <NavLink to={"/favorites"}>Favorites</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
