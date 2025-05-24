import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { DivideIcon as LucideIcon, CalendarClock } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

interface SidebarProps {
  navItems: NavItem[];
  userRole: string;
}

const Sidebar = ({ navItems, userRole }: SidebarProps) => {
  const location = useLocation();

  return (
    <aside
      id="sidebar"
      className="bg-card w-64 flex-shrink-0 border-r transition-transform duration-300 ease-in-out md:translate-x-0 -translate-x-full md:static absolute inset-y-0 z-50 h-full"
    >
      <div className="flex h-16 items-center border-b px-4">
        <Link to={`/${userRole}`} className="flex items-center gap-2 font-semibold">
          <CalendarClock className="h-6 w-6 text-primary" />
          <span className="text-xl">Schedule Manager</span>
        </Link>
      </div>
      
      <ScrollArea className="h-[calc(100vh-4rem)]">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Navigation</h2>
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = 
                location.pathname === item.href || 
                (item.href !== `/${userRole}` && location.pathname.startsWith(item.href));
              
              return (
                <Button
                  key={item.href}
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    isActive && "bg-secondary text-secondary-foreground"
                  )}
                  asChild
                >
                  <Link to={item.href}>
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </Link>
                </Button>
              );
            })}
          </div>
        </div>
      </ScrollArea>
    </aside>
  );
};

export default Sidebar;