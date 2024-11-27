import loginImg from '../assets/login.webp'
import React from 'react'
import Template from '../components/auth/Template'

const LoginPage = () => {
  return (
    <Template
        title='Welcome Back'
        description1="Empower your success – every day is a new opportunity."
        description2="Your work drives our future. Let’s achieve together!"
        image={loginImg}
        formType="login"
    />
  )
}

export default LoginPage
