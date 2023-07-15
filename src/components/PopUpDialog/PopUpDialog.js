import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useDispatch, useSelector } from 'react-redux';
import { getShowTable, wordsActions } from '../WordGame/WordGame.slice';

const PopUpDialog = ({ content }) => {
	const dispatch = useDispatch();
	const showTable = useSelector(getShowTable());

	const handleClose = () => dispatch(wordsActions.setShowTable(false));

	return (
		<div>
			<Dialog
				open={showTable}
				onClose={handleClose}
				maxWidth='xl'
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogContent>
					{content}
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Close</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default PopUpDialog;