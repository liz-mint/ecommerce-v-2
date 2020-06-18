import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className="flex justify-end px-8 border-t-2 border-grey-500">
      <Link to="/logs">Logs</Link>
    </div>
  )
}

export default Footer
