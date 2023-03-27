import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  articleData: {},
  completed: false,
  loading: false,
  error: false,
}

export const createArticle = createAsyncThunk(
  'create/createArticleSlice',
  async (data, { rejectWithValue, dispatch }) => {
    const token = localStorage.getItem('token')
    try {
      const response = await fetch('https://api.realworld.io/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ article: data }),
      })

      if (!response.ok) {
        const error = await response.json()
        dispatch(setErrorData(error.errors))
        console.log(error)
        throw new Error('Create error', error.status)
      }

      const articleData = await response.json()

      dispatch(setArticleData(articleData.article))
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const createArticleSlice = createSlice({
  name: 'create',
  initialState,
  reducers: {
    setArticleData: (state, action) => {
      state.articleData = action.payload
      state.completed = true
    },
    setErrorData: (state, action) => {
      state.error = action.payload
    },
  },
  extraReducers: {
    [createArticle.fulfilled]: (state) => {
      state.loading = false
    },
    [createArticle.pending]: (state) => {
      state.loading = true
    },
    [createArticle.rejected]: (state) => {
      state.loading = false
    },
  },
})

export const { setArticleData, setErrorData } = createArticleSlice.actions

export default createArticleSlice.reducer
