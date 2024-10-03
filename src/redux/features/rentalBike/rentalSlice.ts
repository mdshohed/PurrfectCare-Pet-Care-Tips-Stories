import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  bookingId: '', 
  selectedTime: '',
  method: '', 
  dueAmount: 0
}

export const rentalSlice = createSlice({
  name: 'rental',
  initialState,
  reducers: {
    addBookingDetail: (state, action) => {
      state.bookingId = action.payload.bookingId;
      state.selectedTime = action.payload.selectedTime;
      state.method = action.payload.method;
    },
    clearBookingDetail:( state) =>{
      state.bookingId = '',
      state.selectedTime = '',
      state.method = ''
      state.dueAmount = 0
    },
    addRentalMethod: (state, action) =>{      
      state.method = action.payload.method;
      state.dueAmount = action.payload.dueAmount;
      state.bookingId = action.payload.bookingId;
    }
  },
})

export const { addBookingDetail, clearBookingDetail, addRentalMethod } = rentalSlice.actions

export default rentalSlice.reducer