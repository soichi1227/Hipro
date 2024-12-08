"use client"; // Next.jsでクライアントコンポーネントとして動作

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation"; // ルーティング用フックをインポート

const ITTripNavigator = () => {
  const router = useRouter(); // ルーターインスタンスを取得
  const searchParams = useSearchParams(); // URLのクエリパラメータを取得
  const dealId = searchParams.get("deal_id"); // URLからdeal_idを取得
  const [candidateDates, setCandidateDates] = useState([]); // 候補日時
  const [duration, setDuration] = useState(""); // 所要時間
  const [meetingMethod, setMeetingMethod] = useState(""); // 商談方法
  const [selectedIndex, setSelectedIndex] = useState(null); // 選択されたインデックス

  useEffect(() => {
    if (!dealId) return; // deal_idがロードされるまで処理をスキップ

    const fetchCandidateData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/customer/select_date/${dealId}`
        );
        if (!response.ok) throw new Error("データ取得に失敗しました");

        const data = await response.json();
        const formattedDates = data.candidates.map(
          (candidate) => `${candidate.start}`
        );

        setCandidateDates(formattedDates);
        setDuration(data.duration);
        setMeetingMethod(data.meeting_method);
      } catch (error) {
        console.error("データ取得に失敗しました:", error);
      }
    };

    fetchCandidateData();
  }, [dealId]);

  const handleCheckboxChange = (index) => {
    setSelectedIndex(index); // 選択されたインデックスを保存
  };

  const handleNavigate = async (e) => {
    e.preventDefault();

    if (selectedIndex !== null) {
      const selectedDate = candidateDates[selectedIndex]; // 選択された日時

      try {
        const response = await fetch("http://localhost:5000/customer/confirm_date", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            deal_id: dealId,
            selected_date_time: selectedDate,
          }),
        });

        if (!response.ok) throw new Error("日時の保存に失敗しました");

        const result = await response.json();
        console.log(result.message);
        localStorage.setItem("selectedDate", selectedDate);
        localStorage.setItem("meetingMethod", meetingMethod);

        router.push("/question");
      } catch (error) {
        console.error("日時の保存に失敗しました:", error);
      }
    }
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
          maxWidth: "400px",
          margin: "0 auto",
        }}
      >
        <h2 style={{ fontSize: "18px", marginBottom: "20px" }}>商談候補日時</h2>
        <p style={{ fontSize: "14px", color: "#555", marginBottom: "10px" }}>
          都合のよい日程を選択ください。
        </p>
        <p style={{ fontSize: "14px", color: "#555", marginBottom: "10px" }}>
          商談方法: <strong>{meetingMethod || "データ取得中..."}</strong>
        </p>
        <p style={{ fontSize: "14px", color: "#555", marginBottom: "20px" }}>
          所要時間: <strong>{duration || "データ取得中..."}</strong>
        </p>

        <form>
          {candidateDates.length > 0 ? (
            candidateDates.map((date, index) => (
              <div key={index} style={{ marginBottom: "10px", textAlign: "left" }}>
                <label style={{ cursor: "pointer" }}>
                  <input
                    type="radio"
                    name="candidateDate"
                    style={{ marginRight: "10px" }}
                    checked={selectedIndex === index}
                    onChange={() => handleCheckboxChange(index)}
                  />
                  {date}
                </label>
              </div>
            ))
          ) : (
            <p style={{ fontSize: "14px", color: "#555" }}>候補日を取得中...</p>
          )}

          <button
            onClick={handleNavigate} // クリック時にルーティング処理を実行
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
            日時を確定する
          </button>
        </form>
      </div>
    </div>
  );
};

export default ITTripNavigator;
