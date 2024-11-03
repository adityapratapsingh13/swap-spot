"use client"
import React from 'react'
import { CldUploadWidget } from 'next-cloudinary';

const UploadImages = () => {
  return (
 
<CldUploadWidget uploadPreset="pvknlh5s">
  {({ open }) => {
    return (
      <button className='bg bg-red-600 p-4 rounded-md' onClick={() => open()}>
        Upload an Image
      </button>
    );
  }}
</CldUploadWidget>
  )
}

export default UploadImages;