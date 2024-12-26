/* eslint-disable react/prop-types */
import React, { useState, useEffect, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import useDebounce from '../../../../core/hooks/useDebounce';

import FeatureTable from '../../../../core/components/FeatureTable';
import FeatureHeader from '../../../../core/components/FeatureHeader';
import SearchInput from '../../../../core/components/SearchInput';

// import useDebounce from '../../../../core/hooks/useDebounce';

// import { PlantAction } from '../../../../redux/actions/PlantAction';

import Theme from '../../../../core/theme';

const useStyles = () => {
  const theme = Theme();
  const styles = {
    buttonCreate: {
      paddingX: 2,
      border: 1,
      backgroundColor: theme.colors.buttonActive,
      borderColor: theme.colors.buttonActive,
      textTransform: 'none',
      color: theme.colors.textSecondary,
      '&:hover': {
        backgroundColor: theme.colors.buttonDisabled,
      },
    },
  };
  return styles;
};

const plantList = [
  {
    plant_code: 1721,
    plant_name: 'CPI Processing Plant',
    company_code: '1720',
    company_name: 'CPI - Cikande',
    plant_address: 'Jln. Ancol 1',
    updated_by: '',
    updated_at: '',
    rooms: [
      {
        room_code: 'CR01',
        plant_code: 1721,
        room_name: 'Cold Room 1',
        created_by: '',
        created_at: '',
        updated_by: '',
        updated_at: '',
      },
      {
        room_code: 'CR02',
        plant_code: 1721,
        room_name: 'Cold Room 2',
        created_by: '',
        created_at: '',
        updated_by: '',
        updated_at: '',
      },
      {
        room_code: 'CR03',
        plant_code: 1721,
        room_name: 'Cold Room 3',
        created_by: '',
        created_at: '',
        updated_by: '',
        updated_at: '',
      },
    ],
    machines: [
      {
        machine_id: 1,
        machine_code: 'M1',
        machine_name: 'AHE-192 (M1)',
        machine_type: 'AHE-192',
        sub_instrument_code: 'CMP',
        location_code: 'CR01',
      },
      {
        machine_id: 2,
        machine_code: 'M2',
        machine_name: 'GTE-394 (M2)',
        machine_type: 'GTE-394',
        sub_instrument_code: 'CMP',
        location_code: 'CR02',
      },
      {
        machine_id: 3,
        machine_code: 'M3',
        machine_name: 'YFV-738 (M3)',
        machine_type: 'YFV-738',
        sub_instrument_code: 'CMP',
        location_code: 'CR03',
      },
    ],
  },
];

const PlantList = () => {
  const styles = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const debounceSearchQuery = useDebounce(searchQuery, 500);

  const loadData = useCallback(() => {
    setLoading(true);
    const loadData = async () => {
      try {
        // const response = await dispatch(
        //   PlantAction.getPlants({
        //     page,
        //     rowsPerPage,
        //     searchQuery: debounceSearchQuery,
        //   })
        // );

        // if (response) {
        setRows(plantList);
        setTotalItems(plantList.length);
        // }

        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    loadData();
  }, [dispatch, page, rowsPerPage, debounceSearchQuery]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box>
      <FeatureHeader
        left={
          <SearchInput
            placeholder='Search...'
            value={searchQuery}
            onChange={(event) => {
              setPage(0);
              setSearchQuery(event.target.value);
            }}
          />
        }
        right={
          <Button component={Link} sx={styles.buttonCreate} to='/plants/create'>
            Create Plant
          </Button>
        }
      />

      <FeatureTable
        title='Plant List'
        rows={rows}
        rowKey='id'
        isLoading={loading}
        headers={[
          { displayName: 'No', key: 'ID' },
          { displayName: 'Code', key: 'plant_code' },
          { displayName: 'Name', key: 'plant_name' },
          { displayName: 'Company', key: 'company_name' },
          { displayName: 'Address', key: 'plant_address' },
        ]}
        rowOnClick={(row) => history.push(`/plants/${row.plant_code}`, { plant: row })}
        renderFunctions={{
          ID: (row, index) => {
            return index + 1;
          },
        }}
        totalItems={totalItems}
        rowsPerPage={rowsPerPage}
        page={page}
        tablePagination
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 15]}
      />
    </Box>
  );
};

export default PlantList;
