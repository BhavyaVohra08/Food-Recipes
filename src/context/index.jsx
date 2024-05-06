import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [loading, setLoading] = useState(false);
  const [searchParam, setSearchParam] = useState("");
  const [recipeList, setRecipeList] = useState([]);
  const [recipeDetails, setRecipeDetails] = useState([]);
  const [favoritesList, setFavoritesList] = useState([]);
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`
      );
      const data = await res.json();
      if (data?.data?.recipes) {
        setRecipeList(data?.data?.recipes);
        console.log(data);
        setLoading(false);
        setSearchParam("");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setSearchParam("");
    }
  }

  const addToFavorites = (currItem) => {
    console.log(currItem);
    let cpyFavorites = [...favoritesList];
    const index = cpyFavorites.findIndex((item) => item.id === currItem.id);
    if (index === -1) {
      cpyFavorites.push(currItem);
    } else {
      cpyFavorites.splice(currItem);
    }

    setFavoritesList(cpyFavorites);
    localStorage.setItem("favorites", JSON.stringify(cpyFavorites));
  };

  return (
    <GlobalContext.Provider
      value={{
        searchParam,
        setSearchParam,
        loading,
        setLoading,
        handleSubmit,
        recipeList,
        setRecipeList,
        recipeDetails,
        setRecipeDetails,
        favoritesList,
        setFavoritesList,
        addToFavorites,
        clicked,
        setClicked,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
