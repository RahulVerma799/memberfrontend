import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogOut, Menu } from 'lucide-react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import Button from '../ui/Button';

const Navbar = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 glass border-b border-slate-200/50 z-50 flex items-center justify-between px-4 md:px-8">
      <div className="flex items-center gap-3">
        {/* Mobile Menu Button */}
        <button 
          onClick={onMenuClick}
          className="p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-lg lg:hidden"
        >
          <Menu className="h-6 w-6" />
        </button>

        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-8 h-8 md:w-9 md:h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
            <span className="text-white font-bold text-base md:text-lg tracking-tighter">M</span>
          </div>
          <span className="text-lg md:text-xl font-extrabold text-slate-800 tracking-tight">Member<span className="text-blue-600">.</span></span>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <Button 
          variant="ghost" 
          className="text-slate-500 hover:text-red-600 hover:bg-red-50 px-2 md:px-4"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 md:mr-2" />
          <span className="hidden md:inline">Logout</span>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
