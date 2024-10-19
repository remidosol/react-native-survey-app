import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addUserApi, getUserApi, loginApi } from "../../api/authApi";
import { AuthState, LoginRequest, User } from "../../types/auth";

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  username: null,
  userId: null,
  status: "idle",
  error: null,
};

export const addUser = createAsyncThunk("users/addUser", async (user: User) => {
  const response = await addUserApi(user);
  return response;
});

export const getUser = createAsyncThunk("users/getUser", async (id: number) => {
  const response = await getUserApi(id);
  return response;
});

export const login = createAsyncThunk("auth/login", async (loginPayload: LoginRequest) => {
  const response = await loginApi(loginPayload);
  return response;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.username = null;
      state.userId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userId = action.payload.id;
      })
      .addCase(addUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to add user";
      })
      .addCase(getUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userId = action.payload.id;
        state.username = action.payload.username;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to get user";
      })
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to log in";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
