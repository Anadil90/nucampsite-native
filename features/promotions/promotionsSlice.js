import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { mapImageURL } from '../../utils/mapImageURL';
import { db } from '../../firebase.config';
import { collection, getDocs } from 'firebase/firestore';

export const fetchPromotions = createAsyncThunk(
    'promotions/fetchPromotions',
    async () => {
        const querySnapshot = await getDocs(collection(db, 'promotions'));
        const promotions = [];
        querySnapshot.forEach((doc) => {
            promotions.push(doc.data());
        })
        return promotions; 
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
            state.promotionsArray = mapImageURL(action.payload);
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