import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage.tsx'
import TestPage from './pages/TestPage.tsx'
import ResultPage from './pages/ResultPage.tsx'
import ShareAll from './pages/ShareAll.tsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage/>,
    errorElement: <HomePage/>
  },
  {
    path: "/test/:emailAddress",
    element: <TestPage/>
  },
  {
    path: "/result/:emailAddress",
    element: <ResultPage/>
  },
  {
    path: "/share",
    element: <ShareAll/>
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
