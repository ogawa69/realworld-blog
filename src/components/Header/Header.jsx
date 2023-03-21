import React from 'react'
import { Link } from 'react-router-dom'

import style from './Header.module.scss'

const Header = () => {
  return (
    <div className={style.header}>
      <Link to="/" className={style.header__name}>
        Realworld Blog
      </Link>
      <div className={style.header__actions}>
        <a className={style.header__login}>Sign In</a>
        <a className={style.header__reg}>Sign Up</a>
      </div>
    </div>
  )
}

export default Header
