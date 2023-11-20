import {createSlice} from '@reduxjs/toolkit';


const imageSearchSlice = createSlice({
    name: 'search',
    initialState: {
      filters: [],
    },
    reducers: {
      addLabelToFilter: (state, action) => {
        const { label } = action.payload;
        const filters = state.filters;
        if (!filters.includes(label)) {
          state.filters = filters.concat(label);
        }
      },
     removeLabelFromFilter: (state, action) => {
        const { label } = action.payload;
        const filters = state.filters;
        if (filters.includes(label)) {
            state.filters = filters.filter((l) => l !== label);
        }
    },
    },
  });
  
  export const { addLabelToFilter, removeLabelFromFilter } = imageSearchSlice.actions;
  export const selectFilter = (state) => state.search.filter;
  
  export const imageSearchReducer = imageSearchSlice.reducer;