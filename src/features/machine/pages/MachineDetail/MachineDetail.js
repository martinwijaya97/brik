import React, { useEffect, useState } from 'react';
import { useParams, Link as LinkRouter, useLocation } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

import FeatureDetail from '../../../../core/components/FeatureDetail';

const MachineDetail = () => {
  const location = useLocation();
  const { machine } = location.state || {};
  const { id } = useParams();
  const dispatch = useDispatch();
  // const [machine, setMachine] = useState({});

  console.log('MARITN', machine);

  useEffect(() => {
    const loadData = async () => {
      // const response = await dispatch(MachineAction.getMachineDetail({ id }));
      // const response = data.find((row) => row.machine_id === id);
      // console.log('MARITN', data);
      // if (!!response) {
      // setMachine(data[0]);
      // }
    };
    loadData();
  }, [id, dispatch]);

  const renderBreadcrumbs = () => {
    return (
      <Breadcrumbs aria-label='breadcrumb'>
        <Link component={LinkRouter} color='inherit' to='/machines'>
          Machine
        </Link>
        <Typography color='textPrimary'>{id}</Typography>
      </Breadcrumbs>
    );
  };

  const renderRoomText = (room) => {
    const result = room?.map((row) => {
      return (
        <Typography>
          • {row?.room_code} - {row?.room_name} - {row?.plant_code}
        </Typography>
      );
    });

    return result;
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {renderBreadcrumbs()}
      <Box sx={{ flex: 1, marginTop: 2 }}>
        <FeatureDetail
          title='Machine Detail'
          row={machine}
          headers={[
            { displayName: 'ID', key: 'machine_id' },
            { displayName: 'Name', key: 'machine_name' },
            { displayName: 'Model', key: 'machine_model' },
            { displayName: 'sub_instrument', key: 'sub_instrument_code' },
            { displayName: 'Room', key: 'room' },
            { displayName: 'Image', key: 'image', type: 'image' },
            { displayName: 'Created By', key: 'createdBy' },
            { displayName: 'Updated By', key: 'updatedBy' },
            { displayName: 'Created At', key: 'createdAt' },
            { displayName: 'Updated At', key: 'updatedAt' },
          ]}
          renderFunctions={{
            room: (row) => {
              return renderRoomText(row?.room);
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default MachineDetail;
