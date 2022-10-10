import React from 'react';
import { Link as LinkRouter } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';

import DateTime from '../../utils/dateFormatter';
import Rupiahize from '../../utils/rupiahize';

import Theme from '../../theme';

const useStyles = () => {
  const theme = Theme();
  const styles = {
    root: {
      border: 1,
      borderColor: theme.colors.brandPrimary,
    },
    header: {
      color: theme.colors.textSecondary,
      backgroundColor: theme.colors.brandPrimary,
    },

    imgStyle: {
      display: 'block',
      width: '300',
      height: 'auto',
    },
    buttonCancel: {
      paddingX: 2,
      border: 1,
      backgroundColor: theme.colors.semanticError,
      borderColor: theme.colors.semanticError,
      color: theme.colors.textSecondary,
      '&:hover': {
        backgroundColor: theme.colors.buttonDisabled,
      },
    },
  };
  return styles;
};

const FeatureDetail = ({ title, row, renderFunctions, headers }) => {
  const styles = useStyles();

  const renderDisplayDataRupiah = (data) => {
    return Rupiahize(data);
  };

  const renderDisplayDataImage = (data) => {
    return (
      <img
        style={styles.imgStyle}
        src={data}
        alt={data}
        onClick={() => {
          window.open(data, '_blank');
        }}
      />
    );
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
        <TableCell>{header.displayName}</TableCell>
        <TableCell>
          {renderFunctions && renderFunctions[header.key]
            ? renderFunctions[header.key](row)
            : renderDisplayData(handleHeaderData(row, header.key), header.type)}
        </TableCell>
      </TableRow>
    );
  };

  const renderTableDetail = () => {
    const renderValues = headers?.map((header) => {
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

  const renderButtonCancel = () => {
    return (
      <Button sx={styles.buttonCancel} component={LinkRouter} to='/products'>
        Cancel
      </Button>
    );
  };

  return (
    <Card sx={styles.root}>
      <CardHeader sx={styles.header} title={title} />
      <Divider />
      <CardContent>{renderTableDetail()}</CardContent>
      <CardActions>{renderButtonCancel()}</CardActions>
    </Card>
  );
};

export default FeatureDetail;
