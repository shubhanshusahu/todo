import {BrowserRouter as Router,Routes,Route,Switch} from 'react-router-dom'
import Login from './pages/login'
import Signup from './pages/signup'
import Todos from './pages/todos'


const RouteforTodo = ()=>{
    return(
        <Router>
            <Routes>
                <Route exact path ='/' element={<Login/>}/>
                <Route exact path ='/signup' element={<Signup/>}/>
                <Route exact path ='/todos' element={<Todos/>}/>


            </Routes>
        </Router>
    )
}
export default RouteforTodo;