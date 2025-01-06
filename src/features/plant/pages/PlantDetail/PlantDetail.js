import React, { useEffect, useState } from 'react';
import { useParams, Link as LinkRouter, useNavigate, useLocation } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

import FeatureDetail from '../../../../core/components/FeatureDetail';
// import { PlantAction } from '../../../../redux/actions/PlantAction';
import { Button } from '@mui/material';
import MachineList from '../../../machine/pages/MachineList/MachineList';

const PlantDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { plant } = location.state || {};
  const { id } = useParams();
  const dispatch = useDispatch();
  // const [plant, setPlant] = useState({});

  console.log('MARITN', plant);

  useEffect(() => {
    const loadData = async () => {
      // const response = await dispatch(PlantAction.getPlantDetail({ id }));
      // const response = data.find((row) => row.plant_id === id);
      // console.log('MARITN', data);
      // if (!!response) {
      // setPlant(data[0]);
      // }
    };
    loadData();
  }, [id, dispatch]);

  const renderBreadcrumbs = () => {
    return (
      <Breadcrumbs aria-label='breadcrumb'>
        <Link component={LinkRouter} color='inherit' to='/plants'>
          Plant
        </Link>
        <Typography color='textPrimary'>{id}</Typography>
      </Breadcrumbs>
    );
  };

  const renderRooms = (rooms) => {
    const result = rooms.map((row) => {
      return (
        <Typography>
          • {row?.room_code} - {row?.room_name} - {row?.plant_code}
        </Typography>
      );
    });

    return result;
  };

  const renderMachines = (machines) => {
    const result = machines.map((row) => {
      return (
        // <Link
        //   to={`/machines/${row?.id}`} // Navigate to the DetailsPage with a dynamic parameter
        //   style={{ color: 'inherit' }} // Link styling
        // >
        // <Typography
        //   style={{ color: '#1E90FF', textDecoration: 'underline' }}
        //   onClick={() => {
        //     navigate(`/plants/${row.plant_code}`, { plant: row });
        //   }}
        // >
        //   • {row?.machine_name} - {row?.sub_instrument_code}
        // </Typography>

        // <Button component={LinkRouter} to='/plants/create'>
        <Typography
          style={{ color: '#1E90FF', textDecoration: 'underline', cursor: 'pointer' }}
          onClick={() => {
            navigate(`/machines/${row.machine_code}`, { machine: row });
          }}
        >
          • {row?.machine_name} - {row?.sub_instrument_code}
        </Typography>
        // </Button>

        // </Link>
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
      <Box sx={{ flex: 1, marginTop: 2, marginBottom: 4 }}>
        <FeatureDetail
          title='Plant Detail'
          row={plant}
          headers={[
            { displayName: 'code', key: 'plant_code' },
            { displayName: 'Name', key: 'plant_name' },
            { displayName: 'Rooms', key: 'rooms' },
            { displayName: 'Machines', key: 'machines' },
            { displayName: 'Created By', key: 'createdBy' },
            { displayName: 'Updated By', key: 'updatedBy' },
            { displayName: 'Created At', key: 'createdAt' },
            { displayName: 'Updated At', key: 'updatedAt' },
          ]}
          renderFunctions={{
            rooms: (row) => {
              return renderRooms(row.rooms);
            },
            machines: (row) => {
              return renderMachines(row.machines);
            },
          }}
        />
      </Box>
      <MachineList />
    </Box>
  );
};

export default PlantDetail;
