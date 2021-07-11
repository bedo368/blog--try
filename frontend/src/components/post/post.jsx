import React,{useState} from "react";
import "./post.scss";
import CommentIcon from '@material-ui/icons/Comment';
import DateRangeIcon from '@material-ui/icons/DateRange';
function Post({   title, Content ,date , writer , comments , _id  ,commentShow , getpost }) {

  return (
    <div className="post" >
      <div className="image-container">
        
      </div>
      <div className="info">
        <h1 onClick={getpost} >{title}</h1>
        <div>
   
       
        <div  dangerouslySetInnerHTML ={{__html :   Content }}   />
        </div>
        <div className="sub_info">
            <div className="writer">
                <img src="https://static.toiimg.com/thumb/72975551.cms?width=680&height=512&imgsize=881753" alt=""/>
                <strong>{writer}</strong>
            </div>
            <p> <CommentIcon style={{marginRight:"10px"}} /> {comments?.length} </p>
            
            <p> <DateRangeIcon style={{marginRight:"10px"}} /> {date} </p>
          
        </div>

        
      </div>
    </div>
  );
}

export default  Post;
