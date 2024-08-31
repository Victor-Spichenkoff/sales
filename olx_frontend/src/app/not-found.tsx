"use client"

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Custom404() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/')
    }, 5000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl text-gray-600 mb-6">Página não encontrada</h2>
      <p className="text-lg text-gray-500">Você será redirecionado</p>
      <div className="mt-10">
        <a
          href="/"
          className="text-blue-500 underline text-lg hover:text-blue-700"
        >
          Voltar à página inicial
        </a>
      </div>
    </div>
  )
}
