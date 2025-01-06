/* eslint-disable react/prop-types */
import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// import { useDispatch } from 'react-redux';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import useDebounce from '../../../../core/hooks/useDebounce';

import FeatureTable from '../../../../core/components/FeatureTable';
import FeatureHeader from '../../../../core/components/FeatureHeader';
import SearchInput from '../../../../core/components/SearchInput';

// import useDebounce from '../../../../core/hooks/useDebounce';

// import { MachineAction } from '../../../../redux/actions/MachineAction';

import Theme from '../../../../core/theme';
import { Typography } from '@mui/material';

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

const machineList = [
  {
    machine_id: 1,
    machine_code: 'M1',
    machine_name: 'AHE-192 (M1)',
    machine_model: 'AHE-192',
    sub_instrument_code: 'CMP',
    status: 'danger',
    room: [
      {
        loc_id: 1,
        room_code: 'CR01',
        plant_code: 1720,
        room_name: 'Cold Room 1',
        created_by: 'agus',
        created_at: '2024-12-02',
        updated_by: '',
        updated_at: '',
      },
      {
        loc_id: 2,
        room_code: 'CR01',
        plant_code: 1721,
        room_name: 'Cold Room 1',
        created_by: 'agus',
        created_at: '2024-12-02',
        updated_by: '',
        updated_at: '',
      },
      {
        loc_id: 2,
        room_code: 'CR01',
        plant_code: 1721,
        room_name: 'Cold Room 1',
        created_by: 'agus',
        created_at: '2024-12-02',
        updated_by: '',
        updated_at: '',
      },
      {
        loc_id: 2,
        room_code: 'CR01',
        plant_code: 1721,
        room_name: 'Cold Room 1',
        created_by: 'agus',
        created_at: '2024-12-02',
        updated_by: '',
        updated_at: '',
      },
      {
        loc_id: 2,
        room_code: 'CR01',
        plant_code: 1721,
        room_name: 'Cold Room 1',
        created_by: 'agus',
        created_at: '2024-12-02',
        updated_by: '',
        updated_at: '',
      },
      {
        loc_id: 2,
        room_code: 'CR01',
        plant_code: 1721,
        room_name: 'Cold Room 1',
        created_by: 'agus',
        created_at: '2024-12-02',
        updated_by: '',
        updated_at: '',
      },
      {
        loc_id: 2,
        room_code: 'CR01',
        plant_code: 1721,
        room_name: 'Cold Room 1',
        created_by: 'agus',
        created_at: '2024-12-02',
        updated_by: '',
        updated_at: '',
      },
      {
        loc_id: 2,
        room_code: 'CR01',
        plant_code: 1721,
        room_name: 'Cold Room 1',
        created_by: 'agus',
        created_at: '2024-12-02',
        updated_by: '',
        updated_at: '',
      },
      {
        loc_id: 2,
        room_code: 'CR01',
        plant_code: 1721,
        room_name: 'Cold Room 1',
        created_by: 'agus',
        created_at: '2024-12-02',
        updated_by: '',
        updated_at: '',
      },
    ],
  },
  {
    machine_id: 2,
    machine_code: 'M2',
    machine_name: 'GTE-394 (M2)',
    machine_model: 'GTE-394',
    sub_instrument_code: 'CMP',
    status: 'warning',
    room: [
      {
        loc_id: 2,
        room_code: 'CR01',
        plant_code: 1721,
        room_name: 'Cold Room 1',
        created_by: 'agus',
        created_at: '2024-12-02',
        updated_by: '',
        updated_at: '',
      },
    ],
  },
  {
    machine_id: 3,
    machine_code: 'M3',
    machine_name: 'YFV-738 (M3)',
    machine_model: 'YFV-738',
    sub_instrument_code: 'CMP',
    status: 'good',
    room: [
      {
        loc_id: 3,
        room_code: 'CR02',
        plant_code: 1721,
        room_name: 'Cold Room 2',
        created_by: 'agus',
        created_at: '2024-12-02',
        updated_by: '',
        updated_at: '',
      },
    ],
  },
];

const MachineList = () => {
  const styles = useStyles();
  const navigate = useNavigate();
  // const dispatch = useDispatch();
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
        //   MachineAction.getMachines({
        //     page,
        //     rowsPerPage,
        //     searchQuery: debounceSearchQuery,
        //   })
        // );

        // if (response) {
        setRows(machineList);
        setTotalItems(machineList.length);
        // }

        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    loadData();
  }, [page, rowsPerPage, debounceSearchQuery]);

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

  const renderConditionBar = (status) => {
    const isDanger = status === 'danger';
    const isWarning = status === 'warning';
    const color = isDanger ? 'red' : isWarning ? 'yellow' : 'green';
    return (
      <Box
        sx={{
          background: color,
          width: 100,
          height: 40,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 8,
          borderColor: 'black',
          borderStyle: 'solid',
        }}
      >
        <Typography sx={{ fontWeight: 'bold', color: 'grey' }}>{status}</Typography>
      </Box>
    );
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
          <Button component={Link} sx={styles.buttonCreate} to='/machines/create'>
            Create Machine
          </Button>
        }
      />

      <FeatureTable
        title='Machine List'
        rows={rows}
        rowKey='id'
        isLoading={loading}
        headers={[
          { displayName: 'No', key: 'ID' },
          { displayName: 'Code', key: 'machine_code' },
          { displayName: 'Name', key: 'machine_name' },
          { displayName: 'Model', key: 'machine_model' },
          { displayName: 'sub_instrument', key: 'sub_instrument_code' },
          { displayName: 'Status', key: 'status' },
        ]}
        rowOnClick={(row) => navigate(`/machines/${row.machine_id}`, { machine: row })}
        renderFunctions={{
          ID: (row, index) => {
            return index + 1;
          },
          status: (row, index) => {
            return renderConditionBar(row.status);
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

export default MachineList;
