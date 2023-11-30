import { configureStore } from "@reduxjs/toolkit";
import getReducer from "./components/counter/getSlice";

export const store = configureStore({
  reducer: {
    getData: getReducer,
  },
});
