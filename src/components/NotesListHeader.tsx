import SearchIcon from '../assets/search.png'

const NotesListHeader = () => {
  return (
    <div className="h-12 md:h-16 w-full px-5 md:px-8 flex items-center justify-between border-b-2 border-blue-100/40">
      <div className="relative w-120">
        <img src={SearchIcon} className='absolute left-2 md:left-3 h-3 md:h-4 w-3 md:w-4 top-1/2 -translate-y-1/2 opacity-70 pointer-events-none'/>
        <input id="search" className="w-full h-6 md:h-8 rounded-2xl border-2 pl-6 md:pl-8 pr-2 border-blue-100/70 focus:border-blue-50/90 focus:outline-0 text-white placeholder-blue-100/70" placeholder='Search...' />
      </div>
      

      <div>

      </div>
    </div>
  )
}

export default NotesListHeader
