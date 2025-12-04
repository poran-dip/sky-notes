import Logo from '../assets/logo.png'

const Navbar = () => {
  const handleLogout = () => {
    alert('Logged out!')
  }

  return (
    <div className="fixed top-0 left-0 right-0 w-screen h-12 sm:h-16 md:h-20 flex items-center justify-between py-1 md:py-2 px-1 sm:px-2 md:px-6">
      <a href="/">
        <div className="flex items-center gap-1 sm:gap-2 cursor-pointer hover:-translate-y-1 hover:scale-105 transition-all duration-200">
          <img src={Logo} className='h-8 sm:h-12 md:h-16 w-8 sm:w-12 md:w-16' />
          <p className='text-lg sm:text-2xl md:text-3xl font-black text-blue-50'>SkyNotes</p>
        </div>
      </a>

      <div className='flex items-center pr-1 md:pr-2'>
        <button 
          className='py-1 px-4 md:px-6 rounded-4xl text-sm sm:text-lg md:text-xl font-medium bg-blue-50 text-blue-400 shadow-md shadow-black/20 cursor-pointer inset-shadow-[0_-2px_4px] inset-shadow-blue-900/50 hover:inset-shadow-[0_-4px_6px] hover:inset-shadow-blue-400/50 transition-all duration-200'
          onClick={handleLogout}
        >
          Log Out
        </button>
      </div>
    </div>
  )
}

export default Navbar
