'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState(new Set())
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setVisible(prev => new Set([...prev, e.target.id])) })
    }, { threshold: 0.15 })
    document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
  return <div>GarageOS</div>
}
