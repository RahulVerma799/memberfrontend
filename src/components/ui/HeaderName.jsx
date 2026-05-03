import React from 'react';

const HeaderName = ({ children, className = '' }) => {
  return (
    <h2 className={`text-2xl font-bold text-slate-800 tracking-tight ${className}`}>
      {children}
    </h2>
  );
};

export default HeaderName;
