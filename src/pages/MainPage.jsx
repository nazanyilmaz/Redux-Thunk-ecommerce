//API'dan urun verilerini al ve yuklenme,hata ve gelen verilerin storeda saklanmasi

import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setProducts,
  setLoading,
  setError,
} from "../redux/reducers/actions/productActions";
import Loader from "../components/Loader";

const MainPage = () => {
  const dispatch = useDispatch();

  //store abone olma
  const store = useSelector((store) => store.products);

  {
    store.isError && <h1 className="text-center my-5">{store.isError}</h1>;
  }

  {
    store?.products.map((item) => <div>Kart</div>);
  }

  useEffect(() => {
    //1) istegin basladigini store bildirecegiz
    dispatch(setLoading());

    axios
      .get("http://localhost:3060/products")
      // 2) İsteğin başarılı olduğunu store'a bildir
      .then((res) => dispatch(setProducts(res.data)))

      // 3) İsteğin başarısız olduğunu store'a bildir
      .catch((err) => dispatch(setError(err.message)));
  }, []);

  return (
    <div className="container p-5">
      {/* veriler yükleniyorsa */}
      {store.isLoading && <Loader />}

      {/* hata oluştuysa ekrana bas */}
      {store.isError && <h1 className="text-center my-5">{store.isError}</h1>}

      {/* veriler geldiyse ekrana bas */}
      {store?.products.map((item) => (
        <h3>{item.title}</h3>
      ))}
    </div>
  );
};

export default MainPage;
