//API'dan urun verilerini al ve yuklenme,hata ve gelen verilerin storeda saklanmasi

import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { getData } from "../redux/reducers/actions/productActions";
import Card from "../components/Card";
import { getBasket } from "../redux/reducers/actions/basketActions";

const HomePage = () => {
  const dispatch = useDispatch();

  //store abone olma
  const store = useSelector((store) => store.products);

  {
    store.isError && <h1 className="text-center my-5">{store.isError}</h1>;
  }

  {
    store?.products.map((item) => <div>Kart</div>);
  }

  useEffect(() =>
    //Tek aksiyon ile arka planda API istegi atilacak
    {
      dispatch(getData());
      dispatch(getBasket());
    }, []);

  return (
    <div className="container">
      {/* veriler yükleniyorsa */}
      {store.isLoading && <Loader />}

      {/* hata oluştuysa ekrana bas */}
      {store.isError && <h1 className="text-center my-5">{store.isError}</h1>}

      {/* veriler geldiyse ekrana bas */}
      <div className="d-flex flex-wrap gap-5 justify-content-center my-5">
        {store?.products.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
