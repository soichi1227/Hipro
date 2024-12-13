"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const SelectDatePage = ({ params }) => {
  const router = useRouter();
  const { id: dealId } = params;
  const [candidateDates, setCandidateDates] = useState([]);
  const [duration, setDuration] = useState("");
  const [meetingMethod, setMeetingMethod] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!dealId) {
      setError("Invalid deal ID");
      return;
    }

    const fetchCandidateData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/customer/select_date/${dealId}`
        );
        if (!response.ok) throw new Error("データ取得に失敗しました");

        const data = await response.json();
        const formattedDates = data.candidates.map((candidate) => candidate.start);

        setCandidateDates(formattedDates);
        setDuration(data.duration);
        setMeetingMethod(data.meeting_method);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCandidateData();
  }, [dealId]);

  const handleCheckboxChange = (index) => {
    setSelectedIndex(index);
  };

  const handleNavigate = async (e) => {
    e.preventDefault();

    if (selectedIndex !== null) {
      const selectedDate = candidateDates[selectedIndex];

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

        // 確定後、別画面に遷移
        router.push("/question");
      } catch (error) {
        setError(error.message);
      }
    }
  };

  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>商談候補日時の選択</h1>
      <p>商談方法: {meetingMethod || "読み込み中..."}</p>
      <p>所要時間: {duration || "読み込み中..."}</p>
      {candidateDates.length > 0 ? (
        <form>
          {candidateDates.map((date, index) => (
            <div key={index}>
              <label>
                <input
                  type="radio"
                  name="candidateDate"
                  checked={selectedIndex === index}
                  onChange={() => handleCheckboxChange(index)}
                />
                {date}
              </label>
            </div>
          ))}
          <button onClick={handleNavigate}>日時を確定する</button>
        </form>
      ) : (
        <p>候補日を読み込み中...</p>
      )}
    </div>
  );
};

export default SelectDatePage;
