import { useEffect } from "react";
import Loader from "../components/Loader";
import { useSelector, useDispatch } from "react-redux";
import { getBasket } from "../redux/reducers/actions/basketActions";
import BasketItem from "../components/BasketItem";

const BasketPage = () => {
  const store = useSelector((store) => store.basket);
  const dispatch = useDispatch();

  //console.log(store);

  //API'den sepete eklenen urunleri store aktarma
  useEffect(() => {
    dispatch(getBasket());
  }, []);

  const total = store.basket.reduce(
    (total, item) => total + item.amount * item.price,
    0
  );
  return (
    <div className="container p-5">
      <div className="row gap-4">
        <div className="col-md-8">
          {store.isloading && <Loader />}
          {store.isError && <h3>{store.isError}</h3>}
          {store.basket.map((product) => (
            <BasketItem key={product.id} product={product} />
          ))}
        </div>
        <div className="col-md-4" style={{ width: "65%" }}>
          <div className="bg-white p-5 rounded  text-black">
            <h5 className="text-center">Toplam Tutar: {total} tl</h5>
            <button className=" btn btn-warning w-100 my-2">
              Alisverisi Tamamla
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasketPage;
