import Word from '../Word/Word';
import { useCallback, useEffect } from 'react';
import { speechHandler } from './WordGame.utils';
import Button from '@mui/material/Button';
import { ButtonGroup } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
	getCurrentWordIndex,
	getCurrentWords,
	getPageIndex,
	getShowWord,
	moveToNextPage,
	restartPage,
	wordsActions
} from './WordGame.slice';
import LevelSelect from '../LevelSelect/LevelSelect';


const WordGame = () => {
	const dispatch = useDispatch();
	const pageIndex = useSelector(getPageIndex());
	const currentWordIndex = useSelector(getCurrentWordIndex());
	const showWord = useSelector(getShowWord());
	const currentWords = useSelector(getCurrentWords());


	const onSuccess = () => {
		dispatch(wordsActions.addScoreToCurrent(currentWordIndex));
		dispatch(wordsActions.setShowWord(false));
		dispatch(wordsActions.setCurrentWordIndex(pageIndex < currentWords.length ? currentWordIndex + 1 : 0));
	};

	const getCurrentWord = useCallback(() => currentWords[currentWordIndex]?.word, [currentWordIndex, currentWords]);
	const getWordLevel = useCallback(() => currentWords[currentWordIndex]?.level, [currentWordIndex, currentWords]);

	const speakCurrentWord = () => speechHandler(getCurrentWord());

	useEffect(speakCurrentWord, [currentWordIndex, getCurrentWord]);

	useEffect(() => {
		window.addEventListener('keyup', handleCommandSPress, false);
		return () => window.removeEventListener('keyup', handleCommandSPress);
	});

	const handleCommandSPress = e => ( e.ctrlKey && e.key === 'Enter' ) && dispatch(wordsActions.flipShowWord());

	return (
		<>
			<LevelSelect/>
			<ButtonGroup variant="contained" aria-label="outlined primary button group">
				<Button onClick={() => dispatch(moveToNextPage)}>Ready to move to next page?</Button>
				<Button onClick={() => dispatch(restartPage)}>Move to beginning of the page</Button>
			</ButtonGroup>

			<h1>Level {getWordLevel()}</h1>
			<h1 onClick={speakCurrentWord}>🔊</h1>
			{getCurrentWord() && <Word key={getCurrentWord()} word={getCurrentWord()} onSuccess={onSuccess}/>}
			<Button variant="contained"
					onClick={() => dispatch(wordsActions.flipShowWord())}>{showWord ? 'Hide' : 'Show'} Word</Button>
			{showWord && <h3>{getCurrentWord()}</h3>}
		</>
	);
};

export default WordGame;