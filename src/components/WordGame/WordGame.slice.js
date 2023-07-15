import { createSlice } from '@reduxjs/toolkit';
import { chooseWords } from './WordGame.utils';

const defaultLevel = 'a1';
const initialState = {
	words: null,
	currentWordIndex: 0,
	showWord: false,
	currentWords: [],
	level: defaultLevel,
	success: 5,
	failure: 0,
	mute: false,
	showTable: false
};

export const wordsSlice = createSlice({
	name: 'wordsSlice',
	initialState,
	reducers: {
		loadWords (state, action) {
			const newWords = action.payload;
			state.words = newWords;
			state.currentWordIndex = 0;
			state.showWord = false;
			state.level = defaultLevel;
			state.currentWords = chooseWords(newWords, defaultLevel, state.success, state.failure);
		},
		resetWords (state) {
			state.words = null;
		},
		setCurrentWordIndex (state, action) {
			const index = action.payload;
			state.currentWordIndex = ( index >= 0 && index < state.currentWords.length ) ? index : 0;
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
		incrementSuccess (state, action) {
			const currentWordIndex = action.payload;
			const currentWord = state.currentWords[currentWordIndex];
			const allWords = state.words;
			currentWord.success = currentWord.success + 1
			// TODO: increment success only of the user wrote the correct spelling before 3 mistakes.
			allWords.forEach((item, index) => {
				if (item.word === currentWord.word) {
					item.success = item.success + 1;
				}
			});
		},
		incrementFailure (state, action) {
			const currentWordIndex = action.payload;
			const currentWord = state.currentWords[currentWordIndex];
			currentWord.failure = currentWord.failure + 1
			state.words.forEach(item => {
				if (item.word === currentWord.word) {
					item.failure = item.failure + 1;
				}
			});
		},
		setLevel (state, action) {
			const newLevel = action.payload;
			if (newLevel !== state.level) {
				state.level = newLevel;
				state.showWord = false;
				state.currentWordIndex = 0;
				state.currentWords = chooseWords(state.words, newLevel, state.success, state.failure);
			}
		},
		setSuccess (state, action) {
			state.success = action.payload;
			state.showWord = false;
			state.mute = true;
			state.currentWords = chooseWords(state.words, state.level, state.success, state.failure);
			state.currentWordIndex = 0;
		},
		setFailure (state, action) {
			state.failure = action.payload;
			state.showWord = false;
			state.mute = true;
			state.currentWords = chooseWords(state.words, state.level, state.success, state.failure);
			state.currentWordIndex = 0;
		},
		setMute (state, action) {
			state.mute = action.payload;
		},
		setShowTable (state, action) {
			state.showTable = action.payload;
		}
	}
});


export const wordsActions = wordsSlice.actions;

export const getWords = () => state => state.wordsSlice.words;
export const getCurrentWordIndex = () => state => state.wordsSlice.currentWordIndex;
export const getShowWord = () => state => state.wordsSlice.showWord;
export const getCurrentWords = () => state => state.wordsSlice.currentWords;
export const getLevel = () => state => state.wordsSlice.level;
export const getSuccess = () => state => state.wordsSlice.success;
export const getFailure = () => state => state.wordsSlice.failure;
export const getMute = () => state => state.wordsSlice.mute;
export const getShowTable = () => state => state.wordsSlice.showTable;

export const startOver = dispatch => dispatch(wordsActions.setCurrentWordIndex(0));

export default wordsSlice.reducer;