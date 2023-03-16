import React from 'react'
import Accodion from './accordion/Accodion'
import { BrowserRouter } from 'react-router-dom'
import { Route,Routes } from 'react-router-dom'
import ThankYouPage from './accordion/ThankYouPage'

export default function App() {

  const [data, setData] = React.useState(null);


  return (
    <div>
      
<BrowserRouter>
<Routes>
  <Route path='/' element={<Accodion/>}></Route>
  <Route path='/ThankYouPage' element={<ThankYouPage/>}></Route>
</Routes>
</BrowserRouter>
    </div>
  )
}
