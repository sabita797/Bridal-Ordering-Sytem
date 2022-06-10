import "./featuredInfo.css";
import { useEffect, useState } from "react";
import { getOrders } from "../../services/orders.service";

export default function FeaturedInfo() {
  const [orders, setOrders] = useState([]);
  const [dailyTotal, setDailyTotal] = useState(0);
  const [weeklyTotal, setWeeklyTotal] = useState(0);
  const [monthlyTotal, setMonthlyTotal] = useState(0);

  const [dailyCount, setDailyCount] = useState(0);
  const [weeklyCount, setWeeklyCount] = useState(0);
  const [monthlyCount, setMonthlyCount] = useState(0);

  useEffect(() => {
    async function fetchMyAPI() {
      const response = await getOrders();
      if (response.message === "Unauthorized") {
        alert("Token expired!! Please Login again.");
      } else {
        setOrders(response);
        setDailyTotal(getDailyTotal(response));
        setWeeklyTotal(getWeeklyTotal(response));
        setMonthlyTotal(getMonthlyTotal(response));
        setDailyCount(getDailyCount(response));
        setWeeklyCount(getWeeklyCount(response));
        setMonthlyCount(getMonthlyCount(response));
      }
    }

    fetchMyAPI();
  }, []);

  //function to get daily total
  function getDailyTotal(orders) {
    let total = 0;
    orders.forEach((order) => {
      if (
        new Date(order.createdAt).toDateString() === new Date().toDateString()
      ) {
        total += getPrice(order.orderedProducts);
      }
    });
    return total;
  }

  //Function to get weekly total
  function getWeeklyTotal(orders) {
    let total = 0;
    orders.forEach((order) => {
      if (
        new Date(order.createdAt).getTime() >
        new Date().getTime() - 7 * 24 * 60 * 60 * 1000
      ) {
        total += getPrice(order.orderedProducts);
      }
    });
    return total;
  }

  //Function to get monthly total
  function getMonthlyTotal(orders) {
    let total = 0;
    orders.forEach((order) => {
      if (
        new Date(order.createdAt).getTime() >
        new Date().getTime() - 30 * 24 * 60 * 60 * 1000
      ) {
        total += getPrice(order.orderedProducts);
      }
    });
    return total;
  }

  //function to count no of orders done in todays date
  function getDailyCount(orders) {
    let count = 0;
    orders.forEach((order) => {
      if (
        new Date(order.createdAt).toDateString() === new Date().toDateString()
      ) {
        debugger;
        count += order.orderedProducts.length;
      }
    });
    return count;
  }

  //function to count no of orders in a week
  function getWeeklyCount(orderedProducts) {
    let count = 0;
    orderedProducts.forEach((product) => {
      if (
        new Date(product.createdAt).getTime() >
        new Date().getTime() - 7 * 24 * 60 * 60 * 1000
      ) {
        debugger;
        count += product.orderedProducts.length;
      }
    });
    return count;
  }

  //function to count no of orders in a month
  function getMonthlyCount(orderedProducts) {
    let count = 0;
    orderedProducts.forEach((product) => {
      if (
        new Date(product.createdAt).getTime() >
        new Date().getTime() - 30 * 24 * 60 * 60 * 1000
      ) {
        debugger;
        count += product.orderedProducts.length;
      }
    });
    return count;
  }

  function getPrice(item) {
    let total = 0;
    for (let i = 0; i < item.length; i++) {
      total += item[i].product.price * item[i].quantity;
    }
    return total;
  }

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Daily Revenue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">Rs. {dailyTotal}</span>
          <span className="featuredMoneyRate">{dailyCount}</span>
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Weekly Revenue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">Rs. {weeklyTotal}</span>
          <span className="featuredMoneyRate">{weeklyCount}</span>
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Monthly Revenue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">Rs. {monthlyTotal}</span>
          <span className="featuredMoneyRate">{monthlyCount}</span>
        </div>
      </div>
    </div>
  );
}
