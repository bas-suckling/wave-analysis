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

            case 'updateMapStyles':

                console.log('update style arrays has been called')
                console.log('update payload', action.payload)

                return {
                    ...state,
                    currentSession: {
                        styleArrays: action.payload,
                        ...state.currentSession
                    }
                }

            case 'resetMapStyles':

                console.log('reset style arrays has been called')
                console.log('reset payload', action.payload)

                return {
                    ...state,
                    currentSession: {
                        styleArrays: action.payload,
                        ...state.currentSession
                    }
                }

            case 'setCurrentSegment':
                return {
                    ...state,
                    currentSegment: action.payload
                }
                default:
            throw new Error('Invalid action')
        }
    }, initialState)

    return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, DataStore }

