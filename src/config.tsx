import React from "react";
import { Icon } from "@rsuite/icons";
import PeoplesIcon from "@rsuite/icons/Peoples";
import GridIcon from "@rsuite/icons/Grid";
import ChangeListIcon from "@rsuite/icons/ChangeList";
import StorageIcon from "@rsuite/icons/Storage";
import CopyIcon from "@rsuite/icons/Copy";
export const appNavs = [
  {
    eventKey: "dashboard",
    icon: <Icon as={GridIcon} />,
    title: "Dashboard",
    to: "/",
  },
  {
    eventKey: "customers",
    icon: <Icon as={PeoplesIcon} />,
    title: "Customers",
    to: "/customers",
  },
  {
    eventKey: "products",
    icon: <Icon as={CopyIcon} />,
    title: "Products",
    to: "/products",
  },
  {
    eventKey: "inventory",
    icon: <Icon as={StorageIcon} />,
    title: "Inventory",
    to: "/inventory",
  },
  {
    eventKey: "orders",
    icon: <Icon as={ChangeListIcon} />,
    title: "Orders",
    to: "/orders",
  },
];

export const appSettings = {
  defaultPageSize: 25,
};
