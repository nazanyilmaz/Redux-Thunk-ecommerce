//Asekron yani Thunk Alsiyon sepete ekleme isini yapacak
//API post ile elemani ekleyip sonrada store ekleyecek
import axios from "axios";
export const addToBasket = (product) => async (dispatch) => {
  const newProduct = { ...product, amount: 1 };

  //obje icndeki gereksiz degerleri kaldirma
  delete newProduct.specs;
  delete newProduct.color;
  delete newProduct.title;
  delete newProduct.stockAmount;

  // sepete eklenen urunu API'ye kaydetme
  const res = await axios.post("http://localhost:3060/basket", newProduct);

  dispatch({
    type: "ADD",
    payload: newProduct,
  });
};

//API'dan alinan sepet verilerini hakkinda storu bilgilendirme

export const getBasket = () => (dispatch) => {
  dispatch({
    type: "SET_BASKET_LOADING",
  });

  axios
    .get("http://localhost:3060/basket")
    .then((res) =>
      dispatch({
        type: "SET_BASKET_DATA",
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: "SET_BASKET_ERROR",
        payload: err.message,
      })
    );
};

//Sepette varolan urun miktarini artirma

export const updateItem = (product) => (dispatch) => {
  axios
    .patch(`http://localhost:3060/basket/${product.id}`, {
      amount: product.amount + 1,
    })
    .then(() => {
      dispatch({
        type: "UPDATE",
        payload: product.id,
      });
    });
};

// urunu sepetten kaldirma

export const removeItem = (delete_id) => (dispatch) => {
  axios.delete(`http://localhost:3060/basket/${delete_id}`).then(() =>
    dispatch({
      type: "DELETE",
      payload: delete_id,
    })
  );
};
