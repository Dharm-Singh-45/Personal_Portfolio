import { createSlice } from "@reduxjs/toolkit"; 
import axios from "axios";


const softwareApplicationSlice = createSlice({
    name:'application',
    initialState : {
        softwareApplications : [],
        loading:false,
        error:null,
        message:null
    },
    reducers:{
        getAllSoftwareApplicationsRequest(state,action){
            state.softwareApplications=[]
            state.loading=true
            state.error=null
            
        },
        getAllSoftwareApplicationsSuccess(state,action){
            state.softwareApplications=action.payload
            state.loading=false
             state.error=null
            
        },
        getAllSoftwareApplicationsFailed(state,action){
            state.softwareApplications=state.softwareApplications
            state.loading=false
             state.error=action.payload
             
        },
        addNewSoftwareApplicationRequest(state,action){
            state.loading = true
            state.error = null
            state.message = null
        },
        addNewSoftwareApplicationSuccess(state,action){
            state.loading = false
            state.error = null
            state.message = action.payload
        },
        addNewSoftwareApplicationFailed(state,action){
            state.loading = false
            state.error = action.payload
            state.message = null
        },
        deleteSoftwareApplicationRequest(state,action){
            state.loading = true
            state.error = null
            state.message = null
        },
        deleteSoftwareApplicationSuccess(state,action){
            state.loading = false
            state.error = null
            state.message = action.payload
        },
        deleteSoftwareApplicationFailed(state,action){
            state.loading = false
            state.error = action.payload
            state.message = null
        },



        resetSoftwareApplicationSlice(state,action){
            state.softwareApplications = state.softwareApplications
            state.error = null
            state.message = null
            state.loading = false
        },
        clearAllErrors(state,action){
            state.error = null
            state.softwareApplications = state.softwareApplications
        }
    }
})



export const getAllSoftwareApplications = () => async(dispatch) =>{
    dispatch(softwareApplicationSlice.actions.getAllSoftwareApplicationsRequest())
    try {
        const {data} = await axios.get('http://localhost:4000/api/v1/softwareApplication/getall',{withCredentials:true})
        dispatch(softwareApplicationSlice.actions.getAllSoftwareApplicationsSuccess(data.softwareApplication))
        dispatch(softwareApplicationSlice.actions.clearAllErrors())
    } catch (error) {
        dispatch(softwareApplicationSlice.actions.getAllSoftwareApplicationsFailed(error.response.data.message))
    }
}


export const addNewSoftwareApplication= (data) =>async(dispatch) =>{
    dispatch(softwareApplicationSlice.actions.addNewSoftwareApplicationRequest())

    try {
        const response = await axios.post('http://localhost:4000/api/v1/softwareApplication/add',data,{withCredentials:true,headers:{"Content-Type":"multipart/form-data"}})
        dispatch(softwareApplicationSlice.actions.addNewSoftwareApplicationSuccess(response.data.message))
        dispatch(softwareApplicationSlice.actions.clearAllErrors())
    } catch (error) {
        dispatch(softwareApplicationSlice.actions.addNewSoftwareApplicationFailed(error.response.data.message))
    }

}



export const deleteSoftwareApplication= (id) => async (dispatch) => {
   
    dispatch(softwareApplicationSlice.actions.deleteSoftwareApplicationRequest());
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/v1/softwareApplication/delete/${id}`,
        {
          withCredentials: true,
        }
      );
      dispatch(
        softwareApplicationSlice.actions.deleteSoftwareApplicationSuccess(response.data.message)
      );
      dispatch(softwareApplicationSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(
        softwareApplicationSlice.actions.deleteSoftwareApplicationFailed(error.response.data.message)
      );
    }
  };

export const clearAllSoftwareApplicationSliceErrors = () => (dispatch)=>{
    dispatch(softwareApplicationSlice.actions.clearAllErrors())
}

export const resetSoftwareApplicationSlice = () => (dispatch)=>{
    dispatch(softwareApplicationSlice.actions.resetSoftwareApplicationSlice())
}



export default softwareApplicationSlice.reducer
