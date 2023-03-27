import { Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useParams } from 'react-router-dom'

import { getPage } from '../../store/articlePageSlice'
import CreateArticle from '../CreateArticle/CreateArticle'
import Error from '../Error'

const EditArticle = () => {
  const dispatch = useDispatch()
  const { slug } = useParams()
  const { pageData, edited, error, confirm } = useSelector((state) => state.articlePage)
  const [complete, setComplete] = useState(false)
  const [prevArticleData, setPrevArticleData] = useState()

  useEffect(() => {
    if (!confirm) {
      dispatch(getPage(slug))
    } else {
      setPrevArticleData({
        title: pageData.title,
        description: pageData.description,
        body: pageData.body,
        tagList: pageData.tagList.map((el) => ({ value: el })),
      })
      setComplete(true)
    }
  }, [confirm])

  if (!complete) {
    return <Spin style={{ marginTop: 300 }}></Spin>
  }

  if (edited) {
    return <Redirect to={`/articles/${edited}/`}></Redirect>
  }

  if (error) {
    return <Error></Error>
  }

  return <CreateArticle isEdit={true} prevArticleData={prevArticleData}></CreateArticle>
}

export default EditArticle
