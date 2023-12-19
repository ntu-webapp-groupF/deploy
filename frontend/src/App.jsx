import { BrowserRouter, Routes, Route } from "react-router-dom"

import UserLayout from "./layout/UserLayout"
import BaseLayout from "./layout/BaseLayout"
import EditLayout from './layout/EditLayout'

import MemberPage from "./pages/MemberPage"
import ReadPage from './pages/ReadPage'
import StartPage from './pages/StartPage'
import PurchasePage from './pages/PurchasePage'
import ErrorPage from './pages/ErrorPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<StartPage />} />
        <Route path='/users/*' element={<UserLayout />} />
        <Route path='/member' element={<MemberPage />} />
        <Route path='/books/*' element={<BaseLayout />} />
        <Route path='/reads' element={<ReadPage />} />
        <Route path='/edit/*' element={<EditLayout />} />
        <Route path='/purchase' element={<PurchasePage />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

// / -> Start Page

// /users/* -> UserLayout
// /users/login -> UserLayout | login page
// /users/register -> UserLayout | register page

// /member -> MemberPage

// /books/* -> BaseLayout
// /books/  -> MainPage
// /books/filter -> FilterPage


// /reads -> ReadPage

// /edit/* -> EditLayout
// /edit/profile -> EditPage
// /edit/book -> UploadPage (create book)

// /purchase -> PurchasePage