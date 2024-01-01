import List from "./pages/list/List";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Update from "./pages/update/Update"
import {
  BrowserRouter,
  Routes,
  Route,
}from "react-router-dom"
import New from "./pages/new/New";
import Files from "./pages/files/Files";
import ProtectedRoutes from "./components/ProtectedRoutes";



function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
  <Route path="/" element={<Login />} />
  <Route  element={<ProtectedRoutes />}>
    <Route path="/home" element={<Home />} />
    <Route exact path="/list/:userId" element={<List />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/new" element={<New />} />
    <Route path="/employe/:employeeId" element={<Update />} />
    <Route path="/files" element={<Files />} />
  </Route>
</Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
