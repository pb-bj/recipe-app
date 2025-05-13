import HomeIcon from './assets/home.png' 
export const MenuItems = [
    {
        id: 1,
        title: 'Dashboard',
        menus:[
            {
                id: 1,
                page: 'Home',
                icon: HomeIcon,
                url: '/'
            }
        ]
    },
    {
        id: 2,
        title: 'Recipes',
        menus:[
            {
                id: 1,
                page: 'Add A Recipe',
                icon: HomeIcon,
                url: '/' 
            },
            {
                id: 2,
                page: 'My Recipes',
                icon: HomeIcon,
                url: '/' 
            },
            {
                id: 3,
                page: 'Search',
                icon: HomeIcon,
                url: '/' 
            },
            {
                id: 4,
                page: 'Favourites',
                icon: HomeIcon,
                url: '/' 
            },
            {
                id: 5,
                page: 'Tags',
                icon: HomeIcon,
                url: '/' 
            },
        ]
    },
    {
        id: 3,
        title: 'Pan & Shop',
        menus:[
            {
                id: 1,
                page: 'Meal Planner',
                icon: HomeIcon,
                url: '/' 
            },
            {
                id: 2,
                page: 'Shopping Lists',
                icon: HomeIcon,
                url: '/' 
            },
        ]
    },
    {
        id: 4,
        title: 'General',
        menus:[
            {
                id: 1,
                page: 'Settings',
                icon: HomeIcon,
                url: '/' 
            },
            {
                id: 2,
                page: 'Contact Us',
                icon: HomeIcon,
                url: '/' 
            },
        ]
    },
]