import { configureStore } from '@reduxjs/toolkit';
import wordsReducer from '../components/WordGame/WordGame.slice';

export const store = configureStore({
	reducer: {
		wordsSlice: wordsReducer
	}
});

export default store;