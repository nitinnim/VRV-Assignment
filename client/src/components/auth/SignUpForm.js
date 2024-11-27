import React, { useState } from 'react'
import { toast } from "react-hot-toast"

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signup } from '../../services/operations/authAPI'
// import { setSignupData } from '../../../slices/authSlice'

const SignUpForm = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Form Data
  const [formData, setFormData] = useState(
    {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    }
  )
  const {firstName, lastName, email, password, confirmPassword} = formData;

  // show/hide password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // on input field changes
  function handleOnChange(e) {
    setFormData( (prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }) )
  }

  // on form submit
  function handleOnSubmit(e) {

    e.preventDefault();
    // console.log(formData, "-formData")

    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match")
      return
    }

    dispatch(signup(firstName, lastName, email, password, navigate));
    
    // Reset
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    })

  }

  return (
    <div className='text-richblack-5'>
    
      {/* form */}
      <form onSubmit={handleOnSubmit} className='flex w-full flex-col gap-y-4'>

        <div className='flex lg:flex-row flex-col mt-5 gap-4'>

          <label htmlFor="firstName">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              First Name <sup className='text-pink-200'>*</sup>
            </p>
            <input 
              required
              type="text" 
              placeholder='Enter first name'
              name='firstName'
              value={firstName}
              onChange={handleOnChange}
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            />
          </label>
          <label htmlFor="firstName">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Last Name <sup className='text-pink-200'>*</sup>
            </p>
            <input 
              required
              type="text" 
              placeholder='Enter last name'
              name='lastName'
              value={lastName}
              onChange={handleOnChange}
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            />
          </label>

        </div>

        <label htmlFor="email">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Email Address <sup className='text-pink-200'>*</sup>
            </p>
            <input 
              required
              type="email" 
              placeholder='Enter email address'
              name='email'
              value={email}
              onChange={handleOnChange}
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            />
        </label>

        <div className='flex lg:flex-row flex-col gap-4'>

          <label htmlFor="password" className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Create Password <sup className='text-pink-200'>*</sup>
            </p>
            <input 
              required
              type={showPassword ? "text" : "password"} 
              placeholder='Enter Password'
              name='password'
              value={password}
              onChange={handleOnChange}
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            />

            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className={`absolute right-3 top-[38px] z-10 cursor-pointer`} >
              {
                showPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )
              }
            </span>

          </label>
          <label htmlFor="confirmPassword" className='relative'>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Confirm Password <sup className='text-pink-200'>*</sup>
            </p>
            <input 
              required
              type={showConfirmPassword ? "text" : "password"} 
              placeholder='Confirm Password'
              name='confirmPassword'
              value={confirmPassword}
              onChange={handleOnChange}
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className={`absolute right-3 top-[38px] z-10 cursor-pointer`} >
              {
                showConfirmPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )
              }
            </span>
          </label>

        </div>

        <button
          type="submit"
          className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
        >
          Create Account
        </button>

      </form>
      <p className="text-richblack-50 text-sm mt-2">Have an account? <span className="text-blue-100 underline cursor-pointer" onClick={() => navigate("/login")}>Login</span> </p>

    </div>
  )
}

export default SignUpForm
