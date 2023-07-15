import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { creatHeadCells, getComparator, stableSort } from './DynamicTable.utils';
import EnhancedTableHead from './DynamicTableHead';
import EnhancedTableToolbar from './DynamicTableToolbar';


const DynamicTable = ({ data, title }) => {
	const firstItem = data[0];
	const keys = Object.keys(firstItem);
	const firstKey = keys[0]

	const [order, setOrder] = useState('asc');
	const [orderBy, setOrderBy] = useState(firstKey);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const handleChangePage = (_, newPage) => setPage(newPage);

	const handleChangeRowsPerPage = e => {
		setRowsPerPage(parseInt(e.target.value, 10));
		setPage(0);
	};

	const visibleRows = React.useMemo(() =>
			stableSort(data, getComparator(order, orderBy)).slice(
				page * rowsPerPage,
				page * rowsPerPage + rowsPerPage,
			),
		[data, order, orderBy, page, rowsPerPage]);

	return (
		<Box sx={{ width: '100%' }}>
			<Paper sx={{ width: '100%', mb: 2 }}>
				<EnhancedTableToolbar title={title}/>
				<TableContainer>
					<Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="small">
						<EnhancedTableHead
							order={order}
							orderBy={orderBy}
							onRequestSort={handleRequestSort}
							headCells={creatHeadCells(data)}
						/>
						<TableBody>
							{visibleRows.map((row, i) => ( <TableRow key={`TableRow ${i}`} hover tabIndex={-1} >
									{keys.map((key, j) => <TableCell key={`TableCell ${j}`} align="left">{row[key]}</TableCell>)}
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[10, 25]}
					component="div"
					count={data.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
		</Box>
	);
};

export default DynamicTable;