import { Link } from 'react-router-dom';
import './todoHome.css';
import TodoRegister from './todoRegister';
import TodoLogin from './todoLogin';
import TodoHeader from './todoHeader';


function TodoHome(){

    return (
        <div className='home'>
            <div>
                <TodoHeader link="register" btnClass="btn-primary" btnTxt="Get Started" search="d-none" visible="justify-content-end"/>
            </div>
            <section className='px-4'>
                <div className='row py-5'>
                    <div className='col left py-5 px-4'>
                        <div className='ms-3 left-inner-1'>
                            <p>
                                master your day,
                                <span><br />one task </span>
                                at a time.
                            </p>
                        </div>
                        <div className=' fs-5 text-secondary ms-3'>
                            <p>The minimalist todo app designed to help you focus on what matters most. Join 50,000+ users boosting their productivity today.</p>
                        </div>
                    </div>
                    <div className='col right px-4 py-2 d-flex justify-content-center align-items-center'>
                        <div className='inpage card bg-transparent rounded rounded-4 p-3 py-4'>
                            <ul className="nav nav-pills shadow mb-3 p-2 rounded rounded-3 d-flex justify-content-center" id="pills-tab" role="tablist">
                                <li className="nav-item w-50" role="presentation">
                                    <button className="nav-link active w-100" id="pills-login-tab" data-bs-toggle="pill" data-bs-target="#pills-login" type="button" role="tab" aria-controls="pills-login" aria-selected="true">Login</button>
                                </li>
                                <li className="nav-item w-50" role="presentation">
                                    <button className="nav-link w-100" id="pills-register-tab" data-bs-toggle="pill" data-bs-target="#pills-register" type="button" role="tab" aria-controls="pills-register" aria-selected="false">Register</button>
                                </li>
                            </ul>
                            <div className="tab-content shadow-lg p-3 rounded rounded-4" id="pills-tabContent">
                                <div className="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="pills-login-tab" tabIndex="0"><TodoLogin mainClass="" formWidth="w-100" btnDiv="d-none" header="d-none" /></div>
                                <div className="tab-pane fade" id="pills-register" role="tabpanel" aria-labelledby="pills-register-tab" tabIndex="0"><TodoRegister mainClass="" formWidth="w-100" header="d-none" /></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default TodoHome
