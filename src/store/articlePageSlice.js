import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  pageData: {},
  loading: false,
  error: false,
}

export const getPage = createAsyncThunk('articles/getPage', async (slug, { rejectWithValue, dispatch }) => {
  try {
    const response = await fetch(`https://api.realworld.io/api/articles/${slug}`)

    if (!response.ok) {
      throw new Error('Get articles list error', response.status)
    }

    const article = await response.json()

    dispatch(setPageData(article.article))
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const articlePageSlice = createSlice({
  name: 'articlePage',
  initialState,
  reducers: {
    setPageData: (state, action) => {
      state.pageData = action.payload
    },
  },
  extraReducers: {
    [getPage.fulfilled]: (state) => {
      state.loading = false
    },
    [getPage.pending]: (state) => {
      state.loading = true
    },
    [getPage.rejected]: (state) => {
      state.loading = false
      state.error = true
    },
  },
})

export const { setPageData } = articlePageSlice.actions

export default articlePageSlice.reducer
