import { createStore, combineReducers, applyMiddleware } from "redux";
import productReducer from "./productReducer";
import basketReducer from "./basketReducer";
import { thunk } from "redux-thunk";

const rootReducer = combineReducers({
  products: productReducer,
  basket: basketReducer,
});

//applyMiddware fonk. bir arayazilimi reduxa dahil eder biz Thunk'u dahil ettik
export default createStore(rootReducer, applyMiddleware(thunk));
