import { cn } from '@/lib/utils'
import React, { SVGProps } from 'react'

interface IAppIconProps extends SVGProps<SVGSVGElement> {
  src: string
}

function AppIcon(props: IAppIconProps) {
  const { src, className = '', viewBox, width = 16, height = width } = props

  return (
    <svg
      width={width}
      height={height}
      viewBox={viewBox}
      className={cn('pointer-events-none size-full duration-300', className)}
    >
      <use href={src} width={width} height={height} />
    </svg>
  )
}

export default AppIcon
