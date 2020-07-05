import React from 'react'
import { useSelector } from 'react-redux'

const Logs = () => {
  const list = useSelector((s) => s.logs.list)
  return (
    <div>
      <nav className="flex items-center justify-between flex-wrap bg-blue-500 text-white p-6">
        <div>{list || 'nohing'}</div>
      </nav>
    </div>
  )
}

export default Logs
