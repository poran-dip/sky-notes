import Logo from '../assets/logo.png'

const Navbar = () => {
  const handleLogout = () => {
    alert('Logged out!')
  }

  return (
    <div className="fixed top-0 left-0 right-0 w-screen h-20 flex items-center justify-between py-2 px-6">
      <a href="/">
        <div className="flex items-center gap-2 cursor-pointer hover:-translate-y-1 hover:scale-105 transition-all duration-200">
          <img src={Logo} className='h-16 w-16' />
          <p className='text-3xl font-black text-blue-50'>SkyNotes</p>
        </div>
      </a>

      <div className='flex items-center pr-2'>
        <button 
          className='py-1 px-6 rounded-4xl text-xl font-medium bg-blue-50 text-blue-400 shadow-md shadow-black/20 cursor-pointer inset-shadow-[0_-2px_4px] inset-shadow-blue-900/50 hover:inset-shadow-[0_-4px_6px] hover:inset-shadow-blue-400/50 transition-all duration-200'
          onClick={handleLogout}
        >
          Log Out
        </button>
      </div>
    </div>
  )
}

export default Navbar
