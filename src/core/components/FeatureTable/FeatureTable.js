import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { List as ReactContentLoaderList } from 'react-content-loader';
import LoadingOverlay from 'react-loading-overlay';
import { Link } from 'react-router-dom';

import Drawer from '@mui/material/Drawer';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import Divider from '@mui/material/Divider';
import TablePagination from '@mui/material/TablePagination';
import TableSortLabel from '@mui/material/TableSortLabel';

import DateTime from '../../utils/dateFormatter';
import Rupiahize from '../../utils/rupiahize';

const useStyles = makeStyles(() => ({
  root: { width: '100%' },
  content: {
    padding: 0,
  },
  inner: {
    minWidth: 'auto',
    overflow: 'auto',
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    marginRight: 2,
  },
  actions: {
    justifyContent: 'flex-end',
  },
  actionButton: {
    width: 90,
    margin: 1,
  },
  cardActions: {
    justifyContent: 'flex-end',
  },
  imgStyle: {
    objectFit: 'contain',
    display: 'block',
    width: 200,
    height: 200,
  },
  table: {
    border: 0,
    overflowX: 'auto',
  },
}));

const FeatureTable = (props) => {
  const {
    title,
    headers,
    rows,
    isLoading,
    renderFunctions,
    sortByColumnName,
    sortByDirection,
    sortFunction,
    tablePagination,
    page,
    totalItems,
    rowsPerPage,
    rowsPerPageOptions,
    onChangePage,
    onChangeRowsPerPage,
    rowOnClick,
    disableSorting,
  } = props;

  const classes = useStyles();

  const renderDisplayDataRupiah = (data) => {
    return Rupiahize(data);
  };

  const renderDisplayDataImage = (data) => {
    return <img className={classes.imgStyle} src={data} alt={data} />;
  };
  const renderDisplayDataDate = (data) => {
    return DateTime(data);
  };

  const renderDisplayData = (data, type) => {
    if (!data) {
      return '-';
    } else {
      switch (type) {
        case 'rupiah':
          return renderDisplayDataRupiah(data);
        case 'image':
          return renderDisplayDataImage(data);
        case 'date':
          return renderDisplayDataDate(data);
        default:
          return String(data);
      }
    }
  };

  const handleHeaderData = (row, headerKey) => {
    if (headerKey.includes('.')) {
      const splitHeaderKey = headerKey.split('.');
      if (row[splitHeaderKey[0]]) {
        return row[splitHeaderKey[0]][splitHeaderKey[1]];
      }
      return '-';
    }
    return row[headerKey];
  };

  const handleTableBodyRowOnClick = ({ event, row, index }) => {
    if (
      !!event.target.value !== true &&
      event.target.getAttribute('name') === 'childCell'
    ) {
      rowOnClick && rowOnClick(row, index, event);
    }
  };

  const renderTableTitle = () => {
    if (title) {
      return (
        <CardHeader
          style={{ backgroundColor: 'rgb(248, 248, 248)', paddingRight: 28 }}
          title={title}
        />
      );
    }
  };

  const renderTableSortLabel = (header) => {
    if (!disableSorting && header.sortable) {
      return (
        <TableSortLabel
          active={sortByColumnName === header.key}
          // direction={sortByDirection.toLowerCase()}
          onClick={() =>
            sortFunction(header.key, sortByDirection === 'ASC' ? 'DESC' : 'ASC')
          }
        >
          {header?.displayName}
        </TableSortLabel>
      );
    } else {
      return <Typography>{header?.displayName}</Typography>;
    }
  };

  const renderTableHeaderValue = (header) => {
    return (
      <TableCell key={header?.key} style={{ backgroundColor: '#F8F8F8' }}>
        {renderTableSortLabel(header)}
      </TableCell>
    );
  };

  const renderTableHeader = () => {
    const renderValues = headers?.map((header) => {
      return renderTableHeaderValue(header);
    });

    return (
      <TableHead style={{ backgroundColor: 'black' }}>
        <TableRow>{renderValues}</TableRow>
      </TableHead>
    );
  };

  const renderTableBodyValueData = ({ header, row, index }) => {
    return (
      <TableCell key={header.key} style={{ border: 0 }} name='childCell'>
        {renderFunctions && renderFunctions[header.key]
          ? renderFunctions[header.key](row, index)
          : renderDisplayData(handleHeaderData(row, header.key), header.type)}
      </TableCell>
    );
  };

  const renderTableBodyValue = (row, index) => {
    const renderData = headers.map((header) => {
      return renderTableBodyValueData({ header, row, index });
    });

    return (
      <TableRow
        style={{ cursor: 'pointer' }}
        className={classes.tableRow}
        hover
        name='childCell'
        key={index}
        onClick={(event) => {
          handleTableBodyRowOnClick({ event, row, index });
        }}
      >
        {renderData}
      </TableRow>
    );
  };

  const renderTableBody = () => {
    const renderValues = rows.map((row, index) => {
      return renderTableBodyValue(row, index);
    });

    return <TableBody sx={{ overflowX: 'auto' }}>{renderValues}</TableBody>;
  };

  const renderTableFooter = () => {
    console.log('GILA', rowsPerPage, tablePagination);
    if (!!rowsPerPage && !!tablePagination) {
      return (
        <CardActions className={classes.cardActions}>
          <TablePagination
            component='div'
            count={totalItems}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
            rowsPerPageOptions={rowsPerPageOptions}
          />
        </CardActions>
      );
    }
  };

  if (isLoading && rows && rows.length === 0) {
    return (
      <Card className={classes.root}>
        <CardContent className={classes.content}>
          <ReactContentLoaderList />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={classes.root}>
      {renderTableTitle()}
      <Divider />
      <CardContent style={{ padding: 0, overflowX: 'auto' }}>
        <LoadingOverlay active={isLoading} spinner text='Loading...'>
          <Table stickyHeader>
            {renderTableHeader()}
            {renderTableBody()}
          </Table>
        </LoadingOverlay>
      </CardContent>
      {renderTableFooter()}
    </Card>
  );
};

export default FeatureTable;
