import '../cssFiles/chatResponse.css';
import userAvatar from '../assets/user.png'; 
import botAvatar from '../assets/bot.jpg'; 

export const ChatResponse = ({ isUser, query, answer, sources }) => {
  if (isUser) {
    return (
      <div className="response-row user-row">
        <div className="message user-message">{query}</div>
        <img src={userAvatar} alt="User" className="avatar" />
      </div>
    );
  }

  return (
    <div className="response-row bot-row">
      <img src={botAvatar} alt="Bot" className="avatar" />
      <div className="message bot-message">
        <div dangerouslySetInnerHTML={{ __html: answer.replace(/\n/g, '<br />') }} />
        {sources && sources.length > 0 && (
          <div className="sources-container">
            <strong>Sources:</strong>
            <ul>
              {sources.map((source, index) => (
                <li key={index}>{source}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};