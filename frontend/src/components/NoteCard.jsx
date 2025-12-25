import { Trash2, CalendarDays } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import api from '../lib/axios.js'


const NoteCard = ({ note }) => {
    const navigate = useNavigate();

    const handleDelete = async (e) => {
        e.stopPropagation(); // Stop navigation to note page

        if (!window.confirm("Are you sure you wish to delete this note?")) return;

        try {
            await api.delete(`/notes/${note._id}`)
            window.location.reload()
        } catch (error) {
            console.error("Error deleting note:", error)
        }
    }

    const handleCardClick = () => {
        navigate(`/note/${note._id}`);
    }


    return (
        <div className='group relative'>
            <div
                onClick={handleCardClick}
                className='card bg-base-100 shadow-sm hover:shadow-xl transition-all duration-300 border border-base-content/5 hover:border-primary/20 hover:-translate-y-1 h-60 overflow-hidden cursor-pointer'
            >
                <div className='card-body p-6'>
                    {/* Header */}
                    <div className='mb-2'>
                        <h3 className='card-title text-xl font-bold text-base-content tracking-tight mb-1 group-hover:text-primary transition-colors line-clamp-1'>
                            {note.title}
                        </h3>
                        <div className='flex items-center gap-2 text-xs text-base-content/50 font-medium uppercase tracking-wider'>
                            <CalendarDays className='size-3' />
                            {new Date(note.createdAt).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                            })}
                        </div>
                    </div>

                    {/* Content Preview */}
                    <p className='text-base-content/70 text-sm leading-relaxed line-clamp-4'>
                        {note.content}
                    </p>

                    {/* Gradient Overlay for text fade */}
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-base-100 to-transparent pointer-events-none group-hover:from-base-100/80 transition-all" />

                    {/* Actions - absolute positioned to stay on top */}
                    <div className='absolute bottom-4 right-4 flex items-center gap-2 z-20'>
                        <button
                            className='btn btn-circle btn-sm btn-ghost hover:bg-error/10 text-base-content/60 hover:text-error transition-colors tooltip tooltip-left'
                            data-tip="Delete Note"
                            onClick={handleDelete}
                        >
                            <Trash2 className='size-4' />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoteCard