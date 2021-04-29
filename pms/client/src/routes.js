// core components
import { AddressForm, Dashboard, Reports, Reservations } from "./views/admin";
// @material-ui/icons components
import Grain from "@material-ui/icons/Grain";
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import Tv from "@material-ui/icons/Tv";


var routes = [
  {
    title: "Admin Dashboard",
  },
  {
    divider: true,
  },
  {
    path: "/index",
    name: "Dashboard",
    icon: Tv,
    iconColor: "Primary",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/reports",
    name: "Reports",
    icon: Grain,
    iconColor: "Warning",
    component: Reports,
    layout: "/admin",
  },
  {
    path: "/reservations",
    name: "Reservations",
    icon: LibraryBooksIcon,
    iconColor: "Info",
    component: Reservations,
    layout: "/admin",
  },
  {
    path: "/addLocation",
    name: "Location",
    icon: LibraryBooksIcon,
    iconColor: "Info",
    component: AddressForm,
    layout: "/admin",
  },
];
export default routes;
