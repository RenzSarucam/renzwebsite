"use client";

import { useEffect, useState } from "react";

export default function Masthead() {
  const [today, setToday] = useState("");

  useEffect(() => {
    setToday(
      new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })
    );
  }, []);

  return (
    <div className="masthead wrap" id="top">
      <div className="mast-top label">
        <span>Davao City, Philippines</span>
        <span>The Investigation Phase</span>
        <span>Est. 2023</span>
      </div>
      <h2 className="mast-name">Renz Carljansen Sarucam</h2>
      <p className="mast-tag">The Case File of a Full-Stack &amp; DevOps Engineer</p>
      <div className="mast-dateline label">
        <span className="mast-date">{today || " "}</span>
        <i aria-hidden="true">•</i>
        <span>Vol. IV</span>
        <i aria-hidden="true">•</i>
        <span>Selected Works &amp; Case Notes</span>
        <i aria-hidden="true">•</i>
        <span>Price: One Kape</span>
      </div>
    </div>
  );
}
