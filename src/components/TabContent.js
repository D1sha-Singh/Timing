import React, { useState } from 'react'
import Timer from './Timer'
import { useSelector } from 'react-redux'
import "../../src/styles/TabContent.css"

const TabContent = () => {
    const timers = useSelector((store) => store?.timer?.timers)
    const categories = useSelector((store) => store?.category?.categories)
    const [shouldStart, setShouldStart] = useState(false);
    const [catChild, setCatChild] = useState('');
    const [selected, setSelected] = useState(categories?.[0]?.category)

    const setAllTimers = (category) => {
        setCatChild(category)
        setShouldStart(true)
    }

    const renderTimers = () => {
        const filteredtimers = timers?.filter((item, index) => item?.category === selected)
        console.log(filteredtimers)
        return filteredtimers?.map((item, index) => {
            console.log(item)
            return (
                <div className='timersList'>
                    <Timer duration={item.duration} category={item.category} name={item.name} shouldStart={shouldStart} catChild={catChild} />
                </div>
            )
        })
    }

    return (
        <div className='mainDiv'>
            <div className='navbar'>
                {categories?.map((category, index) => (
                    <div className={`navItem ${selected === category?.category ? 'selected-tab' : ''}`}>
                        <span onClick={() => setSelected(category?.category)}>{category?.category}</span>
                        <div className='button'>
                            <button onClick={() => setAllTimers(category?.category)}>start all</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className='timersBox'>
                {renderTimers()}
            </div>
        </div>

    )
}

export default TabContent