import {BrowserRouter as Router, redirect, Route, Routes} from 'react-router-dom'
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks';
import { Login, Survey, SurveyInfo } from '../pages';
import { Loader } from './index';


function App() {
  const auth = useAuth();
  console.log('auth', auth);

  if(auth.loading){
    return <Loader/>
  }

  const routes = (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/api/survey" element={auth.user ? <Survey /> : <Navigate to="/login" />}/>
      <Route path="/api/survey/:id" element={<SurveyInfo />} />
    </Routes>
  );

  return (
    <div className="App">
      <Router>
        {routes}
      </Router>
    </div>
  );
}

export default App;