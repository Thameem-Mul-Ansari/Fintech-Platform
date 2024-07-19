import {
  BanknotesIcon,
  UserPlusIcon,
  UsersIcon,
  ChartBarIcon,
  ArrowLongUpIcon,
  InboxIcon,
  CircleStackIcon 
  
} from "@heroicons/react/24/solid";

export const statisticsCardsData = [
  {
    color: "gray",
    icon: BanknotesIcon,
    title: "PORTFOLIO VALUE",
    value: "$99,166.76",
    footer: {
      color: "text-green-500",
      value: "+55%",
      label: "than last year",
    },
  },
  {
    color: "gray",
    icon: ArrowLongUpIcon,
    title: "BUYING POWER",
    value: "$102,272.38",
    footer: {
      color: "text-green-500",
      value: "+3%",
      label: "than yesterday",
    },
  },
  {
    color: "gray",
    icon: CircleStackIcon ,
    title: "INITIAL MARGIN",
    value: "$48,030.57",
    footer: {
      color: "text-red-500",
      value: "20%",
      label: "last one year",
    },
  },
  {
    color: "gray",
    icon: ChartBarIcon,
    title: "MAINTENANCE MARGIN",
    value: "$28,818.34",
    footer: {
      color: "text-green-500",
      value: "+10%",
      label: "last one year",
    },
  },
];

export default statisticsCardsData;
