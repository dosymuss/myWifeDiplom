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
import EditTaskPage from './pages/EditTaskPage/EditTaskPage.jsx'
import AdminPage from './pages/AdminPage/AdminPage.jsx'
import EditCompany from './pages/AdminActionsPage/EditCompany/EditCompany.jsx'
import AdminCreateWorkers from './pages/AdminActionsPage/AdminCreateWorkers/AdminCreateWorlers.jsx'
import AdminSuperList from './pages/AdminActionsPage/AdminSuperList/AdminSuperList.jsx'
import AdminEditSuper from './pages/AdminActionsPage/AdminEditSuper/AdminEditSuper.jsx'
import AdminInternList from './pages/AdminActionsPage/AdminInternList/AdminInternList.jsx'
import AdminEditIntern from './pages/AdminActionsPage/AdminEditIntern/AdminEditIntern.jsx'



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
      {
        path: "/edit-task/:id",
        element: <EditTaskPage />
      },
      {
        path: "/admin",
        element: <AdminPage />
      },
      {
        path: "/edit-company/:id",
        element: <EditCompany />
      },
      {
        path: "/create-super/:id",
        element: <AdminCreateWorkers />
      },
      {
        path: "/create-intern/:id",
        element: <AdminCreateWorkers />
      },
      {
        path: "/super-list/:id",
        element: <AdminSuperList />
      },
      {
        path: "/admin-intern-list/:id",
        element: <AdminInternList />
      },
      {
        path: "/admin-edit-super/:companyId/:internId",
        element: <AdminEditSuper />
      },
      {
        path: "/admin-edit-intern/:companyId/:internId",
        element: <AdminEditIntern />
      }

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
