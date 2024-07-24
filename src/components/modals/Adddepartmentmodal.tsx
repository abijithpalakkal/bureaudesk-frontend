import { Dispatch, SetStateAction, useState, SyntheticEvent } from 'react'
import { BiArrowBack } from 'react-icons/bi'
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import postData from '../../utils/postdata';

interface Props {
  modalstatus: Dispatch<SetStateAction<boolean>>;
};


function Adddepartmentmodal({ modalstatus }: Props) {
  const companyid = useSelector((state: RootState) => state.companydetails.company._id);
  const [departName, setdepartName] = useState('');
  const [logo, setLogo] = useState("");

  const handlesubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append('file', logo);
    formData.append('upload_preset', "ckoevhm7")
    const response: any = await fetch('https://api.cloudinary.com/v1_1/dr6mbeqwc/image/upload', {
      method: 'POST',
      body: formData
    });
    const url = await response.json()
    await postData("/company/createdepartment",{
      Name: departName,
      departmentlogo: url.secure_url,
      companyid
    })
 
    modalstatus(false)

  }

  const handleFileChange = (event: any) => {

    const file = event.target.files[0];
    setLogo(file);

  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen h-screen">
        <div className=" inset-0 bg-black  opacity-50 relative h-full w-full"></div>
        <div className="bg-white rounded-lg shadow-2xl p-6 absolute ">

          <div className='bg-blue-600 w-6 h-6 rounded-md flex justify-center items-center border border-black' onClick={() => modalstatus(false)}><BiArrowBack /></div>
          <div className="mb-4">
            <h2 className="text-lg font-bold">create department</h2>
          </div>
          <form onSubmit={handlesubmit}>
            <div className='flex flex-col'>
              <label htmlFor="companyName" className='mb-2'>Company Name:</label>
              <input
                type="text"
                id="companyName"
                value={departName}
                onChange={(e) => setdepartName(e.target.value)}
                required
                className="border border-blue-600 rounded-md py-2 px-3 focus:outline-none focus:border-blue-400"
              />
            </div>
            <div className='flex flex-col'>
              <label htmlFor="logo" className='mb-2'>Company Logo:</label>
              <input
                type="file"
                id="logo"
                accept="image/*"
                onChange={handleFileChange}
                required
              />
            </div>
            <div className='flex justify-center '>
              <button type="submit" className="bg-blue-500 mt-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Adddepartmentmodal
