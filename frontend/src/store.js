import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { userLoginReducer, userRegisterReducer} from './reducers/userReducers';
import { priceMonitorListReducer } from './reducers/priceMonitorReducers';
import { monitoringReducer, monitoringEditReducer, monitoringCreateReducer } from './reducers/monitoringReducer';


const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    priceMonitorList: priceMonitorListReducer,
    monitoring: monitoringReducer,
    monitoringEdit: monitoringEditReducer,
    monitoringCreate: monitoringCreateReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    userLogin: { userInfo: userInfoFromStorage }
}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
    )

export default store
