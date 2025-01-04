import { Route, Routes } from "react-router-dom"
import HomePage from "./page/HomePage"
import { ToastContainer } from "react-toastify"
import UpdateTodo from "./page/UpdateTodo"
import LoginScreen from "./page/LOginScreen"
import SignUpScreen from "./page/SignupScreen"

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/update/:id" element={<UpdateTodo />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/" element={<SignUpScreen />} />
        <Route path="*" element={<LoginScreen />} />
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App