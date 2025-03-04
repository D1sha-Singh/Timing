import React from 'react'
import { useSelector } from 'react-redux'
import '../styles/History.css'

const History = () => {
    const timers = useSelector((store) => store?.timer?.completedTimers || [])

    return (
        <div>
            <h1>Itihas gawah hai-</h1>
            {timers.map((item, index) => (
                <div className="card" key={index.toString()}>
                    <div className="card-header">
                        <span className="check-icon">✔</span>
                        <h3>Timer Completed</h3>
                    </div>
                    <div className="card-content">
                        <p><strong>Name:</strong> {item.name || ''}</p>
                        <p><strong>Category:</strong> {item.category || ''}</p>
                        <p><strong>Duration:</strong> {item.duration || ''} seconds</p>
                    </div>
                </div>
            ))}

        </div>
    )
}

export default History