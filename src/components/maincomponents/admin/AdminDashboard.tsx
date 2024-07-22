import { useEffect, useState } from 'react'
import logo from '../../../assets/logo_2-removebg-preview (4).png'
import fetchData from '@/utils/fetchdata'
import postData from '@/utils/postdata'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../redux/store'
import { useNavigate } from 'react-router-dom'
import { userdetailslogout } from '../../../redux/slices/userreducer/userReducer'
import { usercompanylogout } from '../../../redux/slices/companyreducer/companyReducer'




interface Company {
    _id: string;
    name: string;
    // Add more fields as needed
}



const AdminDashboard = () => {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [totalCompanies, setTotalCompanies] = useState<Company[]>([]);
    const navigate=useNavigate()
    const dispatch = useDispatch<AppDispatch>()


    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await fetchData("/company/getallcompany");
                setCompanies(data);
            } catch (error) {
                console.error("Error fetching companies:", error);
            }
        };
        getData();
    }, []);

    useEffect(() => {
        const updateTotalEmployees = async () => {
            try {
                const updatedCompanies = await Promise.all(companies.map(async (company) => {
                    const totalEmployees = await fetchTotalEmployees(company._id);
                    return { ...company, totalEmployees };
                }));
                setTotalCompanies(updatedCompanies);
            } catch (error) {
                console.error("Error updating total employees:", error);
            }
        };

        if (companies.length > 0) {
            updateTotalEmployees();
        }
    }, [companies]);

    const fetchTotalEmployees = async (companyId: string): Promise<number> => {
        try {
            const { data } = await postData("/user/getuserdetails", { companyid: companyId });
            return data.length;
        } catch (error) {
            console.error(`Error fetching total employees for company ${companyId}:`, error);
            return 0;
        }
    };

    const logout=async()=>{
         await fetchData("/auth/logout")
        dispatch(userdetailslogout())
        dispatch(usercompanylogout())
        navigate("/")
    }


    return (
        <>
            <div className='px-4 py-1 bg-blue-200'>
                <div className=' flex justify-between w-full items-center'>
                    <img src={logo} alt="" className='w-20 h-15 ' />
                    <p className='font-medium text-xl cursor-pointer hover:text-blue-500' onClick={()=>{logout()}}>logout</p>
                </div>
            </div>
            <div className='px-6 py-2'>
                <table className='min-w-full'>
                    <thead>
                        <tr>
                            <th className='py-2'>Company Name</th>
                            <th className='py-2'>Created At</th>
                            <th className='py-2'>Total Employees</th>
                            <th className='py-2'>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {totalCompanies?.map((company: any, index: any) => (
                            <tr key={index}>
                                <td className='border px-4 py-2'><div className='flex gap-2 font-medium items-center'><img src={company?.Companylogo} alt="" className='w-20 h-14'/><p>{company?.Name}</p></div></td>
                                <td className='border px-4 py-2'>{new Date(company?.createdAt).toLocaleString()}</td>
                                <td className='border px-4 py-2'>{company.totalEmployees}</td>
                                <td className='border px-4 py-2 text-green-500 font-medium'>active</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}


export default AdminDashboard
