import { useState, useCallback, useEffect, useRef } from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef=useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*_-+=[]{}~"

    for(let i=1; i<=length;i++){
      let char = Math.floor(Math.random() * str.length +1)  //to generate random numbers
      pass += str.charAt(char)

    }

    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    //passwordRef.current?.setSelectionRange(0,4);
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(() => {
    passwordGenerator()
  },[length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <>
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="bg-gray-900 text-blue-600 px-56 py-10 rounded-2xl shadow">
          <h4 className="text-center text-white">Password Generator</h4>
          <div className="w-96 flex shadow rounded-lg overflow-hidden mt-2 bg-amber-50">
            <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"   
            placeholder="Password"
            readOnly 
            ref={passwordRef}
            />
            <button 
            onClick={copyPasswordToClipboard}
            className="bg-blue-700 text-white" style={{ backgroundColor: '#1D4ED8' }}>copy</button>
          </div>
          <div className="mt-3 flex text-sm gap-x-2">
            <div className="flex text-sm gap-x-1">
              <input
              type="range"
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) =>{setLength(e.target.value)}}
              />
              <label>Length: {length}</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
              />
              <label htmlFor="numberInput">Numbers</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
              />
              <label htmlFor="numberInput">Characters</label>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default App


