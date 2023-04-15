import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    searchName:''
}


const SearchSlice = createSlice({
    name: 'Search',
    initialState: initialState,
    reducers: {
        setSearch(state, action) {
            state.searchName = action.payload
        }
    }
})

export default SearchSlice
export const SearchActions = SearchSlice.actions