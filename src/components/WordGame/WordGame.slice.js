import { createSlice } from '@reduxjs/toolkit';
import { chooseWords } from './WordGame.utils';
import { pageSize } from '../../App';

const defaultLevel = 'a1'
// Todo: the page need to be dynamic
const initialState = { words: null, pageIndex: 1, currentWordIndex: 0, showWord: false, currentWords: [], level: defaultLevel };

export const wordsSlice = createSlice({
	name: 'wordsSlice',
	initialState,
	reducers: {
		loadWords (state, action) {
			const newWords = action.payload
			state.words = newWords;
			state.currentWordIndex = 0;
			state.showWord = false;
			state.pageIndex = 1
			state.level = defaultLevel
			state.currentWords = chooseWords(newWords, pageSize, 1, defaultLevel);
		},
		resetWords (state) {
			state.words = null;
		},
		setPageIndex (state, action) {
			state.pageIndex = action.payload;
		},
		setCurrentWordIndex (state, action) {
			state.currentWordIndex = action.payload;
		},
		setShowWord (state, action) {
			state.showWord = action.payload;
		},
		flipShowWord (state) {
			state.showWord = !state.showWord;
		},
		setCurrentWords (state, action) {
			state.currentWords = action.payload;
		},
		addScoreToCurrent(state, action) {
			const currentWordIndex = action.payload;
			state.currentWords[currentWordIndex].success = state.currentWords[currentWordIndex].success + 1
		},
		setLevel(state, action) {
			const newLevel = action.payload;
			if (newLevel !== state.level) {
				state.level = newLevel;
				state.showWord = false;
				state.pageIndex = 1
				state.currentWords = chooseWords(state.words, pageSize, 1, newLevel);
			}
		}
	}
});


export const wordsActions = wordsSlice.actions;

export const getWords = () => state => state.wordsSlice.words;
export const getPageIndex = () => state => state.wordsSlice.pageIndex;
export const getCurrentWordIndex = () => state => state.wordsSlice.currentWordIndex;
export const getShowWord = () => state => state.wordsSlice.showWord;
export const getCurrentWords = () => state => state.wordsSlice.currentWords;
export const getLevel = () => state => state.wordsSlice.level;

export const moveToNextPage = (dispatch, getState) => {
	const state = getState();
	const pageIndex = getPageIndex()(state);
	const allWords = getWords()(state);
	debugger;
	if (pageIndex < ( allWords.length / pageSize )) {
		dispatch(wordsActions.setPageIndex(pageIndex + 1));
		dispatch(wordsActions.setCurrentWords(chooseWords(allWords, pageSize, pageIndex + 1)));
	} else {
		dispatch(wordsActions.setPageIndex(1));
		restartPage();
		dispatch(wordsActions.setCurrentWords(chooseWords(allWords, pageSize, 1, )));
	}
};

export const restartPage = dispatch => dispatch(wordsActions.setCurrentWordIndex(0));

export default wordsSlice.reducer;