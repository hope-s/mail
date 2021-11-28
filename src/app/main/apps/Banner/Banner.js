import React from "react";
import "./Banner.css"


const Banner = () => {
  return (
    <div class="login-box">
      <h2>New Banner</h2>
      <form>
        <div class="user-box">
          <input type="text" name="" required="required" />
          <label>Banner Title</label>
        </div>
        <div class="user-box">
          <input type="text" name="" required="required" />
          <label>Banner Link</label>
        </div>
        <div class="user-box">
          <input type="text" name="" required="required" />
          <label>Banner Image Link</label>
        </div>
        <div class="user-box">
          <input type="date" name="" required />
          <label className="bannerLabel">Banner Start Day</label>
        </div>
        <div class="user-box">
          <input type="time" name="" required />
          <label className="bannerLabel">Banner Start Time</label>
        </div>
        <div class="user-box">
          <input type="time" name="" required />
          <label className="bannerLabel">Banner Finish Time</label>
        </div>
        <a href="apps/chat">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Submit
        </a>
      </form>
    </div>
  );
};

export default Banner;
