import {Routes, Route} from "react-router-dom";
import DetailScreen from "./pages/detail/detail_screen";
import DashboardScreen from "./pages/dashboard/dashboard_screen";
function App() {
  return (
      <div>
        <Routes>
          <Route path="/" element={<DashboardScreen/>}/>
          <Route path="/detail/:id" element={<DetailScreen/>}/>
        </Routes>
      </div>
  )
}

export default App;
