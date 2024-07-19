import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications} from "@/pages/dashboard";
import Chart from "./pages/dashboard/chart";

// Change this

import { SignIn, SignUp } from "@/pages/auth";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "DASHBOARD",
        path: "/Home",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "STOCK AGENTS",
        path: "/AGENTS",
        element: <Profile />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "PORTFOLIO GUIDE",
        path: "/PORTFOLIO_GUIDE",
        element: <Tables />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "ML TRADER",
        path: "/ML_TRADER",
        element: <Notifications />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "AI Stock Info",
        path:"/chart",
        element:<Chart symbol={'IBM'}/>,
      }
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
];

export default routes;
