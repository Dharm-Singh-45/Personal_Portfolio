import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const messagesSlice = createSlice({
  name: "messages",
  initialState: {
    loading: false,
    messages: [],
    error: null,
    message: null,
  },
  reducers: {
    getAllMessageRequest(state, action) {
      state.messages = [];
      state.error = null;
      state.loading = true;
    },
    getAllMessageSuccess(state, action) {
      state.messages = action.payload;
      state.error = null;
      state.loading = false;
    },
    getAllMessageFailed(state, action) {
      state.messages = [];
      state.error = action.payload;
      state.loading = false;
    },
    deleteMessageRequest(state, action) {
      state.messages = null;
      state.error = null;
      state.loading = true;
    },
    deleteMessageSuccess(state, action) {
      state.messages = action.payload;
      state.error = null;
      state.loading = false;
    },
    deleteMessageFailed(state, action) {
      state.messages =null;
      state.error = action.payload;
      state.loading = false;
    },
    resetMessageSlice(state,action){
      state.error = null
      state.messages = state.messages
      state.message = null
      state.loading= false
    },
    clearAllErrors(state, action) {
      state.error = null;
      state.messages = state.messages;
    },
  },
});

export const getAllMessages = () => async (dispatch) => {
  dispatch(messagesSlice.actions.getAllMessageRequest());
  try {
    const { data } = await axios.get(
      "http://localhost:4000/api/v1/message/getAll",
      { withCredentials: true }
    );
    dispatch(messagesSlice.actions.getAllMessageSuccess(data.messages));
  } catch (error) {
    dispatch(
      messagesSlice.actions.getAllMessageFailed(error.response.data.message)
    );
  }
};

export const deleteMessage = (id) => async(dispatch)=>{
  dispatch(messagesSlice.actions.deleteMessageRequest())

  try {
    const {data} = await axios.delete(`http://localhost:4000/api/v1/message/delete/${id}`,{withCredentials:true})
    dispatch(messagesSlice.actions.deleteMessageSuccess(data.message))
    dispatch(messagesSlice.actions.clearAllErrors())
   } catch (error) {
    dispatch(messagesSlice.actions.deleteMessageFailed(error.response.data.message))
    
  }
}

export const clearAllMessageErrors = () => (dispatch) =>{
  dispatch(messagesSlice.actions.clearAllErrors())
}

export const resetMessageSlice = () => (dispatch) =>{
  dispatch(messagesSlice.actions.resetMessageSlice())
}



export default messagesSlice.reducer;
