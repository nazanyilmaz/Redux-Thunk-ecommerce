//burada aksiyon olusturan fonksiyonlar yazacagiz

import axios from "axios";

export const setLoading = () => {
  return {
    type: "SET_LOADING",
  };
};

export const setProducts = (payload) => {
  return {
    type: "SET_PRODUCTS",
    payload,
  };
};

export const setError = (payload) => {
  return {
    type: "SET_ERROR",
    payload,
  };
};

//Redux-Thunk devreye girince aksiyon olusturan fonksiyonlar(AOF)

//redux-thunk ile AOFler return icerinde yeni bir fonksiyon dondurme yetenegine sahip olur. bu return edilen fonsiyonlar icerinde API istekleri yapabiliriz.
export const getData = () => {
  return (dispatch) => {
    dispatch(setLoading());
    //dispatch reduxtan gelen burada olmak zorunda
    //API istekleri atilip store haber verilir.
    axios
      .get("http://localhost:3060/products")
      .then((res) => dispatch(setProducts(res.data)))
      .catch((err) => dispatch(setError(err.message)));
  };
};
