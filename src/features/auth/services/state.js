const authState = {
  token: localStorage.getItem('token') || '',
  expToken: localStorage.getItem('expToken') || '',
};

export default authState;
