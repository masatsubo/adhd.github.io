import React, { useState } from 'react';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ name: '', dueDate: '', priority: 'medium' });

  const addTask = () => {
    if (newTask.name.trim() !== '') {
      setTasks([...tasks, { ...newTask, id: Date.now(), completed: false }]);
      setNewTask({ name: '', dueDate: '', priority: 'medium' });
    }
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div>
      <h2>タスク管理</h2>
      <input
        type="text"
        value={newTask.name}
        onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
        placeholder="新しいタスク"
      />
      <input
        type="date"
        value={newTask.dueDate}
        onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
      />
      <select
        value={newTask.priority}
        onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
      >
        <option value="low">低</option>
        <option value="medium">中</option>
        <option value="high">高</option>
      </select>
      <button onClick={addTask}>タスクを追加</button>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskCompletion(task.id)}
            />
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
              {task.name} - 期限: {task.dueDate}, 優先度: {task.priority}
            </span>
            <button onClick={() => removeTask(task.id)}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;