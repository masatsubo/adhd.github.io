import React, { useState } from 'react';

const Reminder = () => {
  const [reminders, setReminders] = useState([]);
  const [newReminder, setNewReminder] = useState({ text: '', date: '' });

  const addReminder = () => {
    if (newReminder.text.trim() !== '' && newReminder.date !== '') {
      setReminders([...reminders, { ...newReminder, id: Date.now() }]);
      setNewReminder({ text: '', date: '' });
    }
  };

  const removeReminder = (id) => {
    setReminders(reminders.filter(reminder => reminder.id !== id));
  };

  return (
    <div>
      <h2>リマインダー</h2>
      <input
        type="text"
        value={newReminder.text}
        onChange={(e) => setNewReminder({ ...newReminder, text: e.target.value })}
        placeholder="リマインダーの内容"
      />
      <input
        type="datetime-local"
        value={newReminder.date}
        onChange={(e) => setNewReminder({ ...newReminder, date: e.target.value })}
      />
      <button onClick={addReminder}>追加</button>
      <ul>
        {reminders.map(reminder => (
          <li key={reminder.id}>
            {reminder.text} - {new Date(reminder.date).toLocaleString()}
            <button onClick={() => removeReminder(reminder.id)}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reminder;