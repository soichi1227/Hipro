"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // useRouterをインポート

const ITTripNavigator = () => {
  const router = useRouter(); // useRouterフックを使用
  const [selectedCount, setSelectedCount] = useState(0);
  const [priorities, setPriorities] = useState({});
  
  const handleCheckboxChange = (event, index) => {
    const isChecked = event.target.checked;

    if (isChecked && selectedCount < 3) {
      setSelectedCount(selectedCount + 1);
      setPriorities((prevPriorities) => {
        // Find the smallest available priority number
        const usedPriorities = Object.values(prevPriorities);
        const newPriority = [1, 2, 3].find((p) => !usedPriorities.includes(p));
        return { ...prevPriorities, [index]: newPriority };
      });
    } else if (!isChecked) {
      setSelectedCount(selectedCount - 1);
      setPriorities((prevPriorities) => {
        const updatedPriorities = { ...prevPriorities };
        delete updatedPriorities[index];

        // Reorder priorities to fill gaps
        const sortedEntries = Object.entries(updatedPriorities).sort(
          ([, a], [, b]) => a - b
        );
        const reorderedPriorities = {};
        sortedEntries.forEach(([key], i) => {
          reorderedPriorities[key] = i + 1;
        });

        return reorderedPriorities;
      });
    } else {
      event.target.checked = false; // Prevent checking if limit reached
      alert('選択肢は最大3つまでです。');
    }
  };

  const navigateToNextPage = (e) => {
    e.preventDefault(); // デフォルトのフォーム送信を防ぐ

    const priority1 = Object.keys(priorities).find(
      (key) => priorities[key] === 1
    );

    if (priority1) {
      const selectedOption = [
        "基幹システム、業務システム周辺の課題",
        "データ管理と活用の課題",
        "ITインフラ周辺の課題",
        "情報セキュリティやITガバナンスの課題",
        "生産現場の省人化・業務効率化に向けたIT化の課題",
        "サプライチェーン最適化の課題",
        "ITサポート・現場対応の課題",
        "新規事業や既存製品のソフトウェア化やソリューション化などの課題",
        "デジタル人材育成の課題",
      ][priority1];

      localStorage.setItem("priority1", selectedOption); // 優先度1の選択肢を保存
    }

    router.push("/question2");
  };

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
      padding: '20px',
      backgroundColor: '#f9f9f9',
      minHeight: '100vh',
    }}>
      {/* Main heading of the page */}
      <h1 style={{ color: '#007BFF', marginBottom: '20px' }}>IT Trip Navigator</h1>
      <div
        style={{
          backgroundColor: '#ffffff',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          maxWidth: '400px',
          margin: '0 auto',
        }}
      >
        {/* Section title */}
        <h2 style={{ fontSize: '18px', marginBottom: '20px' }}>商談前アンケート</h2>
        {/* Instructional text */}
        <p style={{ fontSize: '14px', color: '#555', marginBottom: '20px' }}>
          商談の場で、貴社にとって有益な情報をお伝えさせてください
        </p>
        <p style={{ fontSize: '14px', color: '#555', marginBottom: '20px' }}>
          Q. 現在取り組んでいる、または、1年以内に解決したいIT課題はなんですか？
          <br />
          優先度の高い課題から順に最大3つ選択ください。
        </p>

        <form>
          {/* List of questions */}
          {[
            '基幹システム、業務システム周辺の課題',
            'データ管理と活用の課題',
            'ITインフラ周辺の課題',
            '情報セキュリティやITガバナンスの課題',
            '生産現場の省人化・業務効率化に向けたIT化の課題',
            'サプライチェーン最適化の課題',
            'ITサポート・現場対応の課題',
            '新規事業や既存製品のソフトウェア化やソリューション化などの課題',
            'デジタル人材育成の課題',
          ].map((item, index) => (
            <div key={index} style={{ marginBottom: '10px', textAlign: 'left' }}>
              <label style={{ cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  style={{ marginRight: '10px' }}
                  onChange={(event) => handleCheckboxChange(event, index)}
                />
                {item} {priorities[index] ? `(優先度: ${priorities[index]})` : ''}
              </label>
            </div>
          ))}

          {/* Submit button */}
          <button
            onClick={navigateToNextPage}
            style={{
              backgroundColor: '#007BFF',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer',
              marginTop: '20px',
            }}
          >
            次へ
          </button>
        </form>
      </div>
    </div>
  );
};

export default ITTripNavigator;
