import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PrivateRoute from "./components/PrivateRoute";
import Homepage from "./views/Homepage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CocktailList from "./views/CocktailList";
import Login from "./views/Login";
import Register from "./views/Register";
import CreateCocktail from "./views/CreateCocktail";
import Account from "./views/Account";

function App() {
  const { auth } = useSelector((state) => state);
  return (
    <Router className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        {/* <Route path="/login" element={<InactiveRoute />}> */}
        <Route path="/login" element={<Login />} />
        {/* </Route> */}
        <Route path="/register" element={<Register />} />
        <Route path="/tutti-i-cocktail" element={<CocktailList />} />
        <Route path="/crea-il-tuo-cocktail" element={<PrivateRoute />}>
          <Route path="/crea-il-tuo-cocktail" element={<CreateCocktail />} />
        </Route>
        <Route path="/myaccount" element={<PrivateRoute />}>
          <Route path="/myaccount" element={<Account />} />
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
