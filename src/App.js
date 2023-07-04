import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import {
	getCurrentWordIndex,
	getLevel,
	getPageIndex,
	getWords,
	wordsActions
} from './components/WordGame/WordGame.slice';
import {
	exportUserInfo,
	filterWordsByLevel,
	removeLocalData,
	saveDataLocally
} from './components/WordGame/WordGame.utils';
import { Box, Paper } from '@mui/material';
import WordGame from './components/WordGame/WordGame';
import UploadFilePage from './components/UpladFilePage/UploadFilePage';

export const pageSize = 50;


function App () {
	const dispatch = useDispatch();
	const allWords = useSelector(getWords());
	const level = useSelector(getLevel());
	const currentWordIndex = useSelector(getCurrentWordIndex());

	const onExit = () => {
		removeLocalData();
		dispatch(wordsActions.resetWords());
	}

	const HeaderInformation = () => ( <>
		<h5 className="headerText">Word: {currentWordIndex + 1} of {filterWordsByLevel(allWords, level).length}</h5>
		<button onClick={() => exportUserInfo(allWords)}>Save Progress</button>
		<button onClick={onExit}>Exit</button>
	</> );

	return (
		<>
			<header className="App-header">
				{allWords && <HeaderInformation/>}
			</header>
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				minHeight="100vh"
			>
				<Paper elevation={3} style={{ 'width': '90%', 'minHeight': '80vh' }}>
					<Box
						display="flex"
						justifyContent="center"
						alignItems="center"
					>
						<div className="menu_box_body">
							{( allWords ? <WordGame/> : <UploadFilePage/> )}
						</div>
					</Box>
				</Paper>
			</Box>
		</>
	);
}

export default App;
