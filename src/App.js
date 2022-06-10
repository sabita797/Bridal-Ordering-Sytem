import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import ProductList from "./pages/ProductList";
import AboutUs from "./pages/AboutUs";
import Contactus from "./pages/ContactUs";
import Checkout from "./components/Checkout";
import Package from "./pages/Package";
import Profile from "./pages/Profile";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Product from "./pages/Product";


const App = () => {
  const user  = false;
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          {user ? <Redirect to ="/"/> :<Login/>}
        </Route>
        <Route path="/register">
          {user ? <Redirect to ="/"/> :<Register/>}
        </Route>
        <Route path="/products/:category">
          <ProductList />
        </Route>
        <Route path="/products">
          <ProductList />
        </Route>
        <Route path="/product/:id">
          <Product />
        </Route>
        <Route path="/package/:id">
          <Package />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
        <Route path="/aboutus">
          <AboutUs />
        </Route>
        <Route path="/contactus">
          <Contactus />
        </Route>
        <Route path="/checkout">
          <Checkout />
        </Route>

        <Route path="/profile">
          <Profile/>
        </Route>
      </Switch>
    </Router>

  );
};

export default App;