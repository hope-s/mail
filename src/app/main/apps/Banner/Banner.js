import { Button } from "@material-ui/core";
import React from "react";
import "./Banner.css";
import { useHistory } from "react-router-dom";
import createBannerUseQuery from "../../../../core/services/api/CreateBanner.api";
import { showToast } from "core/utils/show-toast";


const Banner = () => {

  const createBannerQuery = createBannerUseQuery();
  let history = useHistory();

  const handleBannerSubmit = (e) => {
    e.preventDefault();
    createBannerQuery.mutate(
      {
        title: e.target[0].value,
        link: e.target[1].value,
        image: e.target[2].files[0],
      },
      {
        onSuccess: (result) => {
          showToast(["Banner was created"], "success");
          // history.push("/apps/chat");
        },
      }
    );
    
  };

  return (
    <div class="login-box">
      <h2>New Banner</h2>
      <form onSubmit={handleBannerSubmit}>
        <div class="user-box">
          <input type="text" name="" required="required" />
          <label>Banner Title</label>
        </div>
        <div class="user-box">
          <input type="text" name="" required="required" />
          <label>Banner Link</label>
        </div>
        <div class="file-input">
          <input
            style={{ display: "none" }}
            accept="image/*"
            id="contained-button-file"
            multiple
            type="file"
          />
          <label className="imgLabel">Banner Image</label>
          <label className="imgLabel" htmlFor="contained-button-file">
            <Button
              className="mt-5 bg-indigo-dark imgButton"
              variant="contained"
              color="secondary"
              component="span"
            >
              Upload
            </Button>
          </label>
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
        <button type="submit" className="btn btn-primary text-white">
          {/* <a className="no-underline" href="#"> */}
            Submit
          {/* </a> */}
        </button>
      </form>
    </div>
  );
};

export default Banner;
