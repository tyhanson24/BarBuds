import { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import Landing from './components/Landing';
import Setup from './components/Setup';
import Dashboard from './components/Dashboard';
import Settings from './components/Settings';
import History from './components/History';

function App() {
  const [userProfile, setUserProfile] = useLocalStorage('willfit-profile', null);
  const [view, setView] = useState(userProfile ? 'dashboard' : 'landing');

  const handleGetStarted = () => setView('setup');

  const handleStart = ({ name }) => {
    setUserProfile({ name, startDate: new Date().toISOString().split('T')[0] });
    setView('dashboard');
  };

  const handleReset = () => {
    localStorage.removeItem('willfit-profile');
    localStorage.removeItem('willfit-completed');
    setUserProfile(null);
    setView('landing');
  };

  if (view === 'landing') {
    return <Landing onGetStarted={handleGetStarted} />;
  }

  if (view === 'setup') {
    return <Setup onStart={handleStart} onBack={() => setView('landing')} />;
  }

  if (view === 'settings') {
    return (
      <Settings
        userName={userProfile?.name || 'Athlete'}
        onBack={() => setView('dashboard')}
        onReset={handleReset}
      />
    );
  }

  if (view === 'history') {
    return <History onBack={() => setView('dashboard')} />;
  }

  return (
    <Dashboard
      userName={userProfile?.name || 'Athlete'}
      onSettings={() => setView('settings')}
      onHistory={() => setView('history')}
    />
  );
}

export default App;
