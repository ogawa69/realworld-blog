import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  pageData: {},
  confirm: false,
  edited: false,
  loading: false,
  error: false,
  deleted: false,
  status: null,
}

export const getPage = createAsyncThunk('articlePage/getPage', async (slug, { rejectWithValue, dispatch }) => {
  try {
    const response = await fetch(`https://api.realworld.io/api/articles/${slug}`)

    if (!response.ok) {
      dispatch(setStatus(response.status))
      throw new Error('Get articles list error', response.status)
    }

    const article = await response.json()
    console.log(article.article)
    dispatch(setPageData(article.article))
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const updateArticle = createAsyncThunk(
  'articlePage/editArticle',
  async (data, { rejectWithValue, dispatch }) => {
    const token = localStorage.getItem('token')
    const { slug } = data

    try {
      const response = await fetch(`https://api.realworld.io/api/articles/${slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          article: { title: data.title, description: data.description, body: data.body, tagList: data.tagList },
        }),
      })

      if (!response.ok) {
        throw new Error('Get articles list error', response.status)
      }

      const article = await response.json()

      dispatch(setEditedSlug(article.article.slug))
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const deleteArticle = createAsyncThunk(
  'articlePage/deleteArticle',
  async (slug, { rejectWithValue, dispatch }) => {
    const token = localStorage.getItem('token')
    try {
      const response = await fetch(`https://api.realworld.io/api/articles/${slug}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Token ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error('Delete article error', response.status)
      }

      dispatch(setDeletedSlug(slug))
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const articlePageSlice = createSlice({
  name: 'articlePage',
  initialState,
  reducers: {
    setPageData: (state, action) => {
      state.pageData = action.payload
    },
    setStatus: (state, action) => {
      state.status = action.payload
    },
    setEditedSlug: (state, action) => {
      state.edited = action.payload
    },
    setDeletedSlug: (state, action) => {
      state.deleted = action.payload
    },
  },
  extraReducers: {
    [getPage.fulfilled]: (state) => {
      state.confirm = true
      state.loading = false
    },
    [getPage.pending]: (state) => {
      state.loading = true
    },
    [getPage.rejected]: (state) => {
      state.loading = false
      state.error = true
    },
    [updateArticle.fulfilled]: (state) => {
      state.edited = true
      state.loading = false
    },
    [updateArticle.pending]: (state) => {
      state.loading = true
    },
    [updateArticle.rejected]: (state) => {
      state.loading = false
      state.error = true
    },
    [deleteArticle.fulfilled]: (state) => {
      state.deleted = true
      state.loading = false
    },
    [deleteArticle.pending]: (state) => {
      state.loading = true
    },
    [deleteArticle.rejected]: (state) => {
      state.loading = false
      state.error = true
    },
  },
})

export const { setPageData, setStatus, setEditedSlug, setDeletedSlug } = articlePageSlice.actions

export default articlePageSlice.reducer
