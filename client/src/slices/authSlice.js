import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    token: localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null,
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    loading: false,
    signupData: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setSignupData(state, value) {
            state.signupData = value.payload
        },
        setLoading(state, value) {
            state.loading = value.payload
        },
        setUser(state, value) {
            state.user = value.payload
        },
        setToken(state, value) {
            // console.log("state -> " , state , " value -> " , value);
            state.token = value.payload
        }
    }
})

export const {setLoading, setToken, setSignupData, setUser} = authSlice.actions;
export default authSlice.reducer;