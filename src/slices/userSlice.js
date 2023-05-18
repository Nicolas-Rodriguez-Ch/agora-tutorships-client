import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axios";

// Safe localStorage functions
const getLocalStorage = (key) => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(key);
  }
  return null;
};

const setLocalStorage = (key, value) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, value);
  }
};

const removeLocalStorage = (key) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};

// Async thunks
export const getUserData = createAsyncThunk(
  "user/getUserData",
  async (token) => {
    const response = await axios.get("/login", { params: { token } });
    return response.data;
  }
);

export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }, { dispatch, getState }) => {
    const response = await axios.post("/login", { email, password });
    dispatch(getUserData(response.data.token));
    return response.data;
  }
);

export const register = createAsyncThunk(
  "user/register",
  async ({ type, inputs }) => {
    const response = await axios.post("/register", { type, inputs });
    return response.data;
  }
);

const initialState = {
  token: getLocalStorage("token") || null,
  currentUser: {
    _id: null,
    name: null,
    type: null,
    profile_photo: null,
    email: null,
    focus: null,
    description: null,
    schedule: null,
    price: null,
  },
  login_failed: false,
  auth_status: "loading",
  emailIsTaken: false,
  isProfileTooltipCollapsed: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      removeLocalStorage("token");
      state.token = null;
      state.currentUser = {};
      state.login_failed = false;
      state.auth_status = "unauthorized";
    },
    toggleProfileTooltip: (state) => {
      state.isProfileTooltipCollapsed = !state.isProfileTooltipCollapsed;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.auth_status = "loading";
        setLocalStorage("token", action.payload.token);
      })
      .addCase(login.rejected, (state) => {
        state.login_failed = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.auth_status = "loading";
        setLocalStorage("token", action.payload.token);
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.token = getLocalStorage("token");
        state.currentUser = action.payload.userData;
        state.auth_status = "authorized";
      })

      .addCase(getUserData.rejected, (state) => {
        state.auth_status = "unauthorized";
      });
  },
});

export const { logout, toggleProfileTooltip } = userSlice.actions;

export default userSlice.reducer;
