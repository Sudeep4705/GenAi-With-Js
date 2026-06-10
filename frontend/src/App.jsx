import { BrowserRouter, Route, Routes } from "react-router-dom"
import UserLayout from "./Layouts/UserLayout"
import Hero from "./Pages/Hero"


function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<UserLayout/>}>
        <Route index element={<Hero/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
