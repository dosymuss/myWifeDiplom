import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { createBrowserRouter, RouterProvider } from "react-router-dom"
import HomePage from './pages/HomePage/HomePage.jsx'
import SearchPage from './pages/SearchPage/SearchPage.jsx'
import ProfilePage from './pages/ProfilePage/ProfilePage.jsx'
import EditProfilePage from './pages/EditProfilePage/EditProfilePage.jsx'
import TaskPage from './pages/TaskPage/TaskPage.jsx'
import CompanyProfile from './pages/CompanyProfile/CompanyProfile.jsx'
import CreateTaskPage from './pages/CreateTaskPage/CreateTaskPage.jsx'
import InternList from './pages/InternList/InternList.jsx'
import TaskList from './pages/TaskList/TaskList.jsx'
import LoginPage from './pages/LoginPage/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage/RegisterPage.jsx'
import HrProfile from './pages/HrProfile/HrProfile.jsx'
import EditHrCompany from './pages/EditHrCompany/EditHrCompany.jsx'
import CreateWorkersProfile from './pages/CreateWorkersProfile/CreateWorkersProfile.jsx'
import InternSuperSign from './pages/InternSuperSign/InternSuperSign.jsx'
import SuperProfile from './pages/superProfile/SuperProfile.jsx'
import EditSuper from './pages/EditSuper/EditSuper.jsx'



const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/register",
    element: <RegisterPage />
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/worker-sign",
    element: <InternSuperSign />
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "/search",
        element: <SearchPage />
      },
      {
        path: "/profile",
        element: <ProfilePage />
      },
      {
        path: "/edit-profile",
        element: <EditProfilePage />
      },
      {
        path: "/task/:id",
        element: <TaskPage />
      },
      {
        path: "/profile-company",
        element: <CompanyProfile />
      },
      {
        path: "/create-task",
        element: <CreateTaskPage />
      },
      {
        path: "/intern-list",
        element: <InternList />
      },
      {
        path: "/task-list",
        element: <TaskList />
      },
      {
        path: "/hr_profile",
        element: <HrProfile />
      },
      {
        path: "/edit-hr",
        element: <EditHrCompany />
      },
      {
        path: "/create-worker",
        element: <CreateWorkersProfile />
      },
      {
        path: "/super-profile",
        element: <SuperProfile />
      },
       {
        path: "/edit-super",
        element: <EditSuper />
      },
    ]
  }
])


createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}>
    <StrictMode>
      <App />
    </StrictMode>
  </RouterProvider>,
)
