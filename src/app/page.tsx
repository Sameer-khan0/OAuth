import React from 'react'
import Link from 'next/link'

const page = () => {
  return (
    <div>
      Wellcome To Next App  
      <Link href='/auth/signin' >Signin</Link>
    </div>
  )
}

export default page
