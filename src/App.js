import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentWordIndex, getCurrentWords, getWords, wordsActions } from './components/WordGame/WordGame.slice';
import { exportUserInfo, removeLocalData } from './components/WordGame/WordGame.utils';
import { Box, Paper } from '@mui/material';
import WordGame from './components/WordGame/WordGame';
import UploadFilePage from './components/UpladFilePage/UploadFilePage';
import WordsTable from './components/WordsTable/WordsTable';
import Button from '@mui/material/Button';
import * as React from 'react';
import PopUpDialog from './components/PopUpDialog/PopUpDialog';


function App () {
	const dispatch = useDispatch();
	const allWords = useSelector(getWords());
	const currentWordIndex = useSelector(getCurrentWordIndex());
	const currentWords = useSelector(getCurrentWords());

	const onExit = () => {
		removeLocalData();
		dispatch(wordsActions.resetWords());
	};

	const HeaderInformation = () => ( <>
		<h5 className="headerText">Word: {currentWordIndex + 1} of {currentWords.length}</h5>
		<Button color="secondary" size="small" onClick={() => exportUserInfo(allWords)}>Save Progress</Button>
		<Button color="secondary" size="small" onClick={onExit}>Exit</Button>
		<Button color="secondary" size="small" onClick={() => dispatch(wordsActions.setShowTable(true))}>
			Open Words Table
		</Button>
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

			<PopUpDialog content={<WordsTable/>}/>
		</>
	);
}

export default App;
