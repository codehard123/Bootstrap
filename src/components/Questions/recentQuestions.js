import React from "react"

function RecentQuestions(props){
    
    
    return(
        <div className="recent-container">
        <div className="votes-container">
            <i className="fa fa-arrow-up Up" aria-hidden="true"></i>
            <i className="fa fa-arrow-down Down" aria-hidden="true"></i>
        <div className="Votes">
            {props.votes}
            <div>
                <p className="votes-text">votes</p>
            </div>
        </div>
        </div>
        <div className="answers-container">

            <div className="answers">{props.downvotes}</div>
            <div className="answers-text">downvotes</div>
        </div>
        <div className="question">{props.title}</div>
        <img src="vim.jpg" className="question-img" height="30" width="30" />
        <div className="question-ask">asked on
            <b>{props.dateTime}</b>
            
            <div className="question-subject">{props.subject}

            </div>
            <div className="todu">by

            </div>
            <div className="question-asker">{props.author}
            </div>

    </div>    
    </div>   
    )
  
}
export default RecentQuestions;