// import { MessageCircleQuestionMarkIcon, MessagesSquareIcon, Send } from "lucide-react";

import { Send } from "lucide-react";

interface ChatInputProps {
  sendMessage: () => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  input: string;
  disable: boolean;
  clearMessage: () => void;
}

const ChatInput = ({
  sendMessage,
  onChange,
  onKeyDown,
  input,
  disable,
  // clearMessage,
}: ChatInputProps) => {
  // const text = "text-[10px] font-bold uppercase  tracking-tighter px-2";

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 md:p-8 bg-linear-to-t from-white via-white/80 to-transparent pointer-events-none ">
      <div className="max-w-3xl mx-auto pointer-events-auto  ">
        <div
          className=" relative rounded-2xl  flex-1  flex items-center
        px-4 gap-2  bg-gray-100
       border-gray-200  shadow-2xl lpx-4 focus-within:ring-2 focus-within:ring-blue-500/20
        focus-within:border-blue-500 transition-all "
        >
          <input
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={input}
            type="text"
            size={42}
            placeholder="Send a message to your ChatBot"
            className="flex-1 py-4 bg-transparent  outline-none
                       text-[15px] placeholder:text-gray-500  text-gray-900 min-w-0 "
          />

          <button
            className=" p-2 bg-green-600 text-white rounded-xl transition-all 
                      hover:bg-green-700 active:scale-95 
                      disabled:bg-gray-200 disabled:text-gray-400 
                       disabled:cursor-not-allowed shrink-0"
            title="send message"
            onClick={sendMessage}
            disabled={disable || !input.trim()}
          >
            <Send aria-label="send message" />
          </button>
        </div>
      </div>
      <p className="text-center text-[10px] text-gray-500 mt-3">
        AI can make mistakes. Check important info.
      </p>
    </div>
  );
};
export default ChatInput;
