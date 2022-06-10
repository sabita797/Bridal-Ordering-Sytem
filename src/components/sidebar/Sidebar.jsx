import "./sidebar.css";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
              <li className="sidebarListItem active">
                <LineStyle className="sidebarIcon" />
                Home
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/products" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Products
              </li>
            </Link>

            <Link to="/packages" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Packages
              </li>
            </Link>

            <Link to="/carousellist" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Carousel
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
            {/* <li className="sidebarListItem">
              <MailOutline className="sidebarIcon" />
              Mail
            </li> */}
            <Link to="/orders" className="link">
              <li className="sidebarListItem">
                <DynamicFeed className="sidebarIcon" />
                Orders
              </li>
            </Link>
            <Link to="/contactus" className="link">
              <li className="sidebarListItem">
                <ChatBubbleOutline className="sidebarIcon" />
                Contact Us
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}
