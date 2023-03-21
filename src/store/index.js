import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

import articlePageSlice from './articlePageSlice'
import articleSlice from './articleSlice'

const middleware = getDefaultMiddleware({
  immutableCheck: false,
  serializableCheck: false,
  thunk: true,
})

const store = configureStore({
  reducer: {
    articles: articleSlice,
    articlePage: articlePageSlice,
  },
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
})

export default store
