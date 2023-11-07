import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../shared/baseUrl';


export const fetchComments = createAsyncThunk(
    'comments/fetchComments',
    async () => {
        const response = await fetch(baseUrl + 'comments');//get request to fetch comments from json server
        if(!response.ok) {//handle promise rejection
            return Promise.reject('Unable to load comments, status: ' + response.status);
        }
        const data = await response.json()//parse resolved promise
        return data//return resolved promise 
    }
)

export const postComment = createAsyncThunk(
    'comments/postComments',
    async (payload, {dispatch, getState}) => {
        const { comments } = getState();
        comments.date = new Date().toISOString();
        const response = await fetch(baseUrl + 'comments', {
            method: 'POST',
            body: JSON.stringify(comments),
            headers: {'Content-Type': 'application/json'}
        }
        );
        if(!response.ok) {
            return Promise.reject(response.status);
        }
        
            
        dispatch(addComment(payload));
    
        
    }
)

const initialState = {
    commentsArray: [],
    isLoading: true,
    errMsg: ''
};

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        addComment: (state, action) => { //Add Comment Action
            console.log('addComment action payload', action.payload)
            console.log('addComment state.commentsArray', state.commentsArray)
            state.commentsArray.push(action.payload);
        }
    },
    extraReducers: {
        [fetchComments.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchComments.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.errMsg = '';
            state.commentsArray = action.payload;
        },
        [fetchComments.rejected]: (state, action) => {
            state.isLoading = false;
            state.errMsg = action.error ? action.error.message : 'Unable to display comments'
        },
        [postComment.pending]: (state) => {
            state.isLoading = true;
        },
        [postComment.fulfilled]: (state) => {
            state.isLoading = false;
            state.errMsg = '';
        },
        [postComment.rejected]: (state, action) => {
            state.errMsg = action.error ? action.error.message : 'Unable to post comment';
            
        }
    }
});

export const commentsReducer = commentsSlice.reducer;

export const { addComment } = commentsSlice.actions; //export action creator

export const selectCommentsByCampsiteId = (campsiteId) => (state) => {
    return state.comments.commentsArray.filter (
        (comment) => comment.campsiteId === parseInt(campsiteId)
    )
};