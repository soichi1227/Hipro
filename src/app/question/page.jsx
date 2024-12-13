"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const ITTripNavigator = ({ industry, revenue }) => {
  const router = useRouter();
  const [questions, setQuestions] = useState([]);
  const [selectedCount, setSelectedCount] = useState(0);
  const [priorities, setPriorities] = useState({});

  // Flask APIから設問データを取得
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/survey_items?industry=${encodeURIComponent(
            industry
          )}&revenue=${encodeURIComponent(revenue)}`
        );
        if (!response.ok) throw new Error("設問データの取得に失敗しました");
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchQuestions();
  }, [industry, revenue]);

  const handleCheckboxChange = (event, index) => {
    const isChecked = event.target.checked;

    if (isChecked && selectedCount < 3) {
      setSelectedCount(selectedCount + 1);
      setPriorities((prevPriorities) => {
        const usedPriorities = Object.values(prevPriorities);
        const newPriority = [1, 2, 3].find((p) => !usedPriorities.includes(p));
        return { ...prevPriorities, [index]: newPriority };
      });
    } else if (!isChecked) {
      setSelectedCount(selectedCount - 1);
      setPriorities((prevPriorities) => {
        const updatedPriorities = { ...prevPriorities };
        delete updatedPriorities[index];
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
      event.target.checked = false;
      alert("選択肢は最大3つまでです。");
    }
  };

  const navigateToNextPage = (e) => {
    e.preventDefault();

    const priority1 = Object.keys(priorities).find(
      (key) => priorities[key] === 1
    );

    if (priority1) {
      const selectedOption = questions[priority1]?.question || "";
      localStorage.setItem("priority1", selectedOption);
    }

    router.push("/question2");
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#f9f9f9" }}>
      <h1>IT Trip Navigator</h1>
      <form>
        {questions.length > 0 ? (
          questions.map((item, index) => (
            <div key={item.id} style={{ marginBottom: "10px" }}>
              <label>
                <input
                  type="checkbox"
                  onChange={(event) => handleCheckboxChange(event, index)}
                />
                {item.question}{" "}
                {priorities[index] ? `(優先度: ${priorities[index]})` : ""}
              </label>
            </div>
          ))
        ) : (
          <p>設問を読み込み中...</p>
        )}

        <button onClick={navigateToNextPage}>次へ</button>
      </form>
    </div>
  );
};

export default ITTripNavigator;
