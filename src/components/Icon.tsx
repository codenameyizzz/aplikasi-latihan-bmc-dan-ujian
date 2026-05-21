/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react'
import * as Icons from 'lucide-react'

interface IconProps {
  name: string
  className?: string
  size?: number
}

export function Icon({ name, className = '', size = 20 }: IconProps) {
  // Safe lookup for dynamic icon rendering from 'lucide-react'
  const IconComponent = (Icons as any)[name]
  
  if (!IconComponent) {
    // Fallback icon if not found
    return <Icons.HelpCircle className={className} size={size} />
  }

  return <IconComponent className={className} size={size} />
}
