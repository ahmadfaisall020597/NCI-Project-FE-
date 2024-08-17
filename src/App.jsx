import './App.css'
import { RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider } from 'react-bootstrap';
import { router } from './utils/router/objectRouter';


const App = () => {

  const render = () => {
    try {
      console.log('masuk router')
      return (
        <RouterProvider router={router} />
      )
    } catch (error) {
      console.log('error')
    }
  }
  return (
    <ThemeProvider>
      <div className="mx-auto h-100 justify-content-center d-flex width-mobile overflow-hidden">
        {render()}
      </div>
    </ThemeProvider>
  )
}

export default App;
