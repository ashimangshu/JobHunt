import React from 'react'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { LogOut, User2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import Profile from '../Profile'
import { toast } from 'sonner'
import { setUser } from '@/redux/authSlice'
// import store from '../../redux/store'
import axios from 'axios'
import { USER_API_END_POINT } from '../../utils/constants'
function Navbar() {
    // const User = true;
    const { User } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.status === 200) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
                console.log("Logged out successfully");
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message);


        }

    }
    return (
        <div className='bg-white'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
                <div>
                    <h1 className='text-2xl font-bold'>Job<span className='text-[#F83002]'>Hunt</span></h1>
                </div>

                <div className='flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-5'>
                        {
                            User && User.role === 'recruiter' ? (
                                <>
                                    <li><Link to="/admin/companies">Companies</Link></li>
                                    <li><Link to="/admin/jobs">Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/jobs">Jobs</Link></li>
                                    <li><Link to="/browse">Browse</Link></li>
                                </>
                            )
                        }

                    </ul>
                    {
                        !User ? (
                            <div className='flex items-center gap-4'>
                                <Link to="/login">
                                    <Button variant="outline">Login</Button>
                                </Link>

                                <Link to="/signup">
                                    <Button className="bg-[#855bce] hover:bg-[#5618c1] text-white">
                                        Signup
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <Popover >
                                <PopoverTrigger asChild>
                                    <Avatar className='cursor-pointer'>
                                        <AvatarImage src={User?.profile?.profilePhoto} alt="@shadcn" />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className='w-80'>
                                    <div className='flex gap-4 space-y-2'>
                                        <Avatar className='cursor-pointer'>
                                            <AvatarImage src={User?.profile?.profilePhoto} alt="@shadcn" />
                                        </Avatar>

                                        <div>
                                            <h4 className='font-medium'>{User?.fullname}</h4>
                                            <p className='text-sm text-muted-foreground'>{User?.profile?.bio}</p>
                                        </div>

                                    </div>
                                    {User && User.role === 'student' && (
                                        <div className='flex w-fit items-center my-2 gap-2 cursor-pointer'>
                                            <User2 />
                                            <Button variant="link"><Link to='/profile'>View Profile</Link></Button>
                                        </div>
                                    )}

                                    <div>
                                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                            <LogOut />
                                            <Button onClick={logoutHandler} variant="link">Logout</Button>
                                        </div>
                                    </div>

                                </PopoverContent>
                            </Popover>
                        )
                    }


                </div>
            </div>
        </div>

    )
}

export default Navbar