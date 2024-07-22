import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: false,
  reducers: {
    setNotificationTrue: () => true,
    setNotificationFalse: () => false,
  }
});

export const { setNotificationTrue,setNotificationFalse  } = notificationSlice.actions;

export default notificationSlice.reducer;
