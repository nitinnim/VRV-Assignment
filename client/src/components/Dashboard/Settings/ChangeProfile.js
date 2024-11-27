import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IconBtn from '../../common/IconBtn'
import { FiUpload } from 'react-icons/fi'
import { updateDisplayPicture } from '../../../services/operations/SettingsApi'

const ChangeProfile = () => {

  const { token, user } = useSelector((state) => state.auth)
  // console.log("User - ", user)
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [previewSource, setPreviewSource] = useState(null)
  
  const fileInputRef = useRef(null)

  const handleClick = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    // console.log(file)
    if (file) {
      setImageFile(file)
      previewFile(file)
    }
  }

  const previewFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }

  const handleFileUpload = () => {
    try {
      // console.log("uploading...")
      setLoading(true)
      const formData = new FormData()
      formData.append("displayPicture", imageFile)
      // console.log("formdata", formData)
      dispatch(updateDisplayPicture(token, formData)).then(() => {
        setLoading(false)
      })
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

  useEffect(() => {
    if (imageFile) {
      previewFile(imageFile)
    }
  }, [imageFile])


  return (
    <div>
        <div className='flex justify-center md:justify-start rounded-lg bg-richblack-800 px-12 py-8 items-center'>
          {/* left */}
          <div className='flex md:flex-row flex-col gap-5 justify-between items-center'>
            <div className=''>
              <img 
                src={previewSource || user?.image} 
                className='aspect-square object-cover rounded-full w-20'
                alt={` ${user?.firstName} + " " + ${user?.lastName}`} 
              />
            </div>
            <div className='flex md:items-start items-center flex-col gap-3'>
              <p className='font-semibold'>Change Profile Picture</p>
              <div className='flex gap-4 items-center'>

                {/* input file */}
                <input 
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className='hidden'
                    accept="image/png, image/gif, image/jpeg"
                />
                <button
                    onClick={handleClick}
                    disabled={loading}
                    className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
                >
                    Select
                </button>

                <IconBtn
                    text={loading ? "Uploading..." : "Upload"}
                    type={'submit'}
                    onclick={handleFileUpload}
                >
                    {!loading && (
                    <FiUpload className="text-lg text-richblack-900" />
                    )}
                </IconBtn>

              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default ChangeProfile
