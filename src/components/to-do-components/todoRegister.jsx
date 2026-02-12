
import axios from 'axios';
import { useFormik } from 'formik';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import TodoHeader from './todoHeader';



function TodoRegister(props){

    const [allUser,setAllUser] = useState([{}]);

    function getUserData(){
        axios.get("http://localhost:3000/user")
        .then(response=>setAllUser(response.data));
    }

    let navigate = useNavigate();

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

    const formik = useFormik({
        initialValues:{
            userName:"",
            userId:"",
            email:"",
            password:""
        },
        validationSchema: yup.object({
            userName:yup.string().required("Full name required").min(8,"Name too short").matches(/^[A-Za-z]+(?: [A-Za-z]+)*$/,"Name doesn't contain any number or symbol."),
            userId:yup.string().required("User id required").max(10,"maximum 10 charecter allowed"),
            email:yup.string().required("Email required").matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,"invalid Email address"),
            password:yup.string().required("Password is required")
            .min(6, "Password must be at least 6 characters")
            .matches(/[a-z]/, "Must contain at least one lowercase letter")
            .matches(/[A-Z]/, "Must contain at least one uppercase letter")
            .matches(/\d/, "Must contain at least one number")
            .matches(/[@$!%*?&]/, "Must contain at least one special character"),
        }),
        validateOnBlur:true,
        onSubmit: (user)=>{
            const existUser = allUser.find(theUser=>theUser.userId === user.userId || theUser.userName === user.userName);
            if(existUser){
                alert("user is already exist")
            }
            else{
                axios.post("http://localhost:3000/user",user);
                navigate("/login");
            }
        }

    })

    useEffect(()=>{
        getUserData();
    },[])

    return (
        <div>
            <div className={props.header}>
                <TodoHeader link="login" btnClass="btn text-primary fw-bold" btnTxt="Sign-in" search="d-none" visible="justify-content-end"/>
            </div>
            <div className={`d-flex justify-content-center align-items-center ${props.mainClass}`}>
                <form onSubmit={formik.handleSubmit} className={`my-3 mx-2 ${props.formWidth} ${props.formClass} bg-transparent`}>
                    <h3 className="text-center mb-2">{props.heading}</h3>
                    <div style={{height:'100px'}}>
                        <label htmlFor="userName" className=" form-label text-secondary">Full Name</label>
                        <div className="input-group">
                            <span className="bi bi-person-fill bg-transparent input-group-text"></span>
                            <span className="form-control bg-transparent"><input type="text" name="userName" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.userName} placeholder="Enter your full name" className="w-100 bg-transparent" style={{border:'none',outline:'none'}} /></span>
                        </div>
                        <span className='text-danger error'>{formik.touched.userName && formik.errors.userName}</span>
                    </div>
                    <div style={{height:'100px'}}>
                        <label htmlFor="userId" className=" form-label text-secondary">User Id</label>
                        <div className="input-group">
                            <span className="bi bi-person-bounding-box bg-transparent input-group-text"></span>
                            <span className="form-control bg-transparent"><input type="text" name="userId" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.userId} placeholder="Create your user id" className="w-100 bg-transparent" style={{border:'none',outline:'none'}} /></span>
                        </div>
                        <span className='text-danger error'>{formik.touched.userId && formik.errors.userId}</span>
                    </div>
                    <div style={{height:'100px'}}>
                        <label htmlFor="Email" className=" form-label text-secondary">Email Address</label>
                        <div className="input-group">
                            <span className="bi bi-envelope-at-fill bg-transparent input-group-text"></span>
                            <span className="form-control bg-transparent"><input type="email" name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} placeholder="Enter your email" className="w-100 bg-transparent" style={{border:'none',outline:'none'}} /></span>
                        </div>
                        <span className='text-danger error'>{formik.touched.email && formik.errors.email}</span>
                    </div>
                    <div style={{height:'100px'}}>
                        <label htmlFor="password" className=" form-label text-secondary">Password</label>
                        <div className="input-group">
                            <span className="bi bi-unlock2-fill bg-transparent input-group-text"></span>
                            <span className="form-control bg-transparent"><input type={inputType} name="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} placeholder="Create a password" className="w-100 bg-transparent" style={{border:'none',outline:'none'}} /></span>
                            <span onClick={toggolePassClick} className={`${eyeClass} input-group-text bg-transparent`}></span>
                        </div>
                        <span className='text-danger error'>{formik.touched.password && formik.errors.password}</span>
                    </div>
                    <div className=' d-flex justify-content-center align-items-center' style={{height:'50px'}}>
                        <button type="submit" className="w-100 btn btn-primary">Register</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default TodoRegister