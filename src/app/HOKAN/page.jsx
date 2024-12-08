import Link from "next/link";

export default function Home() {
  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
        backgroundColor: "#f7f9fc", // 背景色設定
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* 左上のIT Trip Navigator */}
      <h1
        style={{
          position: "absolute",
          top: "40px",
          left: "40px",
          color: "#1BB0E7",
          fontWeight: "bold",
          fontSize: "1.5em",
        }}
      >
        IT Trip Navigator
      </h1>

      {/* 中央のテキストとイメージ */}
      <div style={{ textAlign: "left", marginBottom: "60px",width:"80%" }}>
        <h2 style={{ fontWeight: "bold", fontSize: "2em", marginBottom: "12px" }}>
          ITフリーランサーを活用して<br />
          顧客のデジタル化支援を
        </h2>
   
        <p style={{ marginBottom: "24px", fontSize: "1em", color: "#666" }}>
          商談前事前アンケートを活用して、顧客の商談体験を変えませんか？
        </p>
        <img
          src="/business-team.svg" // 適切なイラストを配置
          alt="Team working"
          style={{ maxWidth: "40%", borderRadius: "8px" }}
        />
      </div>

      {/* 左下の業種・規模を選択ボタン */}
      <Link href="/select">
        <button
          style={{
            position: "absolute",
            bottom: "150px",
            left: "160px",
            backgroundColor: "#1BB0E7",
            color: "white",
            border: "none",
            borderRadius: "5px",
            padding: "12px 20px",
            fontSize: "1em",
            cursor: "pointer",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          業種・規模を選択
        </button>
      </Link>
    </div>
  );
}
