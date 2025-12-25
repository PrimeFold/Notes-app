import { Save, Loader2 } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"
import api from "../lib/axios.js"
import { useNavigate } from 'react-router'
import Navbar from "../components/Navbar"
import { Link } from 'react-router-dom'


const CreatePage = () => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required")
      return;
    }

    setLoading(true)

    try {
      await api.post("/notes", { title, content })
      toast.success("Note created Successfully..")
      setLoading(false)
      navigate("/")

    } catch (error) {

      if (error.response.status === 429) {
        toast.error("Slow down kid..", { duration: 4000, icon: "❌" })
      }

      console.log(error)


    }


  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto p-4 mt-6">
        <div className="max-w-3xl mx-auto">
          <div className="card bg-base-100 shadow-xl border border-base-content/5">
            <div className="card-body p-8 lg:p-10">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-base-content mb-2">
                  Create New Note
                </h1>
                <p className="text-base-content/60">
                  Capture your thoughts, ideas, and reminders.
                </p>
              </div>

              <div className="space-y-6">
                {/* Title Input */}
                <div className="form-control">
                  <label htmlFor="title" className="label">
                    <span className="label-text font-semibold">Title</span>
                    <span className="label-text-alt text-base-content/50">Required</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Meeting Notes, Project Ideas, Shopping List..."
                    className="input input-bordered input-lg w-full focus:input-primary"
                  />
                </div>

                {/* Content Textarea */}
                <div className="form-control">
                  <label htmlFor="content" className="label">
                    <span className="label-text font-semibold">Content</span>
                    <span className="label-text-alt text-base-content/50">
                      {content.length} characters
                    </span>
                  </label>
                  <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Start writing your note here..."
                    className="textarea textarea-bordered w-full h-80 leading-relaxed text-base focus:textarea-primary resize-none"
                  ></textarea>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-6 border-t border-base-content/10">
                  <button
                    onClick={() => {
                      setTitle("")
                      setContent("")
                      navigate("/")
                    }}
                    className="btn btn-ghost"
                  >
                    
                      Cancel
                    
                    
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="btn btn-primary gap-2 min-w-40"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Creating...</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        <span>Create Note</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePage