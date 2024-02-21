import MainScreen from "./pages/main/main_screen";
import {Routes, Route} from "react-router-dom";
import DetailScreen from "./pages/detail/detail_screen";
function App() {
  return (
      <div>
        <Routes>
          <Route path="/" element={<MainScreen/>}/>
          <Route path="/detail/:id" element={<DetailScreen/>}/>
        </Routes>
      </div>
  )
}

export default App;
