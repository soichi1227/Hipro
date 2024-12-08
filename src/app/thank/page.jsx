"use client";

import React, { useEffect, useState } from 'react';

const ThankYouScreen = () => {
  // 営業担当名とメールアドレスのダミーデータ
  const salesRepName = "中村 宗一朗"; // 営業担当名
  const salesRepEmail = "sss738223@gmail.com"; // 営業担当のメールアドレス

  // 保存された日時と商談方法の状態を保持
  const [selectedDate, setSelectedDate] = useState('');
  const [meetingMethod, setMeetingMethod] = useState('');

  // localStorage変更時に状態を更新する関数
  const handleStorageChange = () => {
    const date = localStorage.getItem('selectedDate');
    const method = localStorage.getItem('meetingMethod');
    setSelectedDate(date || '未選択');
    setMeetingMethod(method || '未選択');
    console.log('Storage updated:', { selectedDate: date, meetingMethod: method });
  };

  // 初期データ取得とstorageイベントリスナー設定
  useEffect(() => {
    // 初期データの取得
    handleStorageChange();

    // storageイベントの監視
    window.addEventListener('storage', handleStorageChange);

    // クリーンアップ: イベントリスナーを削除
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
      padding: '20px',
      backgroundColor: '#f9f9f9',
      minHeight: '100vh',
    }}>
      <h1 style={{ color: '#333', marginBottom: '20px' }}>ご回答ありがとうございます</h1>
      <p style={{ fontSize: '16px', color: '#555', marginBottom: '40px' }}>
        担当より会議リンクを送付いたします
      </p>

      <div
        style={{
          backgroundColor: '#f4f4f4',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          maxWidth: '400px',
          margin: '0 auto',
          textAlign: 'left',
        }}
      >
        <p style={{ fontSize: '14px', color: '#555', margin: '5px 0' }}>
          お打ち合わせ日時：<span style={{ color: '#4CAF50', fontWeight: 'bold' }}>{selectedDate}</span>
        </p>
        <p style={{ fontSize: '14px', color: '#555', margin: '5px 0' }}>
          お打ち合わせ方法：<span style={{ color: '#333', fontWeight: 'bold' }}>{meetingMethod}</span>
        </p>
        <p style={{ fontSize: '14px', color: '#555', margin: '5px 0' }}>
          営業担当：<span style={{ color: '#333', fontWeight: 'bold' }}>{salesRepName}</span>
        </p>
        <p style={{ fontSize: '14px', color: '#555', margin: '5px 0' }}>
          メールアドレス：<span style={{ color: '#333', fontWeight: 'bold' }}>{salesRepEmail}</span>
        </p>
      </div>
    </div>
  );
};

export default ThankYouScreen;
