import React, { useState, useEffect } from 'react';
import { List, CheckSquare, Calendar, Clock, User } from 'lucide-react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ItemList from './components/ItemList';
import Reminder from './components/Reminder';
import TaskManager from './components/TaskManager';
import UserSettings from './components/UserSettings';

function App() {
  const [activeTab, setActiveTab] = useState('items');
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      const { theme } = JSON.parse(savedSettings);
      setTheme(theme);
    }
  }, []);

  const getTabStyle = (tabName) => {
    return `flex items-center justify-center p-4 ${
      activeTab === tabName
        ? 'bg-blue-500 text-white'
        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
    } transition-colors duration-200`;
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'}`}>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-8 text-center">RememberMe</h1>
        <div className="flex mb-8">
          <button className={getTabStyle('items')} onClick={() => setActiveTab('items')}><List className="mr-2" /> アイテム</button>
          <button className={getTabStyle('camera')} onClick={() => setActiveTab('camera')}><CheckSquare className="mr-2" /> カメラ</button>
          <button className={getTabStyle('reminder')} onClick={() => setActiveTab('reminder')}><Calendar className="mr-2" /> リマインダー</button>
          <button className={getTabStyle('tasks')} onClick={() => setActiveTab('tasks')}><Clock className="mr-2" /> タスク</button>
          <button className={getTabStyle('profile')} onClick={() => setActiveTab('profile')}><User className="mr-2" /> 設定</button>
        </div>
        <TransitionGroup>
          <CSSTransition key={activeTab} classNames="fade" timeout={300}>
            <div className="bg-white shadow-lg rounded-lg p-6">
              {activeTab === 'items' && <ItemList />}
              {activeTab === 'reminder' && <Reminder />}
              {activeTab === 'tasks' && <TaskManager />}
              {activeTab === 'profile' && <UserSettings />}
            </div>
          </CSSTransition>
        </TransitionGroup>
      </div>
    </div>
  );
}

export default App;