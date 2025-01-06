/* eslint-disable react/prop-types */
import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// import { useDispatch } from 'react-redux';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import useDebounce from '../../core/hooks/useDebounce';

import FeatureTable from '../../core/components/FeatureTable';
import FeatureHeader from '../../core/components/FeatureHeader';
import SearchInput from '../../core/components/SearchInput';

// import useDebounce from '../../../../core/hooks/useDebounce';

// import { MachineAction } from '../../../../redux/actions/MachineAction';

import Theme from '../../core/theme';
import { Typography } from '@mui/material';
import ChartLinear from '../../core/components/ChartLinear';
import ChartPie from '../../core/components/ChartPie';
import { Height } from '@mui/icons-material';

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

const test = [
  {
    id: 'japan',
    color: 'hsl(270, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 135,
      },
      {
        x: 'helicopter',
        y: 234,
      },
      {
        x: 'boat',
        y: 147,
      },
      {
        x: 'train',
        y: 180,
      },
      {
        x: 'subway',
        y: 112,
      },
      {
        x: 'bus',
        y: 120,
      },
      {
        x: 'car',
        y: 38,
      },
      {
        x: 'moto',
        y: 10,
      },
      {
        x: 'bicycle',
        y: 224,
      },
      {
        x: 'horse',
        y: 232,
      },
      {
        x: 'skateboard',
        y: 127,
      },
      {
        x: 'others',
        y: 140,
      },
    ],
  },
  {
    id: 'france',
    color: 'hsl(224, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 281,
      },
      {
        x: 'helicopter',
        y: 207,
      },
      {
        x: 'boat',
        y: 172,
      },
      {
        x: 'train',
        y: 247,
      },
      {
        x: 'subway',
        y: 151,
      },
      {
        x: 'bus',
        y: 194,
      },
      {
        x: 'car',
        y: 3,
      },
      {
        x: 'moto',
        y: 228,
      },
      {
        x: 'bicycle',
        y: 62,
      },
      {
        x: 'horse',
        y: 51,
      },
      {
        x: 'skateboard',
        y: 213,
      },
      {
        x: 'others',
        y: 119,
      },
    ],
  },
  {
    id: 'us',
    color: 'hsl(176, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 98,
      },
      {
        x: 'helicopter',
        y: 109,
      },
      {
        x: 'boat',
        y: 114,
      },
      {
        x: 'train',
        y: 24,
      },
      {
        x: 'subway',
        y: 251,
      },
      {
        x: 'bus',
        y: 170,
      },
      {
        x: 'car',
        y: 113,
      },
      {
        x: 'moto',
        y: 76,
      },
      {
        x: 'bicycle',
        y: 17,
      },
      {
        x: 'horse',
        y: 41,
      },
      {
        x: 'skateboard',
        y: 76,
      },
      {
        x: 'others',
        y: 101,
      },
    ],
  },
  {
    id: 'germany',
    color: 'hsl(138, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 177,
      },
      {
        x: 'helicopter',
        y: 269,
      },
      {
        x: 'boat',
        y: 10,
      },
      {
        x: 'train',
        y: 14,
      },
      {
        x: 'subway',
        y: 166,
      },
      {
        x: 'bus',
        y: 275,
      },
      {
        x: 'car',
        y: 156,
      },
      {
        x: 'moto',
        y: 171,
      },
      {
        x: 'bicycle',
        y: 230,
      },
      {
        x: 'horse',
        y: 54,
      },
      {
        x: 'skateboard',
        y: 247,
      },
      {
        x: 'others',
        y: 11,
      },
    ],
  },
  {
    id: 'norway',
    color: 'hsl(46, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 262,
      },
      {
        x: 'helicopter',
        y: 10,
      },
      {
        x: 'boat',
        y: 94,
      },
      {
        x: 'train',
        y: 58,
      },
      {
        x: 'subway',
        y: 147,
      },
      {
        x: 'bus',
        y: 88,
      },
      {
        x: 'car',
        y: 261,
      },
      {
        x: 'moto',
        y: 50,
      },
      {
        x: 'bicycle',
        y: 15,
      },
      {
        x: 'horse',
        y: 214,
      },
      {
        x: 'skateboard',
        y: 243,
      },
      {
        x: 'others',
        y: 298,
      },
    ],
  },
];

const test1 = [
  {
    id: 'php',
    label: 'php',
    value: 174,
    color: 'hsl(189, 70%, 50%)',
  },
  {
    id: 'go',
    label: 'go',
    value: 481,
    color: 'hsl(282, 70%, 50%)',
  },
  {
    id: 'make',
    label: 'make',
    value: 77,
    color: 'hsl(134, 70%, 50%)',
  },
  {
    id: 'css',
    label: 'css',
    value: 409,
    color: 'hsl(111, 70%, 50%)',
  },
  {
    id: 'ruby',
    label: 'ruby',
    value: 384,
    color: 'hsl(356, 70%, 50%)',
  },
];

const Dashboard = () => {
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

  return (
    <Box>
      <Typography>Dashboard</Typography>

      <ChartLinear data={test} style={{ width: '100%', height: 400 }} />
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <ChartLinear data={test} style={{ width: 400, height: 400 }} />
        <ChartPie data={test1} style={{ width: 400, height: 400 }} />
        <ChartPie data={test1} style={{ width: 400, height: 400 }} />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <ChartLinear data={test} style={{ width: 400, height: 400 }} />
        <ChartPie data={test1} style={{ width: 400, height: 400 }} />
        <ChartPie data={test1} style={{ width: 400, height: 400 }} />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <ChartLinear data={test} style={{ width: 400, height: 400 }} />
        <ChartPie data={test1} style={{ width: 400, height: 400 }} />
        <ChartPie data={test1} style={{ width: 400, height: 400 }} />
      </Box>
    </Box>
  );
};

export default Dashboard;
