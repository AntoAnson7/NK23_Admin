import {UploadForm} from './componets/UploadForm'
import {UpdateForm} from './componets/UpdateForm'

import {BrowserRouter as Router,Routes,Route,Link} from 'react-router-dom'

function App() {


  return (
    <div className="App">

      <Router>
        <Link to={"/upload"}>Upload</Link>
        <Link to={"/update"}>Update</Link>
        <Routes>
          <Route path={"/upload"} element={<UploadForm/>}/>
          <Route path={"/update"} element={<UpdateForm/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
