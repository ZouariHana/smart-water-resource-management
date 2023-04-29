
import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";
//import Icons from "views/Icons.js";
import GeneratedPDF from "views/GeneratedPDF";
// import Maps from "views/Map.js";
import UserPage from "views/User.js";
import DownloadPDF from "views/DownloadPDF";
import AdminPage from "views/AdminPage.js";
import AgentPage from "views/AgentPage.js";
import GestionAgent from "views/GestionAgent";
import GestionAdmin from "views/GestionAdmin";

import Accueil from "views/Accueil";

var routes = [
 
  {
    path: "/Accueil",
    name: "Accueil",
    icon: "nc-icon nc-bank",
    component: Accueil,
    layout: "/admin"
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-36",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "Prévision",
    icon: "nc-icon nc-chart-bar-32",
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
    name: "Page d'administration",
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

  /*{
    path: "/DownloadPDF/:date",
    name: "Téléchargement",
    component: DownloadPDF,
    layout: "/admin"
  },*/
  
 /*{
    path: "/PDF",
    name: "PDF",
    icon: "nc-icon nc-caps-small",
    component: GeneratedPDF,
    layout: "/admin"
  },*/


];
export default routes;
