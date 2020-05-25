import React, { useState, useContext, createContext } from 'react';
import { render } from 'react-dom';
import './index.css'

const ContextOne = createContext(null)
const ProviderOne = props => {
  const [value, setValue] = useState(new Date().getTime())
  setTimeout(() => setValue(new Date().getTime()), 100)
  return <ContextOne.Provider value={{ value, setValue }}>{props.children}</ContextOne.Provider>
}

const ContextTwo = createContext(null)
const ProviderTwo = props => {
  const [value] = useState(new Date().getTime())
  return <ContextTwo.Provider value={{ value }}>{props.children}</ContextTwo.Provider>
}

const AppProvider = props => (
  <ProviderOne>
    <ProviderTwo>
      {props.children}
    </ProviderTwo>
  </ProviderOne>
)

const ContextOneConsumer = () => {
  const { value } = useContext(ContextOne)
  console.log("render of One")
  return <h2>{value}</h2>
}

const ContextTwoConsumer = () => {
  const { value } = useContext(ContextTwo)
  console.log("render of Two")
  return <h2>{value}</h2>
}

const ManInTheMiddle = props => {
  console.log("render of ManInTheMiddle")
  return (
    <>
      <h1>Oh hi there</h1>
      <h1>Hello again</h1>
      <div className="consumers">{props.children}</div>
    </>
  )
}

const App = () => (
  <AppProvider>
    <ManInTheMiddle>
      <ContextOneConsumer />
      <ContextTwoConsumer />
    </ManInTheMiddle>
  </AppProvider>
)

render(<App />, document.getElementById('root'));
