import React from "react";
import "./socialmediaicons.scss";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import YouTubeIcon from "@material-ui/icons/YouTube";
import InstagramIcon from "@material-ui/icons/Instagram";
function SocialMediaIcons({ ...props }) {
  return (
    <div className="socialmediaicons" {...props}>
      <div className="icons">
        <FacebookIcon className=" icon" />
        <TwitterIcon className=" icon" />
        <YouTubeIcon className=" icon" />
        <InstagramIcon className=" icon" />
      </div>
    </div>
  );
}

export default SocialMediaIcons;
