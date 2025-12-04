import { useNavigate } from 'react-router'
import Cloud from './assets/cloud1.png'
import Navbar from "./components/Navbar"
import Button from './components/ui/Button';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen bg-linear-to-b from-blue-400 to-blue-50 flex flex-col items-center justify-center gap-8 px-3 overflow-hidden">
      <img 
        src={Cloud} 
        className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen opacity-50 pointer-events-none' 
      />
      <h1 className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-[150px] sm:text-[300px] md:text-[400px] font-black pointer-events-none text-blue-50/60'>404</h1>

      <Navbar />
      
      <p className="pt-80 sm:pt-0 sm:mt-30 relative z-10 text-3xl sm:text-4xl md:text-6xl text-center font-extrabold tracking-wide text-blue-400/90">
        that page doesn't exist, i think?
      </p>

      <Button className='relative z-10' onClick={() => navigate('/')}>
        Back to Home
      </Button>
    </div>
  )
}

export default NotFound
