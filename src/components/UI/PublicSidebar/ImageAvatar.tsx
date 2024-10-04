'use server'

import Image from 'next/image'
import React from 'react'

export const ImageAvatar = ({img}:{img:string}) => {
  return (
    <div>
      <Image src={img} alt={img} className="w-[30px] me-4" />
    </div>


  )
}
