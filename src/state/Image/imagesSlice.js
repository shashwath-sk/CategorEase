import { createSlice } from '@reduxjs/toolkit';


const initialImagesState = {
  images: [],
};

const imagesSlice = createSlice({
  name: 'images',
  initialState: initialImagesState,
  reducers: {
    addImage: (state, action) => {
        const { url } = action.payload;
        const image = state.images.find(image => image.url === url);
        if (!image) {
            state.images.push(action.payload);   
        }

    },
    removeImage: (state, action) => {
      state.images = state.images.filter(image => image.url !== action.payload.url);
    },
    addLabel: (state, action) => {
      const { url, label } = action.payload;
      const image = state.images.find(image => image.url === url);

      if (image && image.labels) {
        image.labels.push(label);
      }
    },
    removeLabel: (state, action) => {
      const { url, label } = action.payload;
      const image = state.images.find(image => image.url === url);

      if (image && image.labels) {
        image.labels = image.labels.filter(labels => labels !== label);

      }
    },

    addPatientId: (state, action) => {
      const { url, patientId } = action.payload;
      const image = state.images.find(image => image.url === url);

      if (image) {
        image.patientId = patientId;
      }
    },

  },
});

export const { addImage, removeImage, addLabel, removeLabel } = imagesSlice.actions;

export const imagesReducer = imagesSlice.reducer;
