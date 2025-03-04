import React, { useCallback, useState } from 'react'
import Timer from './Timer'
import { useSelector } from 'react-redux'
import "../../src/styles/TabContent.css"
import NoTimersView from './NoTimersView'

const TabContent = () => {
    const timers = useSelector((store) => store?.timer?.timers || [])
    const categories = useSelector((store) => store?.category?.categories || [])
    const [shouldStart, setShouldStart] = useState(false);
    const [catChild, setCatChild] = useState('');
    const [selected, setSelected] = useState(categories?.[0]?.category || '')

    const setSelectedCat = (cat) => {
        setSelected(cat)
        setShouldStart(false)
    }

    const setAllTimers = (category) => {
        setCatChild(category)
        setShouldStart(true)
    }

    const renderTimers = useCallback(() => {
        const filteredtimers = timers?.filter(item => item?.category === selected)
        return filteredtimers?.map((item, index) => {
            return (
                <div className='timersList' key={index.toString()}>
                    <Timer duration={item.duration} category={item.category} name={item.name} shouldStart={shouldStart} catChild={catChild} />
                </div>
            )
        })
    }, [selected, shouldStart, catChild, timers])

    if (categories.length === 0) return <NoTimersView />

    return (
        <div className='mainDiv'>
            <div className='navbar'>
                {categories?.map((category, index) => (
                    <div className={`navItem ${selected === category?.category ? 'selected-tab' : ''}`} key={index.toString()}>
                        <span onClick={() => setSelectedCat(category?.category)}>{category?.category}</span>
                        <div className='button'>
                            <button onClick={() => setAllTimers(category?.category)} disabled={selected !== category?.category}>Start All</button>
                            {/* <button onClick={() => setAllTimers(category?.category, false)}>Pause All</button> */}
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