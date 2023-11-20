import {configureStore} from '@reduxjs/toolkit';
import userReducer from './User/userSlice';
import {imagesReducer} from './Image/imagesSlice';
import {labelsReducer} from './Labels/labelsSlice';
import {imageSearchReducer} from './Image/imageSearchSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        images: imagesReducer,
        search: imageSearchReducer,
        labels: labelsReducer,
    },
});

export default store;