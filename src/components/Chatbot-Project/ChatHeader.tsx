interface ChatHeaderProps {
    clearChats: () => void;
}

const ChatHeader = ({clearChats}: ChatHeaderProps) => {

  return (
    <header
      className="sticky top-0 z-50 flex items-center justify-between px-6 py-4
                       bg-white/80 backdrop-blur-md  border-b border-gray-100"
    >
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
          <span className="text-white text-xs">B</span>
        </div>
        <h1 className="font-bold text-gray-900 tracking-tight">My ChatBot</h1>
      </div>

      <button
        onClick={clearChats}
        className="text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors cursor-pointer border border-gray-200 px-3 py-1.5 rounded-full hover:bg-gray-50"
      >
        New Chat
      </button>
    </header>
  );
};

export default ChatHeader;
