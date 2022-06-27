import ViewDayIcon from '@mui/icons-material/ViewDay';
import PersonIcon from '@mui/icons-material/Person';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import ApiIcon from '@mui/icons-material/Api';
import BallotIcon from '@mui/icons-material/Ballot';
import DeviceUnknownIcon from '@mui/icons-material/DeviceUnknown';

export const LeftBarData = [
    {
        id: 1,
        title: "Tableau de bord",
        path:'/tableau_de_bord',
        icon:<DashboardIcon/>,
        after: true,
        showBySuperAdmin: false,
        showByAdmin: false
    },
    {
        id: 2,
        title: "Visites",
        path:'/visites',
        icon:<ViewDayIcon/>,
        after: true,
        showBySuperAdmin: false,
        showByAdmin: false
    },
    {
        id: 3,
        title: "Admins",
        path:'/admins',
        icon:<PersonIcon/>,
        after: true,
        showBySuperAdmin: true,
        showByAdmin: true
    },
    {
        id: 4,
        title: "Apprenants",
        path:'/liste_apprenants',
        icon:<SchoolOutlinedIcon/>,
        after: true,
        showBySuperAdmin: true,
        showByAdmin: true
    },
    {
        id: 5,
        title: "Référentiels",
        path:'/referentiels',
        icon: <ApiIcon/>,
        after: true,
        showBySuperAdmin: true,
        showByAdmin: true
    },
    {
        id: 6,
        title: "Promos",
        path:'/promos',
        icon:<BallotIcon/>,
        after: true,
        showBySuperAdmin: true,
        showByAdmin: true
    }
    ,
    {
        id: 7,
        title: "Superviseurs",
        path:'/superviseurs',
        icon:<SupervisorAccountIcon/>,
        after: true,
        showBySuperAdmin: true,
        showByAdmin: true
    },
    {
        id: 8,
        title: "Appareils",
        path:'/devices',
        icon:<DeviceUnknownIcon/>,
        after: true,
        showBySuperAdmin: true,
        showByAdmin: true
    }
]
