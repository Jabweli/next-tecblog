import React from 'react'

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-[80vh]">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-black/50 border-dashed rounded-full animate-[spin_2s_linear_infinite]"/>
        <div className="inset-0 flex items-center justify-center mt-3">
          <span className="text-black/50 font-semibold">Loading...</span>
        </div>
      </div>
    </div>
  )
}

export default LoadingSpinner;