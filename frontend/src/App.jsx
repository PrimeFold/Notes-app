import { Routes, Route } from 'react-router'
import CreatePage from './pages/CreatePage'
import HomePage from './pages/HomePage'
import NoteDetail from './pages/NoteDetail'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/create' element={<CreatePage />} />
        <Route path='/note/:id' element={<NoteDetail />} />
      </Routes>

    </div>

  )
}

export default App