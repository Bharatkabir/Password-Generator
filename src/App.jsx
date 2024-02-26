import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [lenth, setLength] = useState(6);
  const [numAllow, setNumAllowed] = useState(false);
  const [charAllow, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

const passwordRef = useRef();

  const passwordGenrator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numAllow) {
      str += "0123456789";
    }
    if (charAllow) {
      str += "!@#$%^&*()";
    }
    for (let i = 1; i <= lenth; i++) {
      let char = Math.floor(Math.random() * str.length );
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [lenth, numAllow, charAllow]);

  const copyClipBoard = () =>{
    passwordRef.current.select();
    window.navigator.clipboard.writeText(password)
  }
  useEffect(()=>{
    passwordGenrator()
  },[lenth,numAllow,charAllow,setPassword])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700">
        <h1 className="text-white text-center mb-4">Password Genrator</h1>
        <div className="className=flex shadow-sm rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-half py-1 px-2"
            placeholder="password"
            readOnly
            ref={passwordRef}
            id="inp"
          />
          <button onClick={copyClipBoard} className="outline-none bg-blue-700 text-white px-2 py-0.5 shrink-0 ">
            Copy
          </button>
          <div className="flex text-sm gap-x-2" id="div">
            <div className="flex item-center gap-x-1">
              <input
                type="range"
                min={6}
                max={20}
                value={lenth}
                className="cursor-pointer"
                onChange={(e) => {
                  setLength(e.target.value);
                }}
              />
              <label>Length: {lenth}</label>
            </div>
            <div className="flex item-center gap-x-1">
              <input
                type="checkbox"
                defaultChecked={numAllow}
                id="numInput"
                onChange={(e) => {
                  setNumAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="numInput">Numbers</label>
            </div>
            <div className="flex item-center gap-x-1">
              <input
                type="checkbox"
                defaultChecked={charAllow}
                id="charInput"
                onChange={(e) => {
                  setCharAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="charInput">Character</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
