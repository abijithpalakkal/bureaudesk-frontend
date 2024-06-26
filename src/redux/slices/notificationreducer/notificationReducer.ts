import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: false,
  reducers: {
    setNotificationTrue: (state) => true,
    setNotificationFalse: (state) => false,
  }
});

export const { setNotificationTrue,setNotificationFalse  } = notificationSlice.actions;

export default notificationSlice.reducer;
