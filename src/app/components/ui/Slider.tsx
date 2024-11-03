import React, { useState } from 'react'

interface SliderProps {
  min?: number
  max?: number
  step?: number
  value: number[]
  onValueChange: (value: number[]) => void
  className?: string
}

export function Slider({ 
  min = 0, 
  max = 100, 
  step = 1, 
  value, 
  onValueChange, 
  className = '' 
}: SliderProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onValueChange([Number(event.target.value)])
  }

  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value[0]}
      onChange={handleChange}
      className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer ${className}`}
    />
  )
}