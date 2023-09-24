import React from 'react'

//#####################################################//
//########### COMPONENTS ARE RESPONSIVE: N/A ##########//
//#####################################################//

function HighlightText({text,color}) {
  return (
    <span className={`${color=='orange'&&'customGradient-orange'} ${color=='red'&&'customGradient-red'} customGradient whitespace-pre-line`}>
      {text}
    </span>
  )
}

export default HighlightText
