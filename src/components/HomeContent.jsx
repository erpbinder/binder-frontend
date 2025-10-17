import React from 'react';

const HomeContent = ({ user }) => {
  return (
    <div className="dashboard-content">
      <h1 className="dashboard-title">
        Welcome back, {user?.name || user?.email}!
      </h1>
      <p className="dashboard-subtitle">
        {user?.role === 'master-admin' && 'You have full administrative access to the system.'}
        {user?.role === 'manager' && 'Manage your tenants efficiently.'}
        {user?.role === 'tenant' && 'View your information and tasks here.'}
      </p>
    </div>
  );
};

export default HomeContent;