import React, { useState, useEffect } from 'react';

const UserSettings = () => {
  const [settings, setSettings] = useState({
    username: '',
    theme: 'light',
    notifications: true,
  });

  useEffect(() => {
    // ローカルストレージから設定を読み込む
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prevSettings => ({
      ...prevSettings,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const saveSettings = () => {
    // ローカルストレージに設定を保存
    localStorage.setItem('userSettings', JSON.stringify(settings));
    alert('設定が保存されました');
  };

  return (
    <div>
      <h2>ユーザー設定</h2>
      <div>
        <label>
          ユーザー名:
          <input
            type="text"
            name="username"
            value={settings.username}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          テーマ:
          <select name="theme" value={settings.theme} onChange={handleChange}>
            <option value="light">ライト</option>
            <option value="dark">ダーク</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          通知:
          <input
            type="checkbox"
            name="notifications"
            checked={settings.notifications}
            onChange={handleChange}
          />
        </label>
      </div>
      <button onClick={saveSettings}>設定を保存</button>
    </div>
  );
};

export default UserSettings;