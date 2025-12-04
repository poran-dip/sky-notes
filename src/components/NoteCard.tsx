import { truncateString } from "../utils/truncateString"
import { timeAgo } from "../utils/truncateString"

interface NoteProps {
  title: string
  author: string
  content: string
  sharedAt: Date
}

const NoteCard = ({ title, author, content, sharedAt }: NoteProps) => {
  return (
    <div className="relative z-10 h-48 flex flex-col items-center justify-between border border-blue-100/80 bg-linear-to-r from-blue-50/20 to-blue-100/20 shadow-lg shadow-blue-900/20 rounded-2xl cursor-pointer hover:-translate-y-2 transition-all duration-200 overflow-hidden">
      <div className="p-2 flex-1 flex flex-col items-center justify-center">
        <p className="font-black text-xl text-blue-600 text-center">{truncateString(title, 30)}</p>
        <p className="text-sm text-blue-900/80 text-center">{truncateString(content, 120)}</p>
      </div>
      <div className="w-full px-2 py-1 flex items-center justify-between bg-blue-50/80">
        <p className="text-sm text-blue-900/80">{author}</p>
        <p className="text-sm text-blue-900/80">{timeAgo(sharedAt)}</p>
      </div>
    </div>
  )
}

export default NoteCard
