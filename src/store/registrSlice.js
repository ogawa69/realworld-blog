import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  error: false,
  errorData: {},
}

export const registrAccount = createAsyncThunk(
  'registr/registrAccount',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch('https://api.realworld.io/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ user: data }),
      })

      if (!response.ok) {
        const error = await response.json()
        dispatch(setErrorData(error.errors))
        throw new Error('Registration error', error.status)
      }

      const user = await response.json()

      localStorage.setItem('token', user.user.token)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const registrSlice = createSlice({
  name: 'registr',
  initialState,
  reducers: {
    setErrorData: (state, action) => {
      state.errorData = action.payload
    },
  },
  extraReducers: {
    [registrAccount.fulfilled]: (state) => {
      state.loading = false
    },
    [registrAccount.pending]: (state) => {
      state.loading = true
    },
    [registrAccount.rejected]: (state) => {
      state.loading = false
      state.error = true
    },
  },
})

export const { setErrorData } = registrSlice.actions

export default registrSlice.reducer
