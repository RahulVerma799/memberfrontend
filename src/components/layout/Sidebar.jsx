import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, UserPlus, BarChart3, X } from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  const links = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Add Member', path: '/add-member', icon: UserPlus },
    { name: 'Graph', path: '/graph', icon: BarChart3 },
  ];

  return (
    <aside className={`fixed left-0 top-0 lg:top-16 bottom-0 w-64 bg-white border-r border-slate-100 z-[60] lg:z-40 transition-transform duration-300 sidebar-gradient ${
      isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
    }`}>
      {/* Mobile Header for Sidebar */}
      <div className="flex lg:hidden items-center justify-between p-6 border-b border-slate-50 mb-4">
        <span className="text-xl font-extrabold text-slate-800 tracking-tight">Member<span className="text-blue-600">.</span></span>
        <button onClick={onClose} className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="p-6 space-y-2">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 px-3">Main Menu</p>
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            onClick={() => { if(window.innerWidth < 1024) onClose(); }}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-xl text-md font-medium transition-premium ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <link.icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                {link.name}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
