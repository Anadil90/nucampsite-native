//import { CAMPSITES } from '../../app/shared/oldData/CAMPSITES';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../shared/baseUrl';
import { mapImageUrl } from '../../utils/mapImageUrl';

export const fetchCampsites = createAsyncThunk(
    'campsites/fetchCampsites', //action type
    async () => {
        const response = await fetch(baseUrl + 'campsites') //get request to json server to look for campsites
        if(!response.ok) {//handled promise rejection to deal with data fetching error
            return Promise.reject('Server was unable to fetch data, status: ' + response.status);
        }
        const data = await response.json();//parse incoming data to object when promise is resolved
        return data;
    }
)

const initialState = { 
    campsitesArray: [], 
    isLoading: true, 
    errMsg:'' 
};

const campsitesSlice = createSlice({
  name: 'campsites',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCampsites.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchCampsites.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.errMsg = '';
      state.campsitesArray = action.payload;
    },
    [fetchCampsites.rejected]: ( state, action ) => {
      state.isLoading = false;
      state.errMsg = action.error ? action.error.message : 'Failed to fetch data';
    }
  }
});

export const campsitesReducer =  campsitesSlice.reducer;

export const selectAllCampsites = (state) => {
    console.log('this is the state:', state)
    return state.campsites.campsitesArray;
}

export const campsitesAtRandom = (state) => {
    console.log('random campsite: ')
    let randomIndex = Math.floor(Math.random() * state.campsites.campsitesArray.length);
    return state.campsites.campsitesArray[randomIndex];
}


export const selectCampsiteById = (id) => (state) => {
    return state.campsites.campsitesArray.find(
        (campsite) => campsite.id === parseInt(id)
    );
}

export const selectFeaturedCampsite = (state) => {
    return {
        featuredItem: state.campsites.campsitesArray.find(
            (campsite) => campsite.featured
        ),
        isLoading: state.campsites.isLoading,
        errMsg: state.campsites.errMsg
    }
}