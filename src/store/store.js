import {  configureStore} from "@reduxjs/toolkit";
import SearchSlice from "./slices/search-slice";
const store= configureStore({
    reducer:{
     Search:SearchSlice.reducer,
    }
})

export default store