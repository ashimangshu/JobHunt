import { useEffect } from 'react'
import axios from 'axios';
import { JOB_API_END_POINT } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux'
import { setAllJobs} from '../redux/jobSlice';
function useGetAllJobs() {
    const dispatch = useDispatch();
     const {searchedQuery} = useSelector(store=>store.job);
    useEffect(() => {
        // fetch all jobs from the backend API
        const fetchAllJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/getJobs?keyword=${searchedQuery}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs));
                }

            } catch (error) {
                console.error("Error fetching jobs:", error);

            }
        }


        fetchAllJobs();
    }, []);
}

export default useGetAllJobs