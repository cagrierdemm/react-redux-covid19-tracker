import { configureStore } from "@reduxjs/toolkit";
import covidSlice from "./covidSlice";
import totalSlice from "./totalSlice";

export const store = configureStore({
    reducer: {
        covid: covidSlice,
        total: totalSlice
    },
})