import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import TodoHome from "./todoHome"
import '../to-do-components/todoIndex.css';
import TodoHeader from "./todoHeader";
import TodoLogin from "./todoLogin";
import TodoRegister from "./todoRegister";
import TodoDashbord from "./todoDashboard";
import TodoTable from "./todoTable";
import TodoDelete from "./tododelete";
import TodoAdd from "./TodoAdd";
import TodoEdit from "./todoEdit";

function TodoIndex(){


    return (

        <BrowserRouter>
            <div className="index">
                <Routes>
                    <Route path="/" element={<TodoHome/>} />
                    <Route path="/login" element={<TodoLogin mainClass="outbox" formWidth="w-25" formClass="bg-white shadow-lg p-4 rounded rounded-4" btnDiv="" heading="Welcome User" head="d-block" />} />
                    <Route path="/register" element={<TodoRegister mainClass="outbox" formWidth="w-25" formClass="bg-white shadow-lg p-4 rounded rounded-4" heading="Create Your Account" />} />
                    <Route path="/dashboard" element={<TodoDashbord/>} >
                        <Route path="" element={<TodoTable />} />
                        <Route path=":id" element={<TodoDelete />}/>
                        <Route path=":userId/add" element={<TodoAdd />} />
                        <Route path=":id/edit" element={<TodoEdit/>} />
                    </Route>
                </Routes>
            </div>
        </BrowserRouter>
    )


}
export default TodoIndex