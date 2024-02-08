import react from 'react';
import './card.css'
const Todo =(props)=>{



    return(
        <div className='todo'>
            {props.children}
        </div>
    )
}

export default Todo;