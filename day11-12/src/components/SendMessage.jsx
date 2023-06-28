import React, { useState } from "react";
import { auth, db } from "../config/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { Form } from "antd";
import {SmileOutlined, SendOutlined} from '@ant-design/icons'
import { Avatar, Input } from "antd";


const SendMessage = (props) => {
    const [message, setMessage] = useState("");
    const sendMessage = async (event) => {
      console.log(props)
        event.preventDefault();
        if (message.trim() === "") { 
          // alert("Enter valid message");
          return;
        }
        const { uid, displayName, photoURL } = auth.currentUser;
        await addDoc(collection(db, "messages"), {
          sender: uid,
          receiver:props.receiver,
          isTyping:false,
          showTyping:false,
          text: message,
          name: displayName,
          avatar: photoURL,
          createdAt: serverTimestamp(),
          uid:`${uid}-${props.receiver}`,
        });
        setMessage("");
      };
      
      return (

    <>
    {
      props.receiver!=""&&<>
      <Input placeholder="Type Message" value={message} onChange={(e) => setMessage(e.target.value)} className="message-inputbox" prefix={<SmileOutlined className="smile-outlined" />} />
        <SendOutlined onClick={(event) => sendMessage(event)} className="send-btn" />
      
      </>
    }
    </>
  );
};
export default SendMessage;