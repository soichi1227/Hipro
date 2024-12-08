"use client";

import React, { useState, useEffect } from "react"; // useEffectをインポート
import { useRouter } from "next/navigation";

const NewQuestionnaireScreen = () => {
  const [selectedCount, setSelectedCount] = useState(0);
  const [checkedItems, setCheckedItems] = useState({});
  const [priority1, setPriority1] = useState("");
  const [questions, setQuestions] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // 優先度1の選択肢をlocalStorageから取得
    const savedPriority = localStorage.getItem("priority1");

    // データが取得できなかった場合のフォールバック処理
    if (!savedPriority) {
      setPriority1("該当データなし");
      setQuestions(["該当データがありません"]);
      return;
    }

    setPriority1(savedPriority);

    // 優先度1に基づいた質問データ
    const questionData = {
      "基幹システム、業務システム周辺の課題": [
        "基幹システムの統合を進める上での課題は？",
        "既存システムの老朽化への対応方法は？",
        "ERP導入における課題点を教えてください。",
        "ERP導入における課題点を教えてください。",
        "ERP導入における課題点を教えてください。",
        "ERP導入における課題点を教えてください。",
      ],
      "データ管理と活用の課題": [
        "データガバナンスの現状は？",
        "データ分析ツールの活用状況について教えてください。",
        "データサイロ化を解消するための取り組みは？",
        "データサイロ化を解消するための取り組みは？",
        "データサイロ化を解消するための取り組みは？",
        "データサイロ化を解消するための取り組みは？",
      ],
      "ITインフラ周辺の課題": [
        "ITインフラの最適化における課題は？",
        "クラウド移行に関する障害点は何ですか？",
        "ネットワークセキュリティの現状について教えてください。",
        "ネットワークセキュリティの現状について教えてください。",
        "ネットワークセキュリティの現状について教えてください。",
        "ネットワークセキュリティの現状について教えてください。",
      ],
    };

    setQuestions(questionData[savedPriority] || ["該当データがありません"]);
  }, []);

  const handleCheckboxChange = (event, index) => {
    const isChecked = event.target.checked;

    if (isChecked && selectedCount < 3) {
      setSelectedCount(selectedCount + 1);
      setCheckedItems({ ...checkedItems, [index]: true });
    } else if (!isChecked) {
      setSelectedCount(selectedCount - 1);
      const updatedItems = { ...checkedItems };
      delete updatedItems[index];
      setCheckedItems(updatedItems);
    } else {
      event.target.checked = false; // 最大選択数制限
      alert("最大3つまで選択可能です。");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push("/thank"); // 最終画面に遷移
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
        padding: "20px",
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ color: "#007BFF", marginBottom: "20px" }}>IT Trip Navigator</h1>
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        <h2 style={{ fontSize: "18px", marginBottom: "20px" }}>商談前アンケート</h2>
        <p style={{ fontSize: "14px", color: "#555", marginBottom: "20px" }}>
          商談の前に、貴社にとって有益な情報をお聞かせください。
        </p>

        <p
          style={{
            fontSize: "16px",
            color: "#333",
            fontWeight: "bold",
            marginBottom: "20px",
            textAlign: "left",
          }}
        >
          Q. 優先度1「{priority1}」に関して、<br />
          貴社に当てはまる状況を最大3つ選択してください。
        </p>

        <form onSubmit={handleSubmit}>
          {questions.map((question, index) => (
            <div key={index} style={{ marginBottom: "10px", textAlign: "left" }}>
              <label style={{ cursor: "pointer" }}>
                <input
                  type="checkbox"
                  style={{ marginRight: "10px" }}
                  onChange={(event) => handleCheckboxChange(event, index)}
                  checked={!!checkedItems[index]}
                />
                {question}
              </label>
            </div>
          ))}

          <button
            type="submit"
            style={{
              backgroundColor: "#007BFF",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              padding: "10px 20px",
              fontSize: "16px",
              cursor: "pointer",
              marginTop: "20px",
            }}
          >
            送信する
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewQuestionnaireScreen;
