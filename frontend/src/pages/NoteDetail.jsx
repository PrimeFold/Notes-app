import { useNavigate, useParams } from 'react-router-dom'
import api from '../lib/axios.js'
import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { ChevronLeft, Save, Trash2 } from 'lucide-react'

const NoteDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)

  // Fetch note details
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`)
        setTitle(res.data.title)
        setContent(res.data.content)
      } catch (error) {
        toast.error("Failed to load note details")
      }
    }

    fetchNote()
  }, [id])

  const deleteNote = async (e) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }

    if (!window.confirm("Are you sure you want to delete this note?")) {
      return
    }

    try {
      await api.delete(`/notes/${id}`)
      toast.success("Note deleted Successfully")
      navigate("/")
    } catch (error) {
      toast.error("Failed to delete note")
    }
  }

  // Update note
  const handleUpdate = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required")
      return
    }

    setLoading(true)

    try {
      await api.put(`/notes/${id}`, { title, content })
      toast.success("Note updated successfully")
      navigate("/")
    } catch (error) {
      toast.error("Failed to update note")

      if (error.response?.status === 429) {
        toast.error("Too many requests")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-base-200/30">
      <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">

        {/* Header / Back Button */}
        <div className="max-w-2xl mx-auto mb-6 flex justify-between items-center">
          <button
            onClick={() => navigate("/")}
            className="btn btn-ghost gap-2 px-2 hover:bg-base-content/5 -ml-2"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="font-medium">Back to Home</span>
          </button>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="card bg-base-100 shadow-xl border border-base-content/5 w-full">
            <div className="card-body p-8 lg:p-10">

              <h2 className="text-2xl font-bold mb-8 text-base-content tracking-tight">
                Note Details
              </h2>

              <div className="space-y-6">
                {/* Title */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-semibold uppercase text-xs tracking-widest text-base-content/50">Title</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full input-lg font-bold"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter note title"
                  />
                </div>

                {/* Content */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-semibold uppercase text-xs tracking-widest text-base-content/50">Content</span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered w-full h-80 resize-none text-base leading-relaxed"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Enter note content"
                  />
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center pt-6 border-t border-base-content/5 mt-4">
                  <button
                    type="button"
                    onClick={deleteNote}
                    className="btn btn-error btn-outline px-6 gap-2"
                    disabled={loading}
                  >
                    <Trash2 className="w-5 h-5" />
                    <span className="hidden sm:inline">Delete</span>
                  </button>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => navigate("/")}
                      className="btn btn-ghost px-6"
                      disabled={loading}
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      className="btn btn-primary px-8 gap-2"
                      onClick={handleUpdate}
                      disabled={loading}
                    >
                      {loading ? (
                        <span className="loading loading-spinner loading-sm"></span>
                      ) : (
                        <Save className="w-5 h-5" />
                      )}
                      <span>{loading ? "Saving..." : "Save Changes"}</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default NoteDetail