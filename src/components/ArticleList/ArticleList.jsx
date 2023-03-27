import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Pagination, Spin } from 'antd'

import { getArticles, setPage } from '../../store/articleSlice'
import Article from '../Article'

const ArticleList = () => {
  const dispatch = useDispatch()
  const articles = useSelector((state) => state.articles.articles)
  const loading = useSelector((state) => state.articles.loading)
  const error = useSelector((state) => state.articles.error)
  const currPage = useSelector((state) => state.articles.currPage)

  useEffect(() => {
    dispatch(getArticles())
  }, [])

  const createArticles = (array) => {
    return array.map(({ slug, ...data }) => {
      return <Article key={slug} slug={slug} {...data} />
    })
  }

  if (loading) {
    return <Spin style={{ marginTop: 300 }}></Spin>
  }

  if (error) {
    return () => dispatch(getArticles())
  }

  return (
    <>
      {createArticles(articles)}
      <Pagination
        style={{ marginLeft: 'auto', marginRight: 'auto', marginBottom: 20 }}
        defaultCurrent={currPage}
        onChange={(page) => {
          dispatch(setPage(page))
          dispatch(getArticles(page))
        }}
        total={50}
      ></Pagination>
    </>
  )
}

export default ArticleList
