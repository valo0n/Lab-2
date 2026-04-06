import { useState } from 'react'
import DescriptionBar from './components/navbar/DescriptionBar'
import SearchBar from './components/navbar/SearchBar'
import NavPart from './components/navbar/NavPart'
import Breadcrumb from './components/navbar/Breadcrumb'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="w-full font-sans">
      <DescriptionBar />
      <SearchBar />
      <NavPart />
      <Breadcrumb />
      
      {/* Rest of your page content would go here */}
      <div className="max-w-7xl mx-auto p-8 text-center text-gray-400">
        Page Content Area
      </div>
    </div>
    </>
  )
}

export default App
