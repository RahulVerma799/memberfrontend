import React from 'react';
import HeaderName from '../components/ui/HeaderName';

const Graph = () => {
  return (
    <div className="space-y-6">
      <HeaderName>Member Analytics</HeaderName>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Members', value: '1,284', trend: '+12%' },
          { label: 'Active Now', value: '42', trend: '+5%' },
          { label: 'New This Month', value: '156', trend: '+18%' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
            <div className="flex items-end justify-between mt-2">
              <h3 className="text-2xl font-bold text-slate-800">{stat.value}</h3>
              <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm h-96 flex items-center justify-center">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            {[40, 70, 45, 90, 65, 80, 50].map((height, i) => (
              <div 
                key={i} 
                className="w-8 bg-blue-600 rounded-t-md opacity-20 hover:opacity-100 transition-opacity duration-300"
                style={{ height: `${height}px` }}
              ></div>
            ))}
          </div>
          <p className="text-slate-500 font-medium italic">Visualization placeholder - Interactive graph coming soon</p>
        </div>
      </div>
    </div>
  );
};

export default Graph;
