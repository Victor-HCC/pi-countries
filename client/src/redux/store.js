import { configureStore } from '@reduxjs/toolkit';
import countriesReducer from './countriesSlicer';
import activitiesReducer from './activitiesSlicer';

const store = configureStore({
  reducer: {
    countries: countriesReducer,
    activities: activitiesReducer
  }
});

export default store;
