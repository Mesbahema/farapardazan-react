import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import { data } from '../../data/data'
import shortid from 'shortid'

import { useContext } from 'react'
import { DataContext } from '../../store/GlobalState'


import EnhancedTableHead from './EnhancedTableHead';
import EnhancedTableToolbar from './EnhancedTableToolbar';



function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function stableFilter(array, filterBy, filter) {
  if (filterBy && filter) {
    const result = array.filter(element => element[filterBy].toLowerCase().includes(filter.toLowerCase()))
    return result
  }
  return array
}

const headCells = [
  { id: 'name', numeric: false, filterable: true, disablePadding: true, label: 'نام' },
  { id: 'date', numeric: false, filterable: true, disablePadding: false, label: 'تاریخ' },
  { id: 'title', numeric: false, filterable: true, disablePadding: false, label: 'عنوان' },
  { id: 'field', numeric: false, filterable: true, disablePadding: false, label: 'فیلد' },
  { id: 'old_value', numeric: false, filterable: false, disablePadding: false, label: 'مقدار قدیم' },
  { id: 'new_value', numeric: false, filterable: false, disablePadding: false, label: 'مقدار جدید' },
];


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default function DataTable() {
  

  const classes = useStyles();

  const [dense, setDense] = React.useState(false);

  const { state, dispatch } = useContext(DataContext)

  const { order, orderBy, selected, page, rowsPerPage, filterBy, filter } = state

  const rows = stableFilter(data, filterBy, filter)

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';

    dispatch({
      type: 'SET_ORDER', payload: isAsc ? 'desc' : 'asc'
    })
    dispatch({
      type: 'SET_ORDER_BY', payload: property
    })
  };

  const handleSelectAllClick = (event) => {



    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      dispatch({
        type: 'SET_SELECTED', payload: newSelecteds
      })
      return;
    }
    dispatch({
      type: 'SET_SELECTED', payload: []
    })
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    dispatch({
      type: 'SET_SELECTED', payload: newSelected
    })
  };

  const handleChangePage = (event, newPage) => {
    dispatch({
      type: 'SET_PAGE', payload: newPage
    })
  };

  const handleChangeRowsPerPage = (event) => {
    dispatch({
      type: 'SET_ROWS_PER_PAGE', payload: parseInt(event.target.value, 10)
    })
    dispatch({
      type: 'SET_PAGE', payload: 0
    })
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} headCells={headCells} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              headCells={headCells}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={shortid.generate()}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.name}
                      </TableCell>
                      <TableCell align="left">{row.date}</TableCell>
                      <TableCell align="left">{row.title}</TableCell>
                      <TableCell align="left">{row.field}</TableCell>
                      <TableCell align="left">{row.old_value}</TableCell>
                      <TableCell align="left">{row.new_value}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </div>
  );
}