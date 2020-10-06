import React from "react";
import "./post.scss";
import CommentIcon from '@material-ui/icons/Comment';
import DateRangeIcon from '@material-ui/icons/DateRange';
function Post({ id , imageurl, title, contnent ,date , writer , comment }) {
  return (
    <div className="post">
      <div className="image-container">
        <img
          src="https://static.toiimg.com/thumb/72975551.cms?width=680&height=512&imgsize=881753"
          alt=""
        />
      </div>
      <div className="info">
        <h1>The Mythbuster’s Guide to Saving Money on Energy Bills</h1>
        <body>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo, odit
          enim. Tempora repellat explicabo omnis corrupti cupiditate minima
          aspernatur consequatur nihil! <a> see more</a>
        </body>
        <div className="sub_info">
            <div className="writer">
                <img src="https://static.toiimg.com/thumb/72975551.cms?width=680&height=512&imgsize=881753" alt=""/>
                <strong>writer</strong>
            </div>
            <p> <CommentIcon style={{marginRight:"10px"}} /> {comment?.length} </p>
            
            <p> <DateRangeIcon style={{marginRight:"10px"}} /> {date} </p>
          
        </div>
        
      </div>
    </div>
  );
}

export default Post;
