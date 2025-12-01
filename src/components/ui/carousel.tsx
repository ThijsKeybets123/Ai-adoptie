import React from 'react'

export const Carousel: React.FC<any> = ({ children }) => {
  return <div>{children}</div>
}
export const CarouselContent: React.FC<any> = ({ children }) => <div style={{display:'flex',gap:8}}>{children}</div>
export const CarouselItem: React.FC<any> = ({ children }) => <div style={{minWidth:300}}>{children}</div>
export const CarouselNext: React.FC<any> = () => <button>Next</button>
export const CarouselPrevious: React.FC<any> = () => <button>Prev</button>

export default Carousel
