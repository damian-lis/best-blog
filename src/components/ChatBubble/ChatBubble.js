import React from 'react';
import ChatBubbleIcon from '../../assets/chatBubbleIcon.svg';
import './chatBubble.css';

const ChatBubble = ({ number }) => {
  return (
    <div className={'chat-bubble'}>
      <img className={'chat-bubble__icon'} src={ChatBubbleIcon} />
      <span className={'chat-bubble__number'}>{number}</span>
    </div>
  );
};

export default ChatBubble;
