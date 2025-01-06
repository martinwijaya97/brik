import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import useGlobal from 'globalStore';
import { unregisterNotificationDeviceToken } from 'features/myNotification/services/api';

const Logout = () => {
  const navigate = useNavigate();

  // const authActions = useGlobal(
  //   (state) => state.auth,
  //   (actions) => actions.auth
  // )[1];
  // const employeeActions = useGlobal(
  //   (state) => state.employee,
  //   (actions) => actions.employee
  // )[1];

  // useEffect(() => {
  //   unregisterNotificationDeviceToken().then(() => {
  //     navigate('/');
  //     employeeActions.clearEmployeeCache();
  //     authActions.clearAuthCache();
  //   });
  // }, [employeeActions, authActions, history]);

  return (
    <>
      <p>Logging out...</p>
    </>
  );
};

export default Logout;
