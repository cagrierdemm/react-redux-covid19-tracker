import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTotal = createAsyncThunk('countries/getTotal', async () => {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_ENDPOINT}/totalData`, {
            headers: {
                'content-type': 'application/json',
                'authorization': `apikey ${process.env.REACT_APP_API_KEY}`,
            },
        });
        return res.data;
});

export const totalSlice = createSlice({
    name: 'total',
    initialState: {
        items: [],
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTotal.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(fetchTotal.fulfilled, (state, action) => {
                state.items = action.payload;
                state.status = "succeeded";

            })
            .addCase(fetchTotal.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });

    }
})

export default totalSlice.reducer;