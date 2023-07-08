import musics from '../musics/musics'

// This function is used to load the content from the musics.ts file
// The goal is to make the code more readable and easier to maintain
// Thus we can change the content of the musics.ts file without having to change the code in the Home.tsx file
// If needed it is also possible to load the content from an API

function loadContent() {
    return musics
}

export default loadContent