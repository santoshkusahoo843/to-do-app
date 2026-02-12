import { Link, useNavigate } from 'react-router-dom';
import TodoHeader from './todoHeader';
import '../to-do-components/todoLogin.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { useCookies } from 'react-cookie';


function TodoLogin(props){
    const[eyeClass,setEyeClass] = useState("bi bi-eye-slash");
    const[inputType,setInputType] = useState("password");

    function toggolePassClick(){
        if(eyeClass==="bi bi-eye-slash"){
            setEyeClass("bi bi-eye");
            setInputType("text");
        }
        else{
            setEyeClass("bi bi-eye-slash");
            setInputType("password");
        }
    }

    let navigate = useNavigate();

    const[allUser,setAllUser] = useState([]);

    const[cookies,setCookies] = useCookies(["userId","userName"]);

    function getAllUser(){
        axios.get("http://localhost:3000/user")
        .then(response=>{
            setAllUser(response.data);
        })
    }

    let formik= useFormik({
        initialValues:{
            userId:"",
            password:""
        },
        onSubmit:(user=>{
            if(user.userId){
                const theUser = allUser.find(theUser => user.userId===theUser.userId || user.userId === theUser.email);
                if(theUser){
                    if(user.password){
                        if(theUser.password === user.password){
                            setCookies("userId",theUser.userId);
                            setCookies("userName",theUser.userName);
                            navigate("/dashboard");
                        }
                        else{
                            alert("password not matched try again ");
                        }
                    }
                    else{
                        alert("password required");
                    }
                }
                else{
                    alert("This user name of email id is not found");
                }
            }
            else{
                alert("user id or email required");
            }
        })
    })

    useEffect(()=>{
        getAllUser();
    },[])


    return (
        <div>
            <div className={props.header}>
                <TodoHeader link="register" btnClass="btn text-primary fw-bold" btnTxt="Sign-up" search="d-none" visible="justify-content-end"/>
            </div>
            <div className={`d-flex justify-content-center align-items-center ${props.mainClass} `}>
                <div className={`${props.formWidth} ${props.formClass} bg-transparent`}>
                    <form className={`my-3 mx-2`} onSubmit={formik.handleSubmit}>
                        <h3 className="text-center">{props.heading}</h3>
                        <div className="mb-3">
                            <label htmlFor="userId" className=" form-label text-secondary">User id or email</label>
                            <div className="input-group">
                                <span className="bi bi-person-fill input-group-text bg-transparent"></span>
                                <span className="form-control bg-transparent"><input type="text" name="userId" onChange={formik.handleChange} placeholder="Enter user id or email" className="w-100 bg-transparent" style={{border:'none',outline:'none'}} /></span>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className=" form-label text-secondary">Password</label>
                            <div className="input-group">
                                <span className="bi bi-unlock2-fill bg-transparent input-group-text"></span>
                                <span className="form-control bg-transparent"><input type={inputType} name="password" onChange={formik.handleChange} placeholder="Enter your password" className="w-100 bg-transparent" style={{border:'none',outline:'none'}} /></span>
                                <span onClick={toggolePassClick} className={`${eyeClass} input-group-text bg-transparent`}></span>
                            </div>
                        </div>
                        <button type="submit" className="w-100 mt-4 btn btn-primary">Login</button>
                    </form>
                    <div>
                        <button className=" btn btn-link w-100 mt-3">Forgot password ?</button>
                    </div>
                    <div className={`d-flex justify-content-between align-items-baseline ${props.btnDiv}`}>
                        <span>If you don't have any account</span>
                        <Link to="/register" className='d-flex justify-content-center'><button className=" btn btn-link mt-3">Register</button></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default TodoLogin
