import "../style/Menu.css"
import {ChevronRight, ChevronLeft} from 'lucide-react'

const Menu = (props:{dispatch:any}) => {

    const next = () => {
        console.log('next')
        props.dispatch({type:'next'})
    };

    const prev = () => {
        console.log('prev')
        props.dispatch({type:'prev'})
    };

    return (
        <div className="menu">
            <button onClick={() => prev()}>
            <ChevronLeft size={34} color="#ffffff" strokeWidth={3} />
            </button>
            <button onClick={() => next()}>
            <ChevronRight size={34} color="#ffffff" strokeWidth={3} />
            </button>
        </div>
    )
}

export default Menu;
