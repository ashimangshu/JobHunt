import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { RadioGroup } from '../ui/radio-group'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { USER_API_END_POINT } from '../../utils/constants'
import axios from 'axios'
import { toast, Toaster } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '../../redux/authSlice'
import { Loader2 } from 'lucide-react'



function Login() {

    const [input, setInput] = React.useState({
        email: "",
        password: "",
        role: "",
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading ,User} = useSelector(store => store.auth);

    const changeEventHandler = (e) => {
        setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
    const submitHandler = async (e) => {
        e.preventDefault();



        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);

            } else {
                toast.error("Something went wrong");
            }
            const data = await res.json();
            console.log(data);
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(setLoading(false));
        }
    }
    useEffect(()=>{
        if(User){
            navigate("/");
        }
    },[])

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5'>Login </h1>


                    <div className='my-2'>
                        <Label className="my-2">Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="ahsim@gmail.com"
                        />
                    </div>

                    <div className='my-2'>
                        <Label className="my-2">Password</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}

                            placeholder="password"
                        />
                    </div>


                    <div className='flex items-center justify-between'>
                        <RadioGroup className="flex items-center gap-4 my-5">
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r1">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>
                        </RadioGroup>

                    </div>
                    {
                        loading ? <Button classname="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin' /></Button> : <Button type="submit" className="w-full my-4">Login</Button>
                    }



                    <span className='text-sm'>Don't have an account? <Link to="/signup" className='text-blue-600'>Sign up</Link></span>

                </form>
            </div>
        </div>
    )
}

export default Login