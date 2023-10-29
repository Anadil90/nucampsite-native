import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../shared/baseUrl';

export const fetchPartners = createAsyncThunk(
    'partners/fetchPartners',
    async () => {
        const response = await fetch(baseUrl + 'partners')//get request to json server to look for partners array
        if(!response.ok) {//handled promise rejection to deal with error
            return Promise.reject('Server was unable to fetch data' + response.status);
        }
        const data = await response.json()//parse incoming data from server
        return data;//return response as resolved promise
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
            state.partnersArray = action.payload
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