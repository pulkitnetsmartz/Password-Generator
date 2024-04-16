import React, { useState, useCallback, useEffect } from "react";

const App = () => {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const copyPassword = () => {
    window.navigator.clipboard.writeText(password);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTVUWXYZabcdefghijklmopqursvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*";

    for (let i = 1; i < length; i++) {
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, charAllowed]);

  return (
    <div className="flex justify-center items-center mt--4 h-screen w-full bg-gradient-to-r from-slate-300 to-slate-500 flex-col">
      <div className=" fixed w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 bg-gray-800 text-white ">
        <h1 className=" text-center h-11 w-full font-bold font-serif text-2xl mt-3">
          Password Generator
        </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            placeholder="Password"
            readOnly
            className="outline-none w-full text-black py-1 px-3"
          />
          <button
            onClick={copyPassword}
            className=" outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
          >
            Copy
          </button>
        </div>
        <div className="flex gap-3 pl-1.5">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className=" cursor-pointer"
              onChange={(e) => setLength(e.target.value)}
              name=""
              id=""
            />
            <label htmlFor="length">Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
              name=""
              id=""
            />
            <label htmlFor="number">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
              name=""
              id=""
            />
            <label htmlFor="charInput">Character</label>
          </div>
        </div>
        
      </div>
      <div className=" fixed top-11">
      {showAlert && (
          <div className="text-center text-white bg-blue-700 px-4 py-2 rounded-lg alert animate-bounce">
            Password copied
          </div>
        )}
        </div>
    </div>
  );
};

export default App;
