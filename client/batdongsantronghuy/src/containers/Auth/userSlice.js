import userAPI from '../../api/userAPI';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const register = createAsyncThunk('user/register', async (payload) => {
  // call API to register
  const data = await userAPI.register(payload);

  // save data to local storage
  localStorage.setItem('access_token', data.message);
  localStorage.setItem('user', JSON.stringify(data.data));

  // return user data
  return data.data;
});

export const login = createAsyncThunk('user/login', async (payload) => {
  // call API to register
  const data = await userAPI.login(payload);

  // save data to local storage
  localStorage.setItem('access_token', data.data.jwToken);
  localStorage.setItem('user', JSON.stringify(data.data));

  // return user data
  return data.data;
});
export const loginFacebook = createAsyncThunk(
  'user/loginFacebook',
  async (payload) => {
    const data = await userAPI.loginFacebook(payload);

    //save data to local storage
    localStorage.setItem('access_token', data.data.jwToken);
    localStorage.setItem('user', JSON.stringify(data.data));

    //return user data
    return data.data;
  }
);
const userSlice = createSlice({
  name: 'user',
  initialState: {
    current: {},
    settings: {},
  },
  reducers: {
    logout(state) {
      //clear local storage
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');

      state.current = {};
    },
  },
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.current = {
        url: action.payload,
      };
    },
    [login.fulfilled]: (state, action) => {
      state.current = {
        user: action.payload,
      };
    },
    [loginFacebook.fulfilled]: (state, action) => {
      state.current = {
        user: action.payload,
      };
    },
  },
});

const { actions, reducer } = userSlice;
export const { logout } = actions;
export default reducer;
