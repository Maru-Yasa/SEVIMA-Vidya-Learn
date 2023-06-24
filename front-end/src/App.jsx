import { Toaster } from "react-hot-toast"

/* eslint-disable react/prop-types */
function App({children}) {

  return (
    <div className="bg-gray-50">
      {children}
      <Toaster />
    </div>
  )
}

export default App
