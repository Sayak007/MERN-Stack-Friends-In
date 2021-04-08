import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers/index'
import {compositeWithDevTools} from 'redux-devtools-extension'

const store = createStore(
    rootReducer,
    compositeWithDevTools(applyMiddleware(thunk))
)

const DataProvider = ({children})=>{
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}

export default DataProvider