import { Spin } from 'antd'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'

import { loginAccount } from '../../store/loginSlice'
import Error from '../Error'

import style from './Login.module.scss'

const Login = () => {
  const dispatch = useDispatch()
  const loginState = useSelector((state) => state.login)
  const { isLogged, loading, error } = loginState

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: 'onBlur' })

  const onSubmit = (data) => {
    dispatch(loginAccount(data))
  }

  if (isLogged) {
    return <Redirect to={'/'}></Redirect>
  }

  if (loading) {
    return <Spin style={{ marginTop: 300 }}></Spin>
  }

  if (error) {
    return <Error></Error>
  }

  const dataErr = error ? 'Email or password is invalid.' : null

  return (
    <div className={style.login}>
      <span className={style.login__title}>Sign In</span>
      <form className={style.login__form} onSubmit={handleSubmit(onSubmit)}>
        <label className={style.login__label} htmlFor="email">
          <span>Email address</span>
          <input
            className={style.login__input}
            {...register('email', {
              required: 'Email field is required.',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address.',
              },
            })}
            type="text"
            id="email"
            placeholder="Email address"
          ></input>
          <span className={style['login__error']}>{errors?.email && errors?.email?.message}</span>
        </label>
        <label className={style.login__label} htmlFor="password">
          <span>Password</span>
          <input
            className={style.login__input}
            {...register('password', {
              required: 'Password field is required.',
            })}
            type="text"
            id="password"
            placeholder="Password"
          ></input>
          <span className={style['login__error']}>{errors?.password && errors?.password?.message}</span>
        </label>
        <span className={style['login__error']}>{dataErr}</span>
        <button className={style.login__submit} type="submit">
          Login
        </button>
      </form>
      <span className={style.login__reg}>
        Already have an account?{' '}
        <Link className={style['login__sign-up']} to={'/sign-up'}>
          Sign Up
        </Link>
        .
      </span>
    </div>
  )
}

export default Login
