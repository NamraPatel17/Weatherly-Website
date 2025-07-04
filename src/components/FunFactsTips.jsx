import React, { useState } from "react";
import "./FunFactsTips.css";

const factsAndTips = [
  "Did you know? The highest temperature ever recorded on Earth was 56.7°C (134°F) in Death Valley, USA.",
  "Tip: Carry an umbrella if the forecast shows rain!",
  "Did you know? Lightning can heat the air to over 30,000°C (54,000°F).",
  "Tip: UV rays are strongest between 10am and 4pm. Wear sunscreen!",
  "Did you know? The coldest temperature ever recorded was -89.2°C (-128.6°F) in Antarctica.",
  "Tip: Humidity makes hot days feel hotter and cold days feel colder.",
  "Did you know? Raindrops can fall at speeds of about 22 miles per hour.",
  "Tip: Check the AQI before outdoor activities if you have respiratory issues.",
  "Did you know? Snowflakes always have six sides.",
  "Tip: Dress in layers to stay warm in cold weather."
];

function getRandomFact() {
  return factsAndTips[Math.floor(Math.random() * factsAndTips.length)];
}

function FunFactsTips() {
  const [fact, setFact] = useState(getRandomFact());

  const handleNewFact = () => {
    let newFact;
    do {
      newFact = getRandomFact();
    } while (newFact === fact);
    setFact(newFact);
  };

  return (
    <div className="fun-facts-card">
      <div className="fun-facts-title">Fun Fact & Tip</div>
      <div className="fun-facts-content">{fact}</div>
      <button className="fun-facts-btn" onClick={handleNewFact}>
        Show Another
      </button>
    </div>
  );
}

export default FunFactsTips;

