import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';

export function RootLayout() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Sidebar />
      <Header />
      <main className="ml-64 p-8 min-h-[calc(100vh-4rem)]">
        <div className="max-w-4xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
