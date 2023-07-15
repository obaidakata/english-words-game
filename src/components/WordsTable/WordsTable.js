import { useSelector } from 'react-redux';
import { getWords } from '../WordGame/WordGame.slice';
import DynamicTable from '../Table/DynamicTable';


const WordsTable = () => {
	const allWords = useSelector(getWords());
	// console.log(allWords);
	return (
		<>
			{( allWords && allWords.length > 0 ) && ( <DynamicTable title="Words" data={allWords}/> )}
		</>
	);
};

export default WordsTable;