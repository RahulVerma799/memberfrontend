import React, { useState, useMemo, useEffect } from 'react';
import { Search, FilterX, Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMembersRequest } from '../redux/slices/memberSlice';
import HeaderName from '../components/ui/HeaderName';
import Pagination from '../components/ui/Pagination';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { members, isLoading, error } = useSelector((state) => state.member);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const itemsPerPage = 6;

  useEffect(() => {
    dispatch(fetchMembersRequest());
  }, [dispatch]);

  const filteredData = useMemo(() => {
    return members.filter((member) => {
      const query = searchQuery.toLowerCase();
      return (
        member.name.toLowerCase().includes(query) ||
        member.email.toLowerCase().includes(query) ||
        (member.phone && member.phone.toString().includes(query))
      );
    });
  }, [searchQuery, members]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginatedData = useMemo(() => {
    return filteredData.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [filteredData, currentPage]);

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(val || 0);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('en-IN', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  if (isLoading && members.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-12 w-12 text-blue-600 animate-spin mb-4" />
        <p className="text-slate-500 font-medium">Loading your members...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col gap-1">
          <HeaderName>Member Directory</HeaderName>
        </div>
        
        <div className="relative w-full md:w-96">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <Search className="h-4 w-4" />
          </div>
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-premium shadow-sm"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-medium">
          Error: {error}
        </div>
      )}

      {filteredData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedData.map((member) => (
            <div key={member._id} className="group perspective-1000 h-64 w-full cursor-pointer">
              <div className="relative preserve-3d group-hover:rotate-y-180 w-full h-full transition-all duration-500 shadow-premium rounded-2xl">
                
                {/* Front Side */}
                <div className="absolute inset-0 backface-hidden bg-white rounded-2xl border border-slate-200/60 flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-24 h-24 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-2xl shadow-inner-soft border border-blue-100 mb-4 overflow-hidden">
                    {member.photo ? (
                      <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                    ) : (
                      <span>{member.name.split(' ').map(n => n[0]).join('')}</span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">{member.name}</h3>
                  <p className="text-sm text-slate-500 font-medium">{member.email}</p>
                  <p className="text-xs text-slate-400 mt-1">{member.married}</p>
                </div>

                {/* Back Side */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 bg-blue-600 rounded-2xl p-7 text-white flex flex-col justify-center space-y-4">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-blue-200 uppercase tracking-widest">Phone</p>
                    <p className="text-lg font-mono font-bold tracking-wider">{member.phone}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-blue-200 uppercase tracking-widest">Amount</p>
                      <p className="text-md font-bold">{formatCurrency(member.amount)}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-blue-200 uppercase tracking-widest">DOB</p>
                      <p className="text-md font-medium">{formatDate(member.dob)}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-blue-500/50">
                    <p className="text-[10px] font-bold text-blue-200 uppercase tracking-widest mb-1">Status</p>
                    <p className="text-xs break-all opacity-90">{member.married}</p>
                  </div>
                </div>
                
              </div>
            </div>
          ))}
        </div>
      ) : (
        !isLoading && (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
              <FilterX className="h-8 w-8 text-slate-300" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">No members found</h3>
            <p className="text-slate-500 text-sm mt-1">Try adding a new member or adjusting your search.</p>
            <button 
              onClick={() => setSearchQuery('')}
              className="mt-6 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors"
            >
              Clear Search
            </button>
          </div>
        )
      )}

      {filteredData.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm mt-8">
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={setCurrentPage} 
          />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
