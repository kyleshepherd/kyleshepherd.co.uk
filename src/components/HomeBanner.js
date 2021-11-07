import React from "react";
import "./HomeBanner.css";

function HomeBanner() {
  return (
    <div className="homeBanner">
      <h2 className="role">Frontend Engineer</h2>
      <h3>
        <span>Currently</span>
        <br></br>
        Frontend Engineer at SOON_
      </h3>
      <h3>
        <span>Building with</span>
        <br></br>
        Svelte, React & Go
      </h3>
      <h3>
        <span>Based in</span>
        <br></br>
        Falmouth, UK
      </h3>
    </div>
  );
}

export default HomeBanner;
