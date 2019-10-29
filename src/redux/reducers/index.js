import {combineReducers} from 'redux';
import logginReducer from './logginReducer';
import AdminReducer from './AdminReducer';



 const rootReducer = combineReducers( {admin: AdminReducer, loggin: logginReducer} )

 export default rootReducer

