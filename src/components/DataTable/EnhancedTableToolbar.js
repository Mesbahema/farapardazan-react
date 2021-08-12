import React from 'react';
import { lighten, makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Badge from '@material-ui/core/Badge';
import FilterListIcon from '@material-ui/icons/FilterList';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import SearchInput from '../TextFields/SearchInput'

import { useContext } from 'react'
import { DataContext } from '../../store/GlobalState'

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
}));

export default function EnhancedTableToolbar(props) {
    const classes = useToolbarStyles();
    const { numSelected, headCells } = props;
    const [anchorEl, setAnchorEl] = React.useState(null);

    const { state, dispatch } = useContext(DataContext)

    const { filter, filterBy } = state

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const inputs = headCells.filter(cell => cell.filterable);

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                    لیست تغییرات
                </Typography>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <>
                    <Tooltip title="Filter list" onClick={handleClick}>
                        <IconButton aria-label="filter list">
                            {filter && filterBy ? <Badge badgeContent="1" color="primary">
                                <FilterListIcon />
                            </Badge> :
                                <FilterListIcon />}

                        </IconButton>
                    </Tooltip>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem>
                            <SearchInput inputs={inputs} />
                        </MenuItem>
                    </Menu>
                </>

            )}
        </Toolbar>
    );
};

