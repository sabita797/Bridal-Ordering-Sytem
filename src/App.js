import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import NewCategory from "./pages/newCategory/NewCategory";
import Category from "./pages/category/Category";
import CategoryList from "./pages/categoryList/CategoryList";
import PackageList from "./pages/packageList/PackageList";
import Package from "./pages/package/Package";
import NewPackage from "./pages/newPackage/NewPackage";
import NewCarousel from "./pages/newCarousel/newCarousel";
import CarouselList from "./pages/carouselList/carousellist";
import ContactUsList from "./pages/contactUsList/contactUsList";
import OrderList from "./pages/orderList/orderList";
import UpdatePackages from "./pages/updatePackages/UpdatePackages";
import { Redirect } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useEffect } from "react";

function App() {
  const user = localStorage.getItem("user");
  return (
    <Router>
      <Route exact path="/">
          {user ? <Redirect to ="/home"/> :<Login/>}
        </Route>
        <Route path="/login">
          {user ? <Redirect to ="/home"/> :<Login/>}
        </Route>
        <Route path="/register">
          {user ? <Redirect to ="/home"/> :<Register/>}
        </Route>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Switch>
          <Route  path="/home">
            <Home />
          </Route>
          
          <Route path="/users">
            <UserList />
          </Route>
          <Route path="/user/:userId">
            <User />
          </Route>
          <Route path="/newUser">
            <NewUser />
          </Route>
          <Route path="/products">
            <ProductList />
          </Route>
          <Route path="/product">
            <Product />
          </Route>

          <Route path="/updatePackages">
            <UpdatePackages />
          </Route>
         
          <Route path="/newproduct">
            <NewProduct />
          </Route>

          <Route path="/categories">
            <CategoryList />
          </Route>
          <Route path="/category/:categoryId">
            <Category />
          </Route>
          <Route path="/newcategory">
            <NewCategory />
          </Route>

          <Route path="/packages">
            <PackageList />
          </Route>
          <Route path="/package/:packageId">
            <Package />
          </Route>
          <Route path="/newpackage">
            <NewPackage />
          </Route>
          <Route path="/carousellist">
            <CarouselList />
          </Route>

          <Route path="/newcarousel">
            <NewCarousel />
          </Route>

          <Route path="/contactus">
            <ContactUsList />
          </Route>

          <Route path="/orders">
            <OrderList />
          </Route>

        </Switch>
      </div>
    </Router>
  )
}

export default App;
