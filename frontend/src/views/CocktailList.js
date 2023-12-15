import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductModal from "../components/ProductModal";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../redux/reducers/api-reducer";
import Card from "../components/Card";

const CocktailList = () => {
  const [modalShow, setModalShow] = useState(false);
  const [cocktail, setCocktail] = useState({});
  const { cocktails } = useSelector((state) => state);
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData("/api/cocktails/getAllCocktails"));
  }, []);

  function setProduct(e) {
    setModalShow(true);
    setCocktail(JSON.parse(e.target.dataset.product));
  }

  if (cocktails.loading) {
    return (
      <div className="container d-flex mt-5 pt-5">
        <div
          className="spinner-border text-primary test-center m-auto"
          role="status"
        ></div>
      </div>
    );
  }

  if (cocktails.error.status) {
    return <div>Error: {cocktails.error.message}</div>;
  }

  return (
    <div className="text-white container mt-3 py-5">
      <h1>Cocktail List</h1>
      <>
        <div className="cardWrapper row">
          {cocktails.cocktails.map((cocktail) => (
            <div key={cocktail.id} className="my-5 col-12 col-md-6 col-xl-4">
              <Card cocktail={cocktail} />
              <Button
                className="mx-3"
                variant="primary"
                data-product={JSON.stringify(cocktail)}
                onClick={(e) => setProduct(e)}
              >
                Procedimento
              </Button>
            </div>
          ))}
        </div>

        <ProductModal
          show={modalShow}
          data={{ cocktail }}
          onHide={() => setModalShow(false)}
        />
      </>
    </div>
  );
};

export default CocktailList;
