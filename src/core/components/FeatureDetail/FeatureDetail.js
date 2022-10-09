import React from 'react';

import { makeStyles } from '@mui/styles';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import CardContent from '@mui/material/CardContent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import TableCell from '@mui/material/TableCell';

import DateTime from '../../utils/dateFormatter';
import Rupiahize from '../../utils/rupiahize';

const useStyles = makeStyles(() => ({
  root: {},
  content: {
    padding: 0,
  },
  tableCellHead: {
    width: 200,
  },
  imgStyle: {
    display: 'block',
    width: 'auto',
    height: 300,
  },
}));

const FeatureDetail = ({ title, row, renderFunctions, headers }) => {
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

  const handleHeaderSplitData = (row, splitHeaderKey) => {
    if (row[splitHeaderKey[0]]) {
      const result = row[splitHeaderKey[0]][splitHeaderKey[1]] || '-';
      return result;
    }
    return;
  };

  const handleHeaderData = (row, headerKey) => {
    if (!row) {
      return null;
    } else {
      if (headerKey.includes('.')) {
        const splitHeaderKey = headerKey.split('.');
        const splitHeaderData = handleHeaderSplitData(row, splitHeaderKey);
        return splitHeaderData;
      }

      return row[headerKey];
    }
  };

  const renderTableDetailValue = (header) => {
    return (
      <TableRow key={header.displayName}>
        <TableCell className={classes.tableCellHead}>
          {header.displayName}
        </TableCell>
        <TableCell>
          {renderFunctions && renderFunctions[header.key]
            ? renderFunctions[header.key](row)
            : renderDisplayData(handleHeaderData(row, header.key), header.type)}
        </TableCell>
      </TableRow>
    );
  };

  const renderTableDetail = () => {
    const renderValues = headers.map((header) => {
      return renderTableDetailValue(header);
    });

    return (
      <TableContainer>
        <Table size='medium' aria-label='enhanced table'>
          <TableBody>{renderValues}</TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <Card>
      <CardHeader style={{ backgroundColor: '#F8F8F8' }} title={title} />
      <Divider />
      <CardContent className={classes.content}>
        {renderTableDetail()}
      </CardContent>
    </Card>
  );
};

export default FeatureDetail;
