import React from 'react'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'

import heart from '../../assets/Vector.svg'

import style from './Article.module.scss'

const Article = ({ author, slug, createdAt, favoritesCount, description, tagList, title, isPage = false }) => {
  if (!author) {
    return null
  }
  const { image, username } = author

  const tags = tagList.map((el) => {
    return (
      <span key={el} className={style.article__tag}>
        {el}
      </span>
    )
  })

  const cutOverview = (string) => {
    if (string) {
      const arr = string.split(' ')
      const res = arr.reduce((acc, cur) => (acc.length < 230 ? acc + ' ' + cur : acc))
      return res.length < 230 ? res : res + ' ...'
    }
  }

  const formatDate = format(new Date(createdAt), 'MMMM d, yyyy')

  return (
    <div className={style.article}>
      <div className={style.article__wrap}>
        <div className={style['article__left-side']}>
          <div className={style['article__left-wrapper']}>
            <Link to={`/articles/${slug}`} className={style.article__title}>
              {title}
            </Link>
            <button className={style.article__likes} disabled={true}>
              <img src={heart}></img>
              {favoritesCount}
            </button>
          </div>
          <div className={style.article__tags}>{tags}</div>
        </div>
        <div className={style['article__right-side']}>
          <div className={style['article__right-wrapper']}>
            <span className={style.article__name}>{username}</span>
            <span className={style.article__date}>{formatDate}</span>
          </div>
          <img className={style.article__img} src={image}></img>
        </div>
      </div>
      <span className={style.article__text}>{isPage ? description : cutOverview(description)}</span>
    </div>
  )
}

export default Article
