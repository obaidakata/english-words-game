import moment from 'moment';


const newWordsKey = 'newWords';

export const exportUserInfo = (userInfo) => {
	const fileData = JSON.stringify(userInfo);
	const blob = new Blob([fileData], { type: 'text/plain' });
	const url = URL.createObjectURL(blob);
	const link = document.createElement('a');

	link.download = moment().format('D-MM-YYYY HH:mm:ss') + '.json';
	link.href = url;
	link.click();
};

export const removeLocalData = () => localStorage.removeItem(newWordsKey);
export const saveDataLocally = newWords => localStorage.setItem(newWordsKey, JSON.stringify(newWords));
export const getLocalData = () => JSON.parse(localStorage.getItem(newWordsKey));

export const speechHandler = (text) => window.speechSynthesis.speak(new SpeechSynthesisUtterance(text));


export const openFile = (file, onDoneProcessing) => {
	const reader = new FileReader();

	let fileloaded = e => {
		const fileContents = e.target.result;
		onDoneProcessing(JSON.parse(fileContents));
	};

	fileloaded = fileloaded.bind(this);
	reader.onload = fileloaded;
	reader.readAsText(file);
};

export const filterWordsByLevel = (words, level) => words.filter(word => word.level === level)

export const chooseWords = (allWords, pageSize, pageNumber, level) => {
	return shuffle(filterWordsByLevel(allWords, level).slice(( pageNumber - 1 ) * pageSize, pageNumber * pageSize)).sort((a, b) => a.success - b.success);
};

const shuffle = (array) => {
	let currentIndex = array.length, randomIndex;

	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		[array[currentIndex], array[randomIndex]] = [
			array[randomIndex], array[currentIndex]];
	}

	return array;
};