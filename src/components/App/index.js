import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import './style.css'
import Home from '../../pages/Home'
import Characters from '../../pages/Characters'
import NotFound from '../../pages/NotFound';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/characters/:id",
    element: <Characters />
  },
  {
    path: '*',
    element: <NotFound />
  },
])



const App = () => {
  return <RouterProvider router={router} />
}

export default App;
