import loginImg from '../assets/login.webp'
import React from 'react'
import Template from '../components/auth/Template'

const LoginPage = () => {
  return (
    <Template
        title='Welcome Back'
        description1="Build skills for today, tomorrow, and beyond."
        description2="Education to future-proof your career."
        image={loginImg}
        formType="login"
    />
  )
}

export default LoginPage
