import { getLocalData, openFile, saveDataLocally } from '../WordGame/WordGame.utils';
import { MuiFileInput } from 'mui-file-input';
import { useDispatch } from 'react-redux';
import { wordsActions } from '../WordGame/WordGame.slice';
import { useEffect } from 'react';


const UploadFilePage = () => {
	const dispatch = useDispatch();
	const onLoadWords = newWords => {
		saveDataLocally(newWords);
		dispatch(wordsActions.loadWords(newWords));
	};

	useEffect(() => {
		const newWords = getLocalData();
		if (newWords) {
			dispatch(wordsActions.loadWords(newWords));
		}
	});

	return (
		<div className="menu_box_body">
			<h1>Welcome to the Words Game</h1>
			<h4>Please upload a file</h4>
			<MuiFileInput onChange={file => openFile(file, onLoadWords)}/>
		</div>
	);
};

export default UploadFilePage;