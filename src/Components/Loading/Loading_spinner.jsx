import React from 'react'
import './Loading_style.css'
import favicon from './favicon.png'

export default function Loading_spinner() {
  return (
    <div>
         <div className='loading_main_div'>
         <img src={favicon} alt="" className="loder_spinner" />
        
    </div>
    </div>
  )
}
