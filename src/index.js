import React, { useState, useContext, createContext, useMemo, useEffect } from 'react';
import { render } from 'react-dom';
import './index.css'

const createContexts = (ms, index, numberOfContexts) => {
    const Context = createContext(null)

    const Provider = props => {
        const [value, setValue] = useState(0)

        useEffect(() => {
            const timeout = setTimeout(() => {
                if (index === 0) console.time(`duration (${numberOfContexts})`)
                if (index === numberOfContexts - 1) console.timeEnd(`duration (${numberOfContexts})`)
                setValue(value + 1)
            }, ms)

            return () => {
                clearTimeout(timeout)
            }
        }, [value])

        return <Context.Provider value={{ value }}>{props.children}</Context.Provider>
    }

    const Consumer = () => {
        const { value } = useContext(Context)

        return <div className="consumer">{value}</div>
    }

    return { Provider, Consumer }
}

const App = () => {
    const [numberOfContexts, setNumberOfContexts] = useState(250)
    const [ms, setMs] = useState(1000)

    const memoContexts = useMemo(() => (
        new Array(numberOfContexts).fill(1).map((_, index) => 
            createContexts(ms, index, numberOfContexts)
        )
    ), [ms, numberOfContexts])

    return (
        <>
            <input type="number" value={numberOfContexts} onChange={e =>
                setNumberOfContexts(Number(e.target.value))
            } />

            <input type="number" value={ms} onChange={e =>
                setMs(Number(e.target.value))
            } />

            <div className="providers">
                {memoContexts.map(({ Provider, Consumer }, index) =>
                    <Provider key={index}>
                        <Consumer />
                    </Provider>
                )}
            </div>
        </>
    )
}

render(<App />, document.getElementById('root'));
