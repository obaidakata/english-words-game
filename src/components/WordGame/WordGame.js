import Word from '../Word/Word';
import { useCallback, useEffect, useState } from 'react';
import { speechHandler } from './WordGame.utils';
import Button from '@mui/material/Button';
import { Box, ButtonGroup, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentWordIndex, getCurrentWords, getMute, getShowWord, startOver, wordsActions } from './WordGame.slice';
import LevelSelect from '../LevelSelect/LevelSelect';
import SuccessFailureSelect from '../SuccessFailureSelect/SuccessFailureSelect';


const WordGame = () => {
	const dispatch = useDispatch();
	const currentWordIndex = useSelector(getCurrentWordIndex());
	const showWord = useSelector(getShowWord());
	const currentWords = useSelector(getCurrentWords());
	const mute = useSelector(getMute());
	const [attempts, setAttempts] = useState(0);

	const onSuccess = () => {
		if (attempts === 0) {
			dispatch(wordsActions.incrementSuccess(currentWordIndex));
		}
		dispatch(wordsActions.setShowWord(false));
		dispatch(wordsActions.setCurrentWordIndex(currentWordIndex + 1));
	};

	useEffect(() => setAttempts(0), [currentWordIndex])

	const onFailure = () => {
		setAttempts(attempts + 1);
		dispatch(wordsActions.incrementFailure(currentWordIndex));
	};

	const getCurrentSuccess = useCallback(() => currentWords[currentWordIndex]?.success, [currentWordIndex, currentWords]);
	const getCurrentFailure = useCallback(() => currentWords[currentWordIndex]?.failure, [currentWordIndex, currentWords]);
	const getCurrentWord = useCallback(() => currentWords[currentWordIndex]?.word, [currentWordIndex, currentWords]);

	const speakCurrentWord = useCallback(() => {
		dispatch(wordsActions.setMute(false));
		speechHandler(getCurrentWord());
	}, [dispatch, getCurrentWord]);

	useEffect(() => {
		if (!mute) {
			speakCurrentWord();
		}
	}, [currentWordIndex, getCurrentWord, mute, speakCurrentWord]);

	useEffect(() => {
		window.addEventListener('keyup', handleCommandSPress, false);
		return () => window.removeEventListener('keyup', handleCommandSPress);
	});

	const handleCommandSPress = e => ( e.ctrlKey && e.key === 'Enter' ) && dispatch(wordsActions.flipShowWord());

	return (
		<>
			<LevelSelect/>
			<Box sx={{ width: 500 }}>
				<SuccessFailureSelect/>

				<Grid container spacing={0}>
					<Grid item xs={4}>
						<h5>Success: {getCurrentSuccess()}</h5>
					</Grid>
					<Grid item xs={4}>
						<h5>Failure: {getCurrentFailure()}</h5>
					</Grid>
					<Grid item xs={4}>
						<h5>Attempts: {attempts}</h5>
					</Grid>
				</Grid>
			</Box>
			<ButtonGroup variant="contained" aria-label="outlined primary button group">
				<Button size="small" onClick={() => dispatch(startOver)}>Start Over</Button>
			</ButtonGroup>

			<h1 onClick={speakCurrentWord}>🔊</h1>
			{getCurrentWord() &&
			<Word key={getCurrentWord()} word={getCurrentWord()} onSuccess={onSuccess} onFailure={onFailure}/>}
			<Button variant="contained"
					onClick={() => dispatch(wordsActions.flipShowWord())}>{showWord ? 'Hide' : 'Show'} Word</Button>
			{showWord && <h3>{getCurrentWord()}</h3>}
		</>
	);
};

export default WordGame;