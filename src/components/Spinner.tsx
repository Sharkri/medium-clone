import "../css/Spinner.css";

export default function Spinner() {
  return (
    <div className="loading-container">
      <div id="loading-bar-spinner" className="spinner">
        <div className="spinner-icon" />
      </div>
    </div>
  );
}
