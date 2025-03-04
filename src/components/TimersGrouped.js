import React, { useState } from 'react'
import { useSelector } from 'react-redux'
// import { useDispatch } from 'react-redux'
import AddTimerForm from './AddTimerForm'
import "../../src/styles/TimersGrouped.css"
import TabContent from './TabContent'
import { useNavigate } from 'react-router-dom'
// import { removeCategory } from '../app/categoriesSlice'

const TimersGrouped = () => {
    const completedTimers = useSelector((store) => store?.timer?.completedTimers)
    const [openForm, setOpenForm] = useState(false)
    const navigate = useNavigate();
    // const dispatch = useDispatch();


    // const remove = (category) => {
    //     // dispatch(removeCategory({ category: category }))
    // }

    return (
        <div className='main'>
            <div className='grouped'>
                <div className='header'>
                    <div>
                        <h1>TimersGrouped</h1>
                        <button onClick={() => setOpenForm(!openForm)}>Add Timer</button>
                    </div>
                    <div className='tooltip'>
                        <button onClick={() => navigate('/history')} disabled={completedTimers.length === 0}>View Completed Timers</button>
                        <div className='completed'>{completedTimers.length} completed timers</div>
                    </div>

                </div>
                <TabContent />
            </div>
            {openForm && (
                <div className='addTimerForm'>
                    <AddTimerForm openForm={openForm} setOpenForm={setOpenForm} />
                </div>
            )}
        </div>

    )
}

export default TimersGrouped