import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getLevel, wordsActions } from '../WordGame/WordGame.slice';


const LevelSelect = () => {
	const dispatch = useDispatch();
	const level = useSelector(getLevel());

	return (
		<FormControl sx={{ m: 1, minWidth: 80 }}>
			<InputLabel id="demo-simple-select-autowidth-label">Level</InputLabel>
			<Select
				labelId="demo-simple-select-autowidth-label"
				id="demo-simple-select-autowidth"
				value={level}
				onChange={e => dispatch(wordsActions.setLevel(e.target.value))}
				autoWidth
				label="Level"
			>
				<MenuItem value={'a1'}>A1</MenuItem>
				<MenuItem value={'a2'}>A2</MenuItem>
				<MenuItem value={'b1'}>B1</MenuItem>
				<MenuItem value={'b2'}>B2</MenuItem>
				<MenuItem value={'c1'}>C1</MenuItem>
			</Select>
		</FormControl>
	);
};

export default LevelSelect;