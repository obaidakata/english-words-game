import { useDispatch, useSelector } from 'react-redux';
import { Slider } from '@mui/material';
import { getFailure, getSuccess, wordsActions } from '../WordGame/WordGame.slice';


const SuccessFailureSelect = () => {
	const dispatch = useDispatch();
	const success = useSelector(getSuccess())
	const failure = useSelector(getFailure())

	const setSuccess = value => dispatch(wordsActions.setSuccess(value))
	const setFailure = value => dispatch(wordsActions.setFailure(value))

	return (
		<>
			<Slider
				aria-label="Temperature"
				defaultValue={5}
				getAriaValueText={value => `${value}°C`}
				step={1}
				marks
				valueLabelDisplay="on"
				min={0}
				max={20}
				onChange={e => setSuccess(e.target.value)}
				value={success}
			/>
			<Slider
				aria-label="Temperature"
				defaultValue={5}
				getAriaValueText={value => `${value}°C`}
				step={1}
				marks
				valueLabelDisplay="on"
				min={0}
				max={20}
				onChange={e => setFailure(e.target.value)}
				value={failure}
			/>
		</>
	);
};

export default SuccessFailureSelect;