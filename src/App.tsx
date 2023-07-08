import './style/App.css'
import Music from './components/Music'
import Menu from './components/Menu'  
import { useEffect, useReducer, useState } from 'react'
import loadContent from './utils/loadContent'

interface action {
  type: string,
  payload?: any
}

interface state {
  current: number
}





function reducer(state: state, action: action) {
  switch (action.type) {

    case 'next':
      return { ...state, current: state.current + 1 }
    case 'prev':
      if(state.current === 0) return state
      return { ...state, current: state.current - 1 }
    default:
      return state
  }
}


function App() {

  const [musics, setMusics] = useState([
    {
      name: 'Chill Lofi Mix',
      musicId: 'CLeZyIID9Bo',
      image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2FCLeZyIID9Bo%2Fmaxresdefault.jpg&f=1&nofb=1&ipt=22a2d190bdb7c5c23bc4b434d01ca0c50bcacf702f6997a7150a9b7ee567d095&ipo=images'
    },
    {
      name: 'Lofi Jazz',
      musicId: 'NJuSStkIZBg',
      image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2FNJuSStkIZBg%2Fmaxresdefault.jpg&f=1&nofb=1&ipt=22a2d190bdb7c5c23bc4b434d01ca0c50bcacf702f6997a7150a9b7ee567d095&ipo=images'
    }
  ])
  
  const [state, dispatch] = useReducer(reducer, { current: 0 } as state) // as state is used to tell typescript that the object is of type state

  const [music, setMusic] = useState(musics[state.current])

  useEffect(() => {
    
    const musicsTmp = loadContent()
    
    setMusics(musicsTmp)
    


    
    if(state.current > musics.length - 1){
      dispatch({type: 'prev'})
      return;
    }

    setMusic(musics[state.current])

  }, [state.current])





  

  
  return (
    <div className="App">
    
      <Music name={music.name} musicId={music.musicId} image={music.image}/>

      <Menu dispatch={dispatch} />

    </div>
  )
}

export default App
