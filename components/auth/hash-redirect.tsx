"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function HashRedirect() {
  const router = useRouter()
  const [processed, setProcessed] = useState(false)

  useEffect(() => {
    // Only run once
    if (processed) return
    
    // Check if there's a hash in the URL
    if (typeof window !== 'undefined' && window.location.hash) {
      console.log('Hash detected:', window.location.hash)
      
      // If the hash contains an access_token, process it
      if (window.location.hash.includes('access_token')) {
        setProcessed(true)
        console.log('Detected access_token in URL hash, redirecting to proper callback handler')
        
        try {
          // Get the full hash without the # symbol
          const hashParams = window.location.hash.substring(1)
          
          // Redirect to the callback URL with the hash params as query params
          const callbackUrl = `/auth/callback?${hashParams}`
          console.log('Redirecting to:', callbackUrl)
          
          // Use window.location for a complete page refresh rather than router.push
          // This ensures we get a fresh server component render
          window.location.href = callbackUrl
        } catch (error) {
          console.error('Error processing hash redirect:', error)
          // Just navigate to dashboard directly as a fallback
          router.push('/dashboard')
        }
      } else {
        console.log('Hash does not contain access_token')
      }
    }
  }, [router, processed])

  // This component doesn't render anything
  return null
} 