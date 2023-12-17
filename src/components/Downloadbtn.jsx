import React from 'react'
import downloadIcon from '../assets/downloadIcon.svg'

export default function ({onClickfn}) {
  return (
<button onClick={onClickfn}>
    <img src={downloadIcon} alt="download" />
</button>
  )
}
