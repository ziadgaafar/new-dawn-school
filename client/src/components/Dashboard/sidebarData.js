import React from 'react'


import * as IoIcons from 'react-icons/io';
import * as MdIcons from 'react-icons/md';
import * as ImIcons from 'react-icons/im';
import * as BsIcons from 'react-icons/bs';




export const SiderbarData = [
    {
        title : 'Dashboard' ,
        path : '/dashboard' ,
        icon : <MdIcons.MdDashboard/> ,
        cName : 'dashbord-nav-text'
    },
    {
        title : 'Courses' ,
        path : '/courses' ,
        icon : <ImIcons.ImBooks/> ,
        cName : 'dashbord-nav-text'
    },
    {
        title : 'Chats' ,
        path : '/chats' ,
        icon : <BsIcons.BsFillChatRightFill/> ,
        cName : 'dashbord-nav-text'
    },
    {
        title : 'Settings' ,
        path : '/settings' ,
        icon : <IoIcons.IoMdSettings/> ,
        cName : 'dashbord-nav-text'
    },
   

]
