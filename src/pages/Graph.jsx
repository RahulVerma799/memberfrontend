import React, { useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMembersRequest } from '../redux/slices/memberSlice';
import HeaderName from '../components/ui/HeaderName';
import { Users, UserPlus, TrendingUp, Calendar, ArrowUpRight, Activity } from 'lucide-react';

const Graph = () => {
  const dispatch = useDispatch();
  const { members, isLoading } = useSelector((state) => state.member);
  const [timeRange, setTimeRange] = React.useState(7); // 7 or 30

  useEffect(() => {
    if (members.length === 0) {
      dispatch(fetchMembersRequest());
    }
  }, [dispatch, members.length]);

  const stats = useMemo(() => {
    const totalMembers = members.length;
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const membersThisMonth = members.filter(m => new Date(m.createdAt) >= startOfMonth).length;
    const growthRate = totalMembers > 0 ? ((membersThisMonth / totalMembers) * 100).toFixed(1) : 0;

    return {
      totalMembers,
      membersThisMonth,
      growthRate
    };
  }, [members]);

  const chartData = useMemo(() => {
    const count = timeRange;
    const lastNDays = Array.from({ length: count }).map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (count - 1 - i));
      return {
        date: d.toISOString().split('T')[0],
        label: count === 7 ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][d.getDay()] : d.getDate().toString(),
        count: 0
      };
    });

    members.forEach(member => {
      const memberDate = new Date(member.createdAt).toISOString().split('T')[0];
      const dayData = lastNDays.find(d => d.date === memberDate);
      if (dayData) {
        dayData.count += 1;
      }
    });

    const maxCount = Math.max(...lastNDays.map(d => d.count), 5);
    return lastNDays.map(d => ({
      ...d,
      height: (d.count / maxCount) * 100
    }));
  }, [members, timeRange]);

  return (
    <div className="min-h-screen pb-20 space-y-12 animate-in fade-in zoom-in-95 duration-1000">
      {/* Mesh Gradient Header */}
      <div className="relative p-12 rounded-[60px] bg-slate-950 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full -mr-40 -mt-40 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/10 blur-[100px] rounded-full -ml-20 -mb-20" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-2xl backdrop-blur-md">
              <div className="h-2 w-2 bg-blue-400 rounded-full animate-ping" />
              <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em]">System Intelligence</span>
            </div>
            <h1 className="text-6xl font-black text-white tracking-tighter leading-none">
              Command <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Center</span>
            </h1>
            <p className="text-slate-400 font-medium text-lg max-w-xl">
              Precision metrics and growth vectors for your community ecosystem.
            </p>
          </div>

          <div className="flex bg-white/5 p-2 rounded-3xl backdrop-blur-2xl border border-white/10 shadow-2xl">
            <button 
              onClick={() => setTimeRange(7)}
              className={`px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-500 ${timeRange === 7 ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-400 hover:text-white'}`}
            >
              Weekly
            </button>
            <button 
              onClick={() => setTimeRange(30)}
              className={`px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-500 ${timeRange === 30 ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-400 hover:text-white'}`}
            >
              Monthly
            </button>
          </div>
        </div>
      </div>

      {/* Modern Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Main Chart Card */}
          <div className="bg-white p-12 rounded-[50px] border border-slate-100 shadow-premium relative overflow-hidden group">
            <div className="flex items-center justify-between mb-16">
              <div>
                <h3 className="text-2xl font-black text-slate-800 tracking-tight">Growth Trajectory</h3>
                <p className="text-slate-400 text-sm font-medium">Daily member registration flow.</p>
              </div>
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 text-slate-400 group-hover:text-blue-600 transition-colors">
                <Activity className="h-6 w-6" />
              </div>
            </div>

            <div className="h-80 relative">
              {/* Y-Axis scale */}
              <div className="absolute left-0 inset-y-0 w-full flex flex-col justify-between pointer-events-none pb-8 text-slate-200">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-full border-t border-slate-50 relative">
                    <span className="absolute -top-2.5 right-0 text-[10px] font-black">{100 - i * 25}%</span>
                  </div>
                ))}
              </div>

              {/* Bars */}
              <div className="h-full flex items-end justify-between gap-1 md:gap-3 relative z-10 pb-8">
                {chartData.map((data, i) => (
                  <div key={data.date} className="flex-1 flex flex-col items-center group/bar h-full justify-end">
                    <div className="absolute -top-16 opacity-0 group-hover/bar:opacity-100 transition-all duration-300 translate-y-4 group-hover/bar:translate-y-0 z-30">
                      <div className="bg-slate-950 text-white px-4 py-2 rounded-2xl shadow-2xl text-[10px] font-black border border-white/10 whitespace-nowrap">
                        {data.count} MEMBERS • {data.date}
                      </div>
                      <div className="w-3 h-3 bg-slate-950 rotate-45 mx-auto -mt-1.5" />
                    </div>
                    
                    <div 
                      className={`w-full max-w-[24px] bg-gradient-to-t from-blue-600 via-blue-500 to-indigo-400 rounded-full transition-all duration-1000 ease-out shadow-lg shadow-blue-100 group-hover/bar:scale-x-110 group-hover/bar:from-blue-700 group-hover/bar:to-indigo-500 ${isLoading ? 'h-0' : ''}`}
                      style={{ height: `${Math.max(data.height, 4)}%` }}
                    />
                    
                    {timeRange === 7 && (
                      <span className="absolute -bottom-6 text-[10px] font-black text-slate-300 uppercase tracking-widest group-hover/bar:text-blue-600 transition-colors">
                        {data.label}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Mini Info Cards */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-10 rounded-[40px] text-white shadow-2xl shadow-blue-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl" />
            <p className="text-xs font-black text-blue-200 uppercase tracking-[0.3em] mb-4">Total Ecosystem</p>
            <h2 className="text-7xl font-black tracking-tighter mb-8">{stats.totalMembers}</h2>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {members.slice(0, 4).map((m, i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-4 border-blue-600 bg-white overflow-hidden shadow-xl">
                    <img src={m.photo || `https://api.dicebear.com/7.x/avataaars/svg?seed=${m.name}`} alt="" />
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full border-4 border-blue-600 bg-blue-500 flex items-center justify-center text-[10px] font-black">+{members.length > 4 ? members.length - 4 : 0}</div>
              </div>
              <span className="text-xs font-bold text-blue-100">Active Members</span>
            </div>
          </div>

          <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-premium relative overflow-hidden group">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Growth Index</p>
                <h4 className="text-xl font-black text-slate-800 tracking-tight">Accelerating</h4>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-500">New this month</span>
                <span className="text-lg font-black text-slate-800">{stats.membersThisMonth}</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 rounded-full transition-all duration-1000"
                  style={{ width: `${stats.growthRate}%` }}
                />
              </div>
              <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-2">
                <ArrowUpRight className="h-3 w-3" />
                {stats.growthRate}% Above Baseline
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Graph;
