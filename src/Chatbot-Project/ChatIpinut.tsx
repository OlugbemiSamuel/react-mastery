
interface ChatInputProps {
    sendMessage: () => void;
    onChange: (event:React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown: (event:React.KeyboardEvent<HTMLInputElement>) => void;
    input: string;
    disable:boolean;
}

const ChatInput = ({sendMessage, onChange, onKeyDown, input, disable}: ChatInputProps) => {
  

  return (
    <div>
      <input
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={input}
       
        type="text"
        size={42}
        placeholder="Send a message to Bigsam's ChatBot"
        className="py-3 px-3.75 text-[15px] rounded-[10px] border mr-2.5 "
      />
      <button
    
        className="bg-[#198754] text-white py-2.5 px-5 
                cursor-pointer text-[15px] rounded-[10px] disabled:bg-green-200 disabled:cursor-not-allowed"
        onClick={sendMessage}
        disabled={disable}
      >
        Send
      </button>
    </div>
  );
};
export default ChatInput;
