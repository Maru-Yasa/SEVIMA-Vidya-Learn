import { Toaster } from "react-hot-toast"

/* eslint-disable react/prop-types */
function App({children}) {

  return (
    <div className="bg-gray-50 flex justify-center pt-5 sm:mx-0">
      {children}
      <Toaster />
    </div>
  )
}

export default App
