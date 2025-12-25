import Navbar from "../components/Navbar"
import { useState,useEffect } from "react"
import RateLimitedUI from "../components/RateLimitedUI"
import api from "../lib/axios.js"
import NoteCard from "../components/NoteCard"
import { toast } from "react-hot-toast"

const HomePage = () => {

  const [rateLimited,setRateLimited] = useState(false)
  const [notes,setNotes] = useState([])
  const [loading,setLoading] = useState(true)

  useEffect(() => {
    const fetchNotes = async()=>{
      try {
        
        const res = await api.get('/notes')
        setNotes(res.data)
        setRateLimited(false)
        setLoading(false)


      } catch (error) {
        console.log("Error loading notes")
        if(error.response?.status=== 429){
          setRateLimited(true)
        } else {
          toast.error("Something went wrong")
        }
      } finally{
        setLoading(false)
      }
    }

    fetchNotes()
    console.log(rateLimited)
  },[])
 
  return (
    <div className="min-h-screen">
      <Navbar />
      {rateLimited && <RateLimitedUI/>}


      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && <div className="text-center text-primary py-10">Loading Notes...</div>}
        {notes.length > 0 && !rateLimited &&(
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {notes.map((note) => (
                <NoteCard key={note._id} note={note}/>
              ))}
            </div>
          </div>
        )}

      </div>


    </div>
  )
}

export default HomePage