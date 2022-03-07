import ViewDayIcon from '@mui/icons-material/ViewDay';
import PersonIcon from '@mui/icons-material/Person';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';

export const LeftBarData = [
    {
        id: 1,
        title: "Visites",
        path:'/visites',
        icon:<ViewDayIcon/>
    },
    {
        id: 2,
        title: "Admins",
        path:'/admins',
        icon:<PersonIcon/>
    },
    {
        id: 3,
        title: "Apprenants",
        path:'/liste_apprenants',
        icon:<SchoolOutlinedIcon/>
    },
    {
        id: 4,
        title: "Structures",
        path:'/structures',
        icon:<FormatListBulletedIcon/>
    }
]
