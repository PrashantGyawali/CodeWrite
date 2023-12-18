import React from 'react'
import downloadAll from '../assets/downloadAll.svg'

export default function DownloadAll({onClickfn,title}) {
  return (
<button onClick={onClickfn} title={title}>
    <img src={downloadAll} alt="Download as single HTML file" />
</button>
  )
}
