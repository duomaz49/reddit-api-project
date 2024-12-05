import './App.css'
import routes from "./routes.tsx";
import {RouterProvider} from "react-router-dom";

function App() {
  return (
      <RouterProvider router={routes} />
  )
}

export default App
