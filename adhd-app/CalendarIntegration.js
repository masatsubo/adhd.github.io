import React, { useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { google } from 'googleapis';

const CalendarIntegration = () => {
  const [events, setEvents] = useState([]);
  const [suggestedItems, setSuggestedItems] = useState([]);

  const onSuccess = async (res) => {
    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: res.access_token });

    const calendar = google.calendar({ version: 'v3', auth });
    
    try {
      const response = await calendar.events.list({
        calendarId: 'primary',
        timeMin: (new Date()).toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime',
      });
      
      setEvents(response.data.items);
      suggestItems(response.data.items);
    } catch (error) {
      console.error('Error fetching calendar events:', error);
    }
  };

  const suggestItems = (events) => {
    // この関数で予定に基づいて持ち物をサジェスト
    // 例: 簡単なキーワードマッチング
    const suggestions = events.flatMap(event => {
      const items = [];
      if (event.summary.toLowerCase().includes('meeting')) {
        items.push('ノートPC', 'ペン', 'ノート');
      }
      if (event.summary.toLowerCase().includes('gym')) {
        items.push('運動着', 'タオル', '水筒');
      }
      // 他のキーワードと持ち物の組み合わせを追加
      return items;
    });
    
    setSuggestedItems([...new Set(suggestions)]); // 重複を削除
  };

  return (
    <div>
      <h2>カレンダー連携</h2>
      <GoogleLogin
        onSuccess={onSuccess}
        onError={() => console.log('Login Failed')}
      />
      {events.length > 0 && (
        <div>
          <h3>今後の予定</h3>
          <ul>
            {events.map((event, index) => (
              <li key={index}>{event.summary} - {new Date(event.start.dateTime).toLocaleString()}</li>
            ))}
          </ul>
        </div>
      )}
      {suggestedItems.length > 0 && (
        <div>
          <h3>推奨持ち物</h3>
          <ul>
            {suggestedItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CalendarIntegration;