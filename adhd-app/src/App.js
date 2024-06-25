import React, { useState } from 'react';
import ItemList from './components/ItemList';
import Reminder from './components/Reminder';
import TaskManager from './components/TaskManager';
import UserSettings from './components/UserSettings';
import { List, Calendar, Clock, Settings } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('items');

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'items':
        return <ItemList />;
      case 'reminders':
        return <Reminder />;
      case 'tasks':
        return <TaskManager />;
      case 'settings':
        return <UserSettings />;
      default:
        return <ItemList />;
    }
  };

  return (
    <div className="App flex flex-col h-screen max-w-[393px] mx-auto bg-white">
      <header className="bg-blue-500 text-white py-4 px-6">
        <h1 className="text-2xl font-bold">RememberMe</h1>
      </header>
      <main className="flex-grow overflow-y-auto">
        {renderActiveComponent()}
      </main>
      <nav className="flex justify-around items-center bg-gray-100 py-2 px-4 border-t border-gray-200">
        <button 
          onClick={() => setActiveTab('items')} 
          className={`flex flex-col items-center ${activeTab === 'items' ? 'text-blue-500' : 'text-gray-600'}`}
        >
          <List size={24} />
          <span className="text-xs mt-1">アイテム</span>
        </button>
        <button 
          onClick={() => setActiveTab('reminders')} 
          className={`flex flex-col items-center ${activeTab === 'reminders' ? 'text-blue-500' : 'text-gray-600'}`}
        >
          <Calendar size={24} />
          <span className="text-xs mt-1">リマインダー</span>
        </button>
        <button 
          onClick={() => setActiveTab('tasks')} 
          className={`flex flex-col items-center ${activeTab === 'tasks' ? 'text-blue-500' : 'text-gray-600'}`}
        >
          <Clock size={24} />
          <span className="text-xs mt-1">タスク</span>
        </button>
        <button 
          onClick={() => setActiveTab('settings')} 
          className={`flex flex-col items-center ${activeTab === 'settings' ? 'text-blue-500' : 'text-gray-600'}`}
        >
          <Settings size={24} />
          <span className="text-xs mt-1">設定</span>
        </button>
      </nav>
    </div>
  );
}

export default App;