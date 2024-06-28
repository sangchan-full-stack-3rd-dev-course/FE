import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type TUserAction = {
    email : string,
    id : string
}

const initialState = {
    email : '',
    id : '',
};

const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {
        setUser : (state, action : PayloadAction<TUserAction>) => {
            state.email = action.payload.email;
            state.id = action.payload.id;
        },
        removeUser :(state) => {
            state.email = '';
            state.id = '';
        },
    }
})

export const { setUser, removeUser  } = userSlice.actions;
export const userReducer = userSlice.reducer;