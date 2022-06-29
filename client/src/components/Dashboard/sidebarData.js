import React from "react";

import * as IoIcons from "react-icons/io";
import * as MdIcons from "react-icons/md";
import * as ImIcons from "react-icons/im";
import * as BsIcons from "react-icons/bs";
import { AiFillSchedule } from "react-icons/ai";

export const SiderbarData = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <MdIcons.MdDashboard />,
    cName: "dashbord-nav-text",
  },
  {
    title: "Courses",
    path: "/dashboard/courses",
    icon: <ImIcons.ImBooks />,
    cName: "dashbord-nav-text",
  },
  {
    title: "Chats",
    path: "/dashboard/chats",
    icon: <BsIcons.BsFillChatRightFill />,
    cName: "dashbord-nav-text",
  },
  {
    title: "Schedule",
    path: "/dashboard/schedule",
    icon: <AiFillSchedule />,
    cName: "dashbord-nav-text",
  },
  {
    title: "Settings",
    path: "/dashboard/settings",
    icon: <IoIcons.IoMdSettings />,
    cName: "dashbord-nav-text",
  },
];
