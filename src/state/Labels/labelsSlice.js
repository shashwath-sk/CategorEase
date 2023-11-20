import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    labels: [],
};


const labelsSlice = createSlice({
    name: 'labels',
    initialState,
    reducers: {
        addLabel(state, action) {
            state.labels.push(action.payload);
        },
        removeLabel(state, action) {
            state.labels = state.labels.filter(label => label !== action.payload);
        },
    },
});

export const {addLabel, removeLabel} = labelsSlice.actions;
export const labelsReducer = labelsSlice.reducer;