//import { CAMPSITES } from '../../app/shared/oldData/CAMPSITES';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { mapImageURL } from '../../utils/mapImageURL';
import { db } from '../../firebase.config';
import { collection, getDocs } from 'firebase/firestore';

export const fetchCampsites = createAsyncThunk(
    'campsites/fetchCampsites', //action type
    async () => {
        const querySnapshot = await getDocs(collection(db, 'campsites'));
        const campsites = [];
        querySnapshot.forEach((doc) => { //loop through firestore document in collection and push to array
            campsites.push(doc.data())
        })
        return campsites;
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
      state.campsitesArray = mapImageURL(action.payload);
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