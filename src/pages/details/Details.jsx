import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../../context";

const Details = () => {
  const param = useParams();
  const {
    recipeDetails,
    setRecipeDetails,
    loading,
    setLoading,
    addToFavorites,
    favoritesList,
    setFavoritesList,
    clicked,
    setClicked,
  } = useContext(GlobalContext);

  async function fetchDetails() {
    try {
      setLoading(true);
      const res = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes/${param.id}`
      );
      const data = await res.json();
      if (data?.data) {
        // console.log(data.dat);
        setRecipeDetails(data?.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDetails();
  }, []);

  if (loading) {
    return (
      <div>
        <p className="text-2xl font-bold">Loading!!! Please wait...</p>
      </div>
    );
  }

  return (
    <div className="py-10 flex flex-col md:flex-row justify-evenly gap-5">
      <div className="md:h-96 h-50 overflow-hidden rounded-xl">
        <img
          className="w-full h-full objext-cover block"
          src={recipeDetails?.recipe?.image_url}
          alt=""
        />
      </div>
      <div className="flex flex-col gap-3 text-left">
        <h1 className="text-2xl font-bold truncate">
          {recipeDetails?.recipe?.title}
        </h1>
        <p className="text-cyan-700 text-sm font-medium">
          {recipeDetails?.recipe?.publisher}
        </p>
        <button
          onClick={() => {
            addToFavorites(recipeDetails?.recipe);
            setClicked(!clicked);
          }}
          className="text-white bg-black p-3 w-1/2 rounded-lg"
        >
          {favoritesList &&
          favoritesList.length &&
          favoritesList.findIndex(
            (item) => item.id === recipeDetails?.recipe?.id
          ) !== -1
            ? "Remove from favorites"
            : "Add to favorites"}
        </button>
        <p className="text-2xl font-semibold text-black">Ingredients:</p>
        <ul className="flex flex-col gap-3">
          {recipeDetails?.recipe?.ingredients.map((item, index) => {
            return (
              <li key={index}>
                <span className="text-2xl font-semibold text-black">
                  {item.quantity} {item.unit}
                </span>
                <span className="text-2xl font-semibold text-black">
                  {` ${item.description}`}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Details;
