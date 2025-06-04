import { useState, useRef } from 'react';
import './ChatBox.css';
import chatIcon from '../../assets/images/icons/robo-idle-transparent.gif';
import headerImage from '../../assets/images/logo.png';
import { FiberManualRecord, Send } from '@mui/icons-material';

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const iconRef = useRef(null);

  const toggleChatbox = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div className="chatbox">
      <div className={`chatbox__support ${isOpen ? 'chatbox--active' : ''}`}>
        <div className="chatbox__header">
          <div className="chatbox__image--header">
            <img src={headerImage} alt="Header" />
          </div>
          <div className="chatbox__content--header">
            <h4 className="chatbox__heading--header">Support Center</h4>
            <p className="chatbox__description--header">
               <FiberManualRecord /> Offline {/*Online*/}
            </p>
          </div>
        </div>

        <div className="chatbox__messages">
          <div>
            <div className="messages__item messages__item--visitor">
              Hello! Welcome to our support center. How can I assist you today?Hello! Welcome to our support center. How can I assist you today?
            </div>
            <div className="messages__item messages__item--operator">
              Hi, I need some help with your website.
            </div>
            <div className="messages__item messages__item--visitor">
              Of course! What issue are you facing?
            </div>
            <div className="messages__item messages__item--operator">
              I can’t log into my account.
            </div>
            <div className="messages__item messages__item--typing">
              <span className="messages__dot"></span>
              <span className="messages__dot"></span>
              <span className="messages__dot"></span>
            </div>
          </div>
        </div>

        <div className="chatbox__footer">
          <input type="text" placeholder="Type your message here..." />
          <p className="chatbox__send--footer"><Send /></p>
        </div>
      </div>

      <div className="chatbox__button" onClick={toggleChatbox}>
        <button>
          <span ref={iconRef}>
            <img src={chatIcon} alt="Chat Icon" className='AImascot' />
          </span>
        </button>
      </div>
    </div>
  );
};

export default ChatBox;