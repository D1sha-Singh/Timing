import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTimer } from '../app/timersSlice';
import { addCategory } from '../app/categoriesSlice';
import "../../src/styles/AddTimerForm.css"

const AddTimerForm = ({ openForm, setOpenForm }) => {
    const categories = useSelector((store) => store?.category?.categories || [])
    const dispatch = useDispatch();

    const categoriesList = categories?.map(item => item.category) || [];

    function addNewTimer(formData) {
        const name = formData.get('name');
        const category = formData.get('category');
        const duration = formData.get('duration');

        dispatch(addTimer({
            name,
            category,
            duration
        }));
        if (categoriesList.indexOf(category) === -1) dispatch(addCategory({ category: category }));
        setOpenForm(false);
    }

    return (
        <div className='formMain'>
            <h2>AddTimer</h2>
            <form action={addNewTimer}>
                <div className='formFields'>
                    <label>Name:    
                        <input type='text' name='name' />
                    </label>
                    <label>Category:
                        <input type='text' name="category" />
                    </label>
                    <label>Duration:
                        <input type='text' name="duration" />
                    </label>
                </div>
                <button type='Submit'>Submit</button>
            </form>
        </div>
    )
}

export default AddTimerForm