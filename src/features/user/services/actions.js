export const setUser = async (store, userObj, userRoles, userPermissions) => {
  localStorage.setItem('user', JSON.stringify(userObj));
  localStorage.setItem('userRoles', JSON.stringify(userRoles));
  localStorage.setItem('userPermissions', JSON.stringify(userPermissions));

  const user = {
    ...store.state.user,
    user: userObj,
    userRoles,
    userPermissions,
  };
  store.setState({ user });
};

export const clearUserCache = async (store) => {
  localStorage.removeItem('user');
  localStorage.removeItem('userRoles');
  localStorage.removeItem('userPermissions');

  const user = {
    ...store.state.user,
    user: null,
    userRoles: [],
    userPermissions: [],
  };
  store.setState({ user });
};
