import NoteCard from "./NoteCard"
import NotesListHeader from "./NotesListHeader"

const NotesList = () => {
  return (
    <div className="h-screen px-2 sm:px-8 md:px-10 lg:px-16 pt-14 sm:pt-18 md:pt-24 pb-2 sm:pb-4 md:pb-8">
      <div className="bg-white/30 shadow-lg shadow-black/30 h-full w-full rounded-2xl sm:rounded-3xl md:rounded-4xl flex flex-col overflow-hidden">
        <NotesListHeader />
        <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
          <NoteCard title="Test Note" author="Poran Dip" content="Welcome to SkyNotes!" sharedAt={new Date("2025-12-04T12:00:00")} />
          <NoteCard title="Test Note Test Note Test Note Test Note Test Note Test Note Test Note Test Note" author="Poran Dip" content="Welcome to SkyNotes! Welcome to SkyNotes! Welcome to SkyNotes! Welcome to SkyNotes! Welcome to SkyNotes! Welcome to SkyNotes! Welcome to SkyNotes! Welcome to SkyNotes!" sharedAt={new Date("2025-12-04T12:00:00")} />
          <NoteCard title="Test Note" author="Poran Dip" content="Welcome to SkyNotes!" sharedAt={new Date("2025-12-04T12:00:00")} />
          <NoteCard title="Test Note" author="Poran Dip" content="Welcome to SkyNotes!" sharedAt={new Date("2025-12-04T12:00:00")} />
          <NoteCard title="Test Note" author="Poran Dip" content="Welcome to SkyNotes!" sharedAt={new Date("2025-12-04T12:00:00")} />
          <NoteCard title="Test Note" author="Poran Dip" content="Welcome to SkyNotes!" sharedAt={new Date("2025-12-04T12:00:00")} />
          <NoteCard title="Test Note" author="Poran Dip" content="Welcome to SkyNotes!" sharedAt={new Date("2025-12-04T12:00:00")} />
          <NoteCard title="Test Note" author="Poran Dip" content="Welcome to SkyNotes!" sharedAt={new Date("2025-12-04T12:00:00")} />
          <NoteCard title="Test Note" author="Poran Dip" content="Welcome to SkyNotes!" sharedAt={new Date("2025-12-04T12:00:00")} />
          <NoteCard title="Test Note" author="Poran Dip" content="Welcome to SkyNotes!" sharedAt={new Date("2025-12-04T12:00:00")} />
          <NoteCard title="Test Note" author="Poran Dip" content="Welcome to SkyNotes!" sharedAt={new Date("2025-12-04T12:00:00")} />
          <NoteCard title="Test Note" author="Poran Dip" content="Welcome to SkyNotes!" sharedAt={new Date("2025-12-04T12:00:00")} />
        </div>
      </div>
    </div>
  )
}

export default NotesList
