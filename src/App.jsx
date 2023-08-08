import './App.css';
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Details from "./pages/Details.jsx";
import About from "./pages/About.jsx";
import TabNavigation from "./components/TabNavigation/TabNavigation.jsx";

function App() {
    return (
        <>
            <TabNavigation />
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/todo/:id" element={<Details/>}/>
            </Routes>
        </>
    )
}

export default App