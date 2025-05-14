import { useState } from 'react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { CreateContentModal } from '../components/ui/CreateContentModal'
import { PlusIcon } from '../icons/PlusIcon'
import { ShareIcon } from '../icons/ShareIcon'
import { SideBar } from '../components/ui/SideBar'
import { useContent } from '../hooks/useContent'
import { ShareBrain } from '../components/ui/ShareBrain'

export function Dashboard() {
  const [selectedType, setSelectedType] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [shareBrain, setShareBrain] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<Content | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { contents, fetchContent, deleteContent } = useContent();

  const filteredContents = contents.filter(note =>
    (selectedType === "all" || note.type === selectedType) && (
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.tag?.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
    ))

  return (
    <div>
      <SideBar selectedType={selectedType} onSelect={(type) => setSelectedType(type)} />
      <div className='p-4 ml-72 min-h-screen bg-gray-100 border-2'>
        <CreateContentModal open={modalOpen} onClose={() => {
          setModalOpen(false)
          setNoteToEdit(null)
        }} fetchContent={fetchContent}
          noteToEdit={noteToEdit}
        />
        <ShareBrain open={shareBrain} onClose={() => {
          setShareBrain(false)
        }} />

        <div className='flex justify-end gap-4'>
          <div>
            <input type='text' placeholder='Search by title or tag...' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="border rounded p-2 w-full" />
          </div>
          <Button variant="primary" text="Add content" startIcon={<PlusIcon />} onClick={() => {
            setModalOpen(true);
          }} />
          <Button variant="secondary" text="Share Brain" startIcon={<ShareIcon />} onClick={() => {
            setShareBrain(true);
          }} />
        </div>
        <div className='flex gap-4 ml-24 mt-4 flex-wrap'>
          {filteredContents.length === 0 ? (
            <div className="text-gray-500 text-center w-full mt-8">
              📭 No notes found.
            </div>
          ) : (filteredContents
            .map((note) => <Card
            key={note._id}
            id={note._id}
            type={note.type}
            link={note.link}
            title={note.title}
            tag={note.tag}
            onDelete={deleteContent}
            onEdit={() => {
              setNoteToEdit(note);
              setModalOpen(true);
            }}
          />))}
        </div>
      </div>
    </div>
  )
}

