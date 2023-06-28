import { useEffect, useState } from "react";
import "../assets/styles/styles.css";
import { Button, Input, Form } from "antd";
import { auth, db } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  where,
  onSnapshot,
} from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../redux/slices/auth.slice";
import { getFirestore, doc, updateDoc } from "firebase/firestore";


export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [index, setIndex] = useState(1);
  const [members, setMembers] = useState([])

  const selector = useSelector((state) => state.auth.users);



  useEffect(()=>{
    const db = getFirestore();
        const q3 = query(
          collection(db, "users")
        );
        console.log(q3)
        const unsubscribe = onSnapshot(q3, (QuerySnapshot) => {
          let members = [];
          QuerySnapshot.forEach((doc) => {
            members.push({ ...doc.data(), id:doc.id })
            console.log('auth....')
            console.log(members);
          })
          console.log(members)
          setMembers(members);
        })
        return ()=> unsubscribe;

  }, [])
  console.log(auth?.currentUser?.email);

  const signIn = async () => {};
  const dispatch = useDispatch();
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(async (res) => {
      const res1 = res.user;
      dispatch(addUser(res1));
      const q = query(collection(db, "users"), where("uid", "==", res1.uid));
      console.log(q);
      const q2 = await getDocs(q);
      if (q2.empty) {
        await addDoc(collection(db, "users"), {
          name: res1.displayName,
          email: res1.email,
          uid: res1.uid,
          avatar: res1.photoURL,
          online: true,
        });
      }
      else{
        
        const q4 = members?.filter(x=> x.uid === res1.uid);
        console.log(q4)
        const docRef = doc(db, "users", q4[0].id);
        const data = {
          online:true
        }
        updateDoc(docRef, data)
        .then(docRef => {
          console.log("Logged In");
        })

        console.log(res1.uid)
        
      }
    });
  };
  const logOut = () => {
    auth.signOut();
  };

  return (
    <div className="body">
      {/* <WechatOutlined size={100} className='wechaticon' /> */}
      <div className="login-form">
        <Form className="login-form" layout="vertical">
          <Form.Item>
            <Input
              className="login-inp"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Input
              className="login-inp"
              placeholder="Enter Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              className="sign-in-btn login-btn"
              onClick={signIn}
            >
              Sign In
            </Button>
          </Form.Item>
          <Form.Item>
            <Button
              className="google-sign-in-btn login-btn"
              onClick={()=> signInWithGoogle()}
            >
              Sign In With Google
            </Button>
          </Form.Item>
          <Form.Item>
            {/* <Button type="primary" className="login-btn" onClick={logOut}>
              Log Out
            </Button> */}
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
