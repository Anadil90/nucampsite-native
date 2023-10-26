import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../app/shared/baseUrl';
import { mapImageUrl } from '../../utils/mapImageUrl';

export const fetchPromotions = createAsyncThunk(
    'promotions/fetchPromotions',
    async () => {
        const response = await fetch(baseUrl + 'promotions')//get request to promotions
        if(!response.ok) {//handle promise rejection
            return Promise.reject('Unable to fetch data from server, status: ' + response.status);
        }
        const data = await response.json()//parsed data from request
        return data//return reponse as resolved promise
    }
)

const initialState = {
    promotionsArray: [],
    isLoading: true,
    errMsg: ''
}

const promotionsSlice = createSlice({
    name: 'promotions',
    initialState,
    reducers: [],
    extraReducers: {
        [fetchPromotions.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchPromotions.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.errMsg = '';
            state.promotionsArray = mapImageUrl(action.payload);
        },
        [fetchPromotions.rejected]: (state, action) => {
            state.isLoading = false;
            state.errMsg = action.error ? action.error.message : 'Failed to fetch data';
        }
    }
})

export const promotionsReducer = promotionsSlice.reducer

export const selectFeaturedPromotion = (state) => {
    return {
            featuredItem: state.promotions.promotionsArray.find(
            (promotion) => promotion.featured
        ),
        isLoading: state.promotions.isLoading,
        errMsg: state.promotions.errMsg
    };
}