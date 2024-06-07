import React from 'react'
import './PageHeading.css' 

function PageHeading({ children}) {
  return (
    <div className='title-page'>
      <h1>{children}</h1>
    </div>
  )
}

export default PageHeading