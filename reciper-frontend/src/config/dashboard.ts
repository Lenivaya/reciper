import { BookOpen, ChefHat, Heart, Home, Settings, Users } from 'lucide-react'

interface SidebarNavItem {
  title: string
  href: string
  icon: React.ElementType
  items?: SidebarNavItem[]
}

interface DashboardConfig {
  sidebarNav: SidebarNavItem[]
}

export const dashboardConfig: DashboardConfig = {
  sidebarNav: [
    {
      title: 'Overview',
      href: '/dashboard',
      icon: Home
    },
    {
      title: 'My Recipes',
      href: '/dashboard/recipes',
      icon: ChefHat
    },
    {
      title: 'Saved Recipes',
      href: '/dashboard/saved',
      icon: Heart
    },
    {
      title: 'Cookbooks',
      href: '/dashboard/cookbooks',
      icon: BookOpen
    },
    {
      title: 'Following',
      href: '/dashboard/following',
      icon: Users
    },
    {
      title: 'Settings',
      href: '/dashboard/settings',
      icon: Settings
    }
  ]
}
