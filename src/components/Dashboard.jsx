import React from 'react'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  return (
    <div>
      <p>This is the Dashboard</p>
      <Link to="/product">Go to products</Link>
      </div>
  )
}


