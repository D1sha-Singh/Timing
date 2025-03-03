import React, { useState } from 'react'
// import { useDispatch } from 'react-redux'
import AddTimerForm from './AddTimerForm'
import "../../src/styles/TimersGrouped.css"
import TabContent from './TabContent'
// import { removeCategory } from '../app/categoriesSlice'

const TimersGrouped = () => {
    const [openForm, setOpenForm] = useState(false)
    // const dispatch = useDispatch();


    // const remove = (category) => {
    //     // dispatch(removeCategory({ category: category }))
    // }

    return (
        <div className='main'>
            <div className='grouped'>
                <div className='header'>
                    <h1>TimersGrouped</h1>
                    <button onClick={() => setOpenForm(!openForm)}>Add Timer</button>
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