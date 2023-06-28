import React, { useEffect, useState } from "react";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import SendMessage from './SendMessage'
import { useSelector } from "react-redux";
import { auth, db } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";


const Message = (props) => {
  const [user] = useAuthState(auth)
  console.log(props);

  const [messages, setMessages] = useState([]);
  
  const selector = useSelector(state=>state.auth.users)
  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      orderBy("createdAt")
    );
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let messages = [];
      QuerySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      
      const {uid} = auth.currentUser;
      setMessages(messages.filter(x=> x.uid===`${uid}-${props.receiver}`|| x.uid===`${props.receiver}-${uid}`));
    });


    return () => unsubscribe;
  }, [props.receiver]);
  console.log(messages)

  return (
    <div className="message-chats">
  
        <div className="chat-message">

        {messages?.map((message) => (
          <>
          {
            message.sender==selector.uid ?
            <div className="pp"><p className="p2">{message.text}</p></div>
            :
            <div className="pp"><p className="p1">{message.text}</p></div>

          }
          
          </>
        ))}
        </div>


      <div className="message-input">
        <SendMessage receiver={props.receiver}/>

      
      </div>


    </div>
  );
};

export default Message;
