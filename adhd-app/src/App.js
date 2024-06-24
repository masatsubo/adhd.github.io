import React, { useState } from 'react';
import { List, CheckSquare, Calendar, Clock, User } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('items');
  const [items] = useState(['財布', 'スマートフォン', '鍵']);

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">RememberMe</h1>
      <div className="flex justify-between mb-4">
        <button onClick={() => setActiveTab('items')}><List /></button>
        <button onClick={() => setActiveTab('camera')}><CheckSquare /></button>
        <button onClick={() => setActiveTab('calendar')}><Calendar /></button>
        <button onClick={() => setActiveTab('tasks')}><Clock /></button>
        <button onClick={() => setActiveTab('profile')}><User /></button>
      </div>
      {activeTab === 'items' && (
        <ul>
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
