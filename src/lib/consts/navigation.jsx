import {
	HiOutlineTemplate,
	HiOutlineCube,
	HiOutlineDocumentReport,
	HiOutlineUsers,
	HiOutlineDocumentText,
	HiOutlineAnnotation,
	HiOutlineQuestionMarkCircle,
	HiOutlineCog
} from 'react-icons/hi'
import { LuRocket } from "react-icons/lu";

export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'dashboard',
		label: 'Dashboard',
		path: '/',
		icon: <HiOutlineTemplate />
	},
	{
		key: 'header',
		label: 'Header',
		path: '/header',
		icon: <LuRocket />
	},
	{
		key: 'mainarticle',
		label: 'Main article',
		path: '/article',
		icon: <HiOutlineDocumentReport />
	},
	{
		key: 'new_article',
		label: 'New article',
		path: '/newarticle',
		icon: <HiOutlineDocumentText />
	},
	{
		key: 'article',
		label: 'Articles',
		path: '/articles',
		icon: <HiOutlineUsers />
	},
	{
		key: 'footer',
		label: 'Footer',
		path: '/footer',
		icon: <HiOutlineAnnotation />
	}
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
	{
		key: 'settings',
		label: 'Settings',
		path: '/settings',
		icon: <HiOutlineCog />
	},
	{
		key: 'support',
		label: 'Help & Support',
		path: '/support',
		icon: <HiOutlineQuestionMarkCircle />
	}
]