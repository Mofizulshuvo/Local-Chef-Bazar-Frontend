import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { RouterProvider } from "react-router/dom";  
import { router } from './Routes/Router.jsx';
import { AuthContext } from './Context/AuthContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContext>
       <RouterProvider router={router} />
    </AuthContext>
  </StrictMode>
)
