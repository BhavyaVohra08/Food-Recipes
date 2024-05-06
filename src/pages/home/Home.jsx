import React, { useContext } from "react";
import RecipeItem from "../../components/recipe-item/RecipeItem";
import { GlobalContext } from "../../context";

const Home = () => {
  const { recipeList, loading } = useContext(GlobalContext);

  if (loading)
    return (
      <div>
        <p className="text-2xl font-bold">Loading!!! Please wait...</p>
      </div>
    );

  return (
    <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
      {recipeList && recipeList.length > 0 ? (
        recipeList.map((item) => <RecipeItem key={item.id} item={item} />)
      ) : (
        <div>
          <p className="text-2xl font-bold">Nothing to show...</p>
        </div>
      )}
    </div>
  );
};

export default Home;
