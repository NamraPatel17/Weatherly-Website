import React from "react";
import "./AQICard.css";

function getAQIStatus(aqi) {
  if (aqi === 1) return { label: "Good", color: "#4caf50" };
  if (aqi === 2) return { label: "Fair", color: "#8bc34a" };
  if (aqi === 3) return { label: "Moderate", color: "#ffeb3b" };
  if (aqi === 4) return { label: "Poor", color: "#ff9800" };
  if (aqi === 5) return { label: "Very Poor", color: "#f44336" };
  return { label: "--", color: "#bbb" };
}

function AQICard({ aqi, loading }) {
  let aqiValue = "--";
  let status = { label: "--", color: "#bbb" };

  if (aqi && aqi.list && aqi.list.length > 0) {
    aqiValue = aqi.list[0].main.aqi;
    status = getAQIStatus(aqiValue);
  }

  return (
    <div className="aqi-card">
      <div className="aqi-title">Air Quality Index</div>
      <div className="aqi-value" style={{ color: status.color }}>
        {loading ? "Loading..." : aqiValue}
      </div>
      <div className="aqi-status" style={{ color: status.color }}>
        {loading ? "" : status.label}
      </div>
    </div>
  );
}

export default AQICard;
