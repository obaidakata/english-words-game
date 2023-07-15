import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import * as React from 'react';

const sxValues = {
	pl: { sm: 2 },
	pr: { xs: 1, sm: 1 },
}

const EnhancedTableToolbar = ({ title }) => {
	return (
		<Toolbar sx={sxValues}>
			<Typography
				sx={{ flex: '1 1 100%' }}
				variant="h6"
				id="tableTitle"
				component="div"
			>
				{title}
			</Typography>
		</Toolbar>
	);
};

EnhancedTableToolbar.propTypes = {
	title: PropTypes.string.isRequired,
};

export default EnhancedTableToolbar;