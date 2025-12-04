import Cloud from './assets/cloud1.png'
import Navbar from './components/Navbar'
import NotesList from './components/NotesList'

function App() {
  return (
    <div className="relative h-screen bg-linear-to-b from-blue-400 to-blue-50">
      <img 
        src={Cloud} 
        className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen opacity-50 pointer-events-none' 
      />

      <Navbar />
      <NotesList />
    </div>
  )
}

export default App
