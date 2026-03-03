interface MessageCounterProps {
    count: number
}

const MessageCounter = ({count}: MessageCounterProps) => {
    return(
         <div>{count}, messages in the chat</div>

    )
   
}

export default MessageCounter