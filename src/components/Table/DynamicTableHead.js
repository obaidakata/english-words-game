import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';
import Box from '@mui/material/Box';
import { visuallyHidden } from '@mui/utils';
import PropTypes from 'prop-types';
import * as React from 'react';

const EnhancedTableHead = ({ order, orderBy, onRequestSort, headCells }) => {
	const createSortHandler = property => event => onRequestSort(event, property);

	return (
		<TableHead>
			<TableRow>
				{headCells.map(headCell => (
					<TableCell
						key={headCell.id}
						align="left"
						padding="normal"
						sortDirection={orderBy === headCell.id ? order : false}
					>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : 'asc'}
							onClick={createSortHandler(headCell.id)}
						>
							{headCell.label}
							{orderBy === headCell.id ? (
								<Box component="span" sx={visuallyHidden}>
									{order === 'desc' ? 'sorted descending' : 'sorted ascending'}
								</Box>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
};

EnhancedTableHead.propTypes = {
	order: PropTypes.oneOf(['asc', 'desc']).isRequired,
	orderBy: PropTypes.string.isRequired,
	onRequestSort: PropTypes.func.isRequired,
	headCells: PropTypes.array.isRequired,
};

export default EnhancedTableHead;