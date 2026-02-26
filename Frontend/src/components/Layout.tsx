import Sidebar from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  searchTerm?: string;
  onSearch?: (value: string) => void;
}

export default function Layout({ children, title, searchTerm, onSearch }: LayoutProps) {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-8">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <div className="flex items-center space-x-3">
            <div className="relative text-gray-400 focus-within:text-gray-600">
              <i className="fa-solid fa-magnifying-glass absolute top-3 left-3"></i>
              <input 
                type="text" 
                placeholder="Rechercher..." 
                value={searchTerm}
                onChange={(e) => onSearch?.(e.target.value)}
                className="py-2 pl-10 pr-4 bg-gray-100 rounded-full text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-orange-200 transition" 
              />
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}