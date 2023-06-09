import { memo, useEffect, useRef } from "react"
import styled from "styled-components"
import { ChatMessage } from "./chat";
import { isMobile } from "react-device-detect";

type ChatContainerProps = {
    messageArrState: ChatMessage[];
}

/**
 * メッセージ表示エリア
 */
const ChatContainer: React.FC<ChatContainerProps> = memo(({ messageArrState }) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    /**
     * 最新のメッセージ位置を表示する
     */
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
        }
    }, [messageArrState]);
    
    return (
        <SContainer isMobile={isMobile} ref={messagesEndRef}>
            {messageArrState.map((message) => (
                <>
                    <SChatBubble isMe={message.sender === 'me'}>
                        <SMessage>{message.message1}{message.icon && (<SIcon src={message.icon} width={32} height={24} />)}</SMessage>
                        {message.message2 && (
                            <SMessage>{message.message2}</SMessage>
                        )}
                        {message.url && (
                            <SLink href={message.url} target="_blank">{message.url}</SLink>
                        )}
                        {message.img && (
                            <SImg src={message.img} />
                        )}
                    </SChatBubble>
                    <STimestamp isMe={message.sender === 'me'}>{message.timestamp}</STimestamp>
                </>
            ))}
            <div ref={messagesEndRef}></div>
        </SContainer>
    )
});

const SContainer = styled.div<{isMobile: boolean}>`
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    height: ${({isMobile}) => isMobile ? '85%' : '85%' };
    margin: auto;
    padding: 16px;

`

const SChatBubble = styled.div<{ isMe: boolean }>`
    display: inline-block;
    margin-bottom: 3px;
    padding: 8px 16px;
    border-radius: 16px;
    color: ${({ isMe }) => (isMe ? 'white' : 'black')};
    background-color:${({ isMe }) => (isMe ? '#20b2aa' : '#b0e0e6')};
    align-self: ${({ isMe }) => (isMe ? 'flex-end': 'flex-start')};
    max-width: 70%;
    text-align: left;
`
const SMessage = styled.p`
    margin: 0;
    white-space: pre-wrap;
`
const SLink = styled.a`
    margin: 0;
    word-wrap: break-word;
    color: #4169e1;
    text-decoration:underline;
    text-align: left;
`

const SImg = styled.img`
    max-width: 100%;
`

const SIcon = styled.img`
    vertical-align: bottom;
`

const STimestamp = styled.span<{ isMe: boolean }>`
    font-size: 12px;
    color: black;
    margin-left: 8px;
    margin-bottom: 16px;
    align-self: ${({ isMe }) => (isMe ? 'flex-end': 'flex-start')};
`

export default ChatContainer;