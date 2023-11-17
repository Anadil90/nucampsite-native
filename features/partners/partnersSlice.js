import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { mapImageURL } from '../../utils/mapImageURL';
import { db } from '../../firebase.config';
import { collection, getDocs } from 'firebase/firestore';

export const fetchPartners = createAsyncThunk(
    'partners/fetchPartners',
    async () => {
        const querySnapshot = await getDocs(collection(db, 'partners'));
        const partners = [];
        querySnapshot.forEach((doc) => { //push each db document object to partners array
            partners.push(doc.data());
        })
        return partners;
    }
)

const initialState = {
    partnersArray: [],
    isLoading: true,
    errMsg: ''
}

const partnersSlice = createSlice({
    name: 'partners',
    initialState,
    reducers: [],
    extraReducers: {
        [fetchPartners.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchPartners.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.errMsg = '';
            state.partnersArray = mapImageURL(action.payload);
        },
        [fetchPartners.rejected]: (state, action) => {
            state.isLoading = false;
            state.errMsg = action.error ? action.error.message : 'Failed to fetch data';
        }
    }
})

export const partnersReducer = partnersSlice.reducer

export const selectAllPartners = (state) => {
    return state.partners.partnersArray;
}

export const selectFeaturedPartner = (state) => {   
    return { 
        featuredItem: state.partners.partnersArray.find(
            (partner) => partner.featured
        ),
        isLoading: state.partners.isLoading,
        errMsg: state.partners.errMsg
    };
}