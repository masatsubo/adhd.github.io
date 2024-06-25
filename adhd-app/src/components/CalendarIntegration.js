import React, { useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { google } from 'googleapis';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';

const CalendarIntegration = ({ addToItemList }) => {
  const [events, setEvents] = useState([]);
  const [suggestedItems, setSuggestedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)); // 1 week from now

  const onSuccess = async (res) => {
    setLoading(true);
    setError(null);
    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: res.access_token });

    const calendar = google.calendar({ version: 'v3', auth });
    
    try {
      const response = await calendar.events.list({
        calendarId: 'primary',
        timeMin: startDate.toISOString(),
        timeMax: endDate.toISOString(),
        singleEvents: true,
        orderBy: 'startTime',
      });
      
      setEvents(response.data.items);
      suggestItems(response.data.items);
    } catch (error) {
      console.error('Error fetching calendar events:', error);
      setError('カレンダーイベントの取得に失敗しました。もう一度お試しください。');
    } finally {
      setLoading(false);
    }
  };

  const suggestItems = (events) => {
    // より高度な持ち物サジェストロジックをここに実装
    // 例: 簡単なキーワードマッチング（実際の実装ではより高度なロジックを使用）
    const suggestions = events.flatMap(event => {
      const items = [];
      const summary = event.summary.toLowerCase();
      if (summary.includes('meeting')) {
        items.push('ノートPC', 'ペン', 'ノート');
      }
      if (summary.includes('gym')) {
        items.push('運動着', 'タオル', '水筒');
      }
      if (summary.includes('travel') || summary.includes('trip')) {
        items.push('パスポート', '充電器', '洗面用具');
      }
      // 他のキーワードと持ち物の組み合わせを追加
      return items;
    });
    
    setSuggestedItems([...new Set(suggestions)]); // 重複を削除
  };

  const handleAddToItemList = (item) => {
    addToItemList(item);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">カレンダー連携</h2>
      <div className="flex space-x-4 mb-4">
        <DatePicker
          selected={startDate}
          onChange={setStartDate}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholderText="開始日"
        />
        <DatePicker
          selected={endDate}
          onChange={setEndDate}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          placeholderText="終了日"
        />
      </div>
      <GoogleLogin
        onSuccess={onSuccess}
        onError={() => setError('ログインに失敗しました。もう一度お試しください。')}
        render={renderProps => (
          <Button onClick={renderProps.onClick} disabled={renderProps.disabled || loading}>
            {loading ? 'Loading...' : 'Googleでログイン'}
          </Button>
        )}
      />
      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertTitle>エラー</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {events.length > 0 && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">今後の予定</h3>
          <ul className="list-disc pl-5">
            {events.map((event, index) => (
              <li key={index} className="mb-1">
                {event.summary} - {new Date(event.start.dateTime).toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      )}
      {suggestedItems.length > 0 && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">推奨持ち物</h3>
          <ul className="list-disc pl-5">
            {suggestedItems.map((item, index) => (
              <li key={index} className="mb-1 flex items-center justify-between">
                {item}
                <Button
                  onClick={() => handleAddToItemList(item)}
                  size="sm"
                  variant="outline"
                >
                  リストに追加
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CalendarIntegration;