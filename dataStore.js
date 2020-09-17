import React, {createContext, useReducer} from 'react'

const initialState = {
    allSessions: [],
    currentSession: [],
    currentSegment: [],
}

const store = createContext(initialState)
const { Provider } = store;

const DataStore = ({children}) => {
    const [state, dispatch] = useReducer((state, action) => {
        switch(action.type) {
            case 'setSessions' :
                return {
                    ...state,
                    allSessions: action.payload
                }

            case 'setCurrentSession': 
                return {
                    ...state,
                    currentSession: action.payload
            } 

            case 'updateMapStyle':
                console.log('Payload:', action.payload)
                return {
                    ...state,
                    currentSession: {
                        styleArrays: action.payload,
                        ...state.currentSession
                    }
                }

                default:
            throw new Error('Invalid action')
        }
    }, initialState)

    return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, DataStore }

