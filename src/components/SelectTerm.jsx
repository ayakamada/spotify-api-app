export default function SelectTerm({ activeTerm, handleClick }) {
  return (
    <div className="btn-group">
      <button className={`btn ${activeTerm === "short" ? "btn-active" : ""}`} onClick={() => handleClick("short")}>
        SHORT
      </button>
      <button className={`btn ${activeTerm === "medium" ? "btn-active" : ""}`} onClick={() => handleClick("medium")}>
        MEDIUM
      </button>
      <button className={`btn ${activeTerm === "long" ? "btn-active" : ""}`} onClick={() => handleClick("long")}>
        LONG
      </button>
    </div>
  );
}
