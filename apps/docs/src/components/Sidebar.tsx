import { Link, useLocation } from 'react-router-dom';
import { clsx } from 'clsx';
import { Layers, Box } from 'lucide-react';
import navigationData from '../data/navigation.json';

export function Sidebar() {
  const location = useLocation();
  const navItems = navigationData as Record<string, { name: string; tag: string; path: string }[]>;

  return (
    <aside className="w-64 border-r border-border bg-card h-screen fixed left-0 top-0 overflow-y-auto">
      <div className="p-6 border-b border-border sticky top-0 bg-card z-10">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary">
          <Layers className="w-6 h-6" />
          <span>Meridian UX</span>
        </Link>
      </div>

      <nav className="p-4 space-y-6">
        {Object.entries(navItems).map(([category, items]) => (
          <div key={category}>
            <div className="flex items-center gap-2 px-2 mb-2 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              {/* Fallback icon for generic categories */}
              <Box className="w-3 h-3" />
              <span>{category}</span>
            </div>
            <div className="space-y-0.5">
              {items.map((item) => (
                <Link
                  key={item.tag}
                  to={`/components/${item.tag}`}
                  className={clsx(
                    "block px-3 py-1.5 text-sm rounded-md transition-colors",
                    location.pathname === `/components/${item.tag}`
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
