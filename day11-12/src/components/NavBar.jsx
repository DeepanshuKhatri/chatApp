import React from 'react'
import { Typography } from 'antd'
import { db } from '../config/firebase'
import {query, collection, where} from 'firebase/firestore'
import { BellOutlined, SearchOutlined, WechatOutlined } from '@ant-design/icons'
import {auth} from '../config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getFirestore, doc, updateDoc } from "firebase/firestore";

const {Title} = Typography;
const NavBar = (props) => {
  const [user] = useAuthState(auth);


  // const q = query(collection(db, "users"), where('uid', '==', auth.currentUser.uid))
  // const q = db.collection('users').where('uid', '==', auth.currentUser.uid).get()
  
  
  
  function logout() {
    console.log(auth.currentUser)
    auth.signOut();

    const q = props.members.filter(x=> x.uid === auth.currentUser.uid);
    console.log(q)
    const db = getFirestore();
    const docRef = doc(db, "users", q[0].id);
    const data = {
      online: false
    }
    updateDoc(docRef, data)
    .then(() => {
      console.log("Logged Out");
    })
    auth.signOut();
    
    
  }
  return (
    <div>
        <div className="nav-bar">
            <div className="avatar-bot">
              <WechatOutlined className="we-chat-logo" />
              <Title level={3}>Chat BOT</Title>
            </div>
            <div className="nav-items">
              <nav>
                <ul className="nav-ul">
                  <li className="nav-li">HOME</li>
                  <li className="nav-li">CHAT</li>
                  <li className="nav-li"  onClick={()=>logout()}>Sign Out</li>
                  <li className="nav-li">SETTINGS</li>
                  <li className="nav-li">FAQs</li>
                  <li className="nav-li">TERMS OF USE</li>
                  <li className="nav-li">
                    <SearchOutlined className="nav-icon" />
                  </li>
                  <li className="nav-li">
                    <BellOutlined className="nav-icon" />
                  </li>
                </ul>
              </nav>
              {/* <Menu   mode="horizontal" items={items} />; */}
            </div>
          </div>
    </div>
  )
}

export default NavBar