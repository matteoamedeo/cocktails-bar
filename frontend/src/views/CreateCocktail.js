import React from "react";
import { useDispatch, useSelector } from "react-redux";

const CreateCocktail = () => {
  const { auth } = useSelector((state) => state);

  return <div className="text-large text-white">CreateCocktail</div>;
};

export default CreateCocktail;
