'use client'

import Lottie from 'lottie-react'

import movieLoadingAnimation from '../../assets/lottie/movie-loading.json'

export default function LoadingAnimation() {
  return <Lottie animationData={movieLoadingAnimation} loop className="w-52" />
}
