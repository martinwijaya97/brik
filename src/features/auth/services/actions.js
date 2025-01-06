export const setToken = async (store, { token }) => {
  console.log('MARTIN', store, token);
  localStorage.setItem('token', token);

  const auth = { ...store.state.auth, token };
  store.setState({ auth });
};

export const clearAuthCache = async (store) => {
  localStorage.removeItem('token');

  const auth = { ...store.state.auth, token: null };
  store.setState({ auth });
};
