import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/User";
interface TInitialState {
  user: User | null;
}

const initialState: TInitialState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
