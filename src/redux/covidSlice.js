import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchDatas = createAsyncThunk('countries/getDatas', async () => {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_ENDPOINT}/countriesData`, {
            headers: {
                'content-type': 'application/json',
                'authorization': `apikey ${process.env.REACT_APP_API_KEY}`,
            },
        });
        return res.data;
});

export const covidSlice = createSlice({
    name: 'covid',
    initialState: {
        items: [],
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDatas.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(fetchDatas.fulfilled, (state, action) => {
                state.items = action.payload;
                state.status = "succeeded";

            })
            .addCase(fetchDatas.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });

    }
})

export default covidSlice.reducer;