import React, { useContext, useState } from "react";
import { GlobalContext } from "../../context";
import RecipeItem from "../../components/recipe-item/RecipeItem";

const Favorites = () => {
  const { favoritesList, setFavoritesList } = useContext(GlobalContext);

  const getFromLocalStorage = () => {
    const list = localStorage.getItem("favorites");
    if (list) {
      return JSON.parse(list);
    } else {
      return [];
    }
  };

  const list = getFromLocalStorage();

  return (
    <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
      {list && list.length ? (
        list.map((item) => <RecipeItem item={item} key={item.id} />)
      ) : (
        <div>
          <p className="text-2xl font-bold">Nothing in Favorites</p>
        </div>
      )}
    </div>
  );
};

export default Favorites;
