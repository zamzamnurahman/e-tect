import {Routes, Route} from 'react-router-dom';
import DashboardScreen from './pages/dashboard/dashboard_screen';
import DetailUserScreen from './pages/user/detail_user_screen';
import EngagementScreen from "./pages/engagement/engagement_screen";

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<DashboardScreen/>}/>
                <Route path="/detail/:id" element={<DetailUserScreen/>}/>
                <Route path="/engagement/:userId" element={<EngagementScreen/>}/>
            </Routes>
        </div>
    );
}

export default App;
