import { Spin } from 'antd'
import React, { useEffect } from 'react'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import { useDispatch, useSelector } from 'react-redux'

import { getPage } from '../../store/articlePageSlice'
import Article from '../Article/Article'

import style from './ArticlePage.module.scss'

const ArticlePage = ({ slug }) => {
  const dispatch = useDispatch()
  const pageData = useSelector((state) => state.articlePage.pageData)
  const loading = useSelector((state) => state.articlePage.loading)
  const error = useSelector((state) => state.articlePage.error)

  useEffect(() => {
    dispatch(getPage(slug))
  }, [])

  if (loading && !error) {
    return <Spin style={{ marginTop: 300 }}></Spin>
  }

  return (
    <div className={style['article-page']}>
      <Article isPage={true} {...pageData}></Article>
      <ReactMarkdown className={style['article-page__body']}>{pageData.body}</ReactMarkdown>
    </div>
  )
}

export default ArticlePage
