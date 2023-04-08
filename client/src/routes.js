
import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";
import GeneratedPDF from "views/GeneratedPDF";
import Maps from "views/Map.js";
import UserPage from "views/User.js";
import DownloadPDF from "views/DownloadPDF";
import AdminPage from "views/AdminPage.js";
import AgentPage from "views/AgentPage.js";
import GestionAgent from "views/GestionAgent";
import GestionAdmin from "views/GestionAdmin";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "nc-icon nc-diamond",
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "nc-icon nc-pin-3",
    component: Maps,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "nc-icon nc-bell-55",
    component: Notifications,
    layout: "/admin"
  },

  {
    path: "/user-page",
    name: "Espace Intranet",
    icon: "nc-icon nc-single-02",
    component: UserPage,
    layout: "/admin"
  },
  {
    path: "/PDF",
    name: "PDF",
    icon: "nc-icon nc-caps-small",
    component: GeneratedPDF,
    layout: "/admin"
  },
  {
    path: "/admin-page",
    name: "Admin Page",
    component: AdminPage,
    layout: "/admin",
  },
  {
    path: "/agent-page",
    name: "Agent Page",
    component: AgentPage,
    layout: "/admin",
  },
  {
    path: "/gestion-agent",
    name: "Gestion Agent",
    component: GestionAgent,
    layout: "/admin",
  },
  {
    path: "/gestion-admin",
    name: "Gestion Admin",
    component: GestionAdmin,
    layout: "/admin",
  },
  {
    path: "/typography",
    name: "PDF",
    icon: "nc-icon nc-caps-small",
    component: GeneratedPDF,
    layout: "/admin"
  },
  {
    path: "/DownloadPDF/:date",
    name: "Téléchargement",
    component: DownloadPDF,
    layout: "/admin"
  },
  


];
export default routes;
