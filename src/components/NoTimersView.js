import React from 'react'
import '../styles/NoTimersView.css'

const NoTimersView = () => {
    return (
        <div className="empty-timer-container">
            <img src="https://media0.giphy.com/media/x8fDRq0B7qeh1s4Nha/200w.gif?cid=6c09b952ec2gzki8r5xyxebrp0zl8u0zx10qct0ik69d05cb&ep=v1_gifs_search&rid=200w.gif&ct=g" alt="No timers" className="fun-animation" />
            <div className='innerContainer'>
                <h2>Tick-Tock! No timers yet.</h2>
                <p>Set up a new timer and take control of your tasks!</p>
                <p>WHAT!!!</p>
                <p>uSe tHe bUtToN aBoVe</p>
            </div>
        </div>
    )
}

export default NoTimersView