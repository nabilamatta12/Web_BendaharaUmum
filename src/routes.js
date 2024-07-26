
// import Dashboard from "layouts/dashboard";
import Dashboard from "layouts/dashboard";
import Iuran from "layouts/Iuran";
import SignIn from "layouts/authentication/sign-in";
// import Tables from "layouts/tables";
import Algo from "layouts/algo";
import Pengeluaran from "layouts/pengeluaran"
import Sumbangan from "layouts/sumbangan"
// import VirtualReality from "layouts/virtual-reality";
// import RTL from "layouts/rtl";
// import Profile from "layouts/profile";
// import SignIn from "layouts/authentication/sign-in";
// import SignUp from "layouts/authentication/sign-up";

// Soft UI Dashboard React icons
import Shop from "examples/Icons/Shop";
// import Iuran from "layouts/Iuran";
import Office from "examples/Icons/Office";
// import Settings from "examples/Icons/Settings";
import Document from "examples/Icons/Document";
// import SpaceShip from "examples/Icons/SpaceShip";
// import CustomerSupport from "examples/Icons/CustomerSupport";
import CreditCard from "examples/Icons/CreditCard";
// import Cube from "examples/Icons/Cube";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <Shop size="12px" />,
    component: <Dashboard />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Iuran",
    key: "iuran",
    route: "/iuran",
    icon: <Office size="12px" />,
    component: <Iuran />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Sumbangan",
    key: "sumbangan",
    route: "/sumbagan",
    icon: <Office size="12px" />,
    component: <Sumbangan />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Pengeluaran",
    key: "pengeluaran",
    route: "/pengeluaran",
    icon: <Office size="12px" />,
    component: <Pengeluaran />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Algo",
    key: "algo",
    route: "/algo",
    icon: <CreditCard size="12px" />,
    component: <Algo />,
    noCollapse: true,
  },
  // {
  //   type: "collapse",
  //   name: "Tables",
  //   key: "tables",
  //   route: "/tables",
  //   icon: <Office size="12px" />,
  //   component: <Tables />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "Billing",
  //   key: "billing",
  //   route: "/billing",
  //   icon: <CreditCard size="12px" />,
  //   component: <Billing />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "Virtual Reality",
  //   key: "virtual-reality",
  //   route: "/virtual-reality",
  //   icon: <Cube size="12px" />,
  //   component: <VirtualReality />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "RTL",
  //   key: "rtl",
  //   route: "/rtl",
  //   icon: <Settings size="12px" />,
  //   component: <RTL />,
  //   noCollapse: true,
  // },
  { type: "title", title: "Account Pages", key: "account-pages" },
  // {
  //   type: "collapse",
  //   name: "Profile",
  //   key: "profile",
  //   route: "/profile",
  //   icon: <CustomerSupport size="12px" />,
  //   component: <Profile />,
  //   noCollapse: true,
  // },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    route: "/authentication/sign-in",
    icon: <Document size="12px" />,
    component: <SignIn />,
    noCollapse: true,
  },
  // {
  //   type: "collapse",
  //   name: "Sign Up",
  //   key: "sign-up",
  //   route: "/authentication/sign-up",
  //   icon: <SpaceShip size="12px" />,
  //   component: <SignUp />,
  //   noCollapse: true,
  // },
];

export default routes;
