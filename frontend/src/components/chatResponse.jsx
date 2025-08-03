import '../cssFiles/chatResponse.css'
export const ChatResponse = ({ answer }) => {
  return (
    <div className="response">
      {answer}
    </div>
  );
};
