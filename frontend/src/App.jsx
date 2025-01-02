import { Route, Routes } from "react-router-dom"
import HomePage from "./page/HomePage"
import { ToastContainer } from "react-toastify"
import UpdateTodo from "./page/UpdateTodo"

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/update/:id" element={<UpdateTodo />} />
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App