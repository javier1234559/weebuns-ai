import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  id: string | null;
  name: string | null;
  email: string | null;
  avatar_img: string | null;
  accessToken: string | null;
  role: string | null;
}

const initialState: AuthState = {
  id: null,
  name: "Guest",
  email: null,
  avatar_img: null,
  accessToken: null,
  role: null,
};

interface LoginPayload {
  id: string;
  name: string;
  email: string;
  avatar_img: string | null;
  accessToken: string;
  role: string;
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginPayload>) => {
      const { id, name, email, avatar_img, accessToken, role } = action.payload;
      state.id = id;
      state.name = name;
      state.email = email;
      state.avatar_img = avatar_img;
      state.accessToken = accessToken;
      state.role = role;
    },
    updateProfile: (state, action: PayloadAction<Partial<LoginPayload>>) => {
      const { name, email, avatar_img, role } = action.payload;
      if (name) state.name = name;
      if (email) state.email = email;
      if (avatar_img) state.avatar_img = avatar_img;
      if (role) state.role = role;
    },
    logout: (state) => {
      state.id = null;
      state.name = null;
      state.email = null;
      state.avatar_img = null;
      state.accessToken = null;
      state.role = null;
    },
  },
});

export const { login, logout, updateProfile } = authSlice.actions;
export default authSlice.reducer;
