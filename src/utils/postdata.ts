import { toast } from "react-toastify";
import { commonRequest } from "../config/api";



const config = {
    headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      credentials: "include"
  };
  const postData = async (url: string, body: any) => {
    try {
      const response = await commonRequest("post", url, config, body);
      if (response.data?.status) {
        return { data: response.data.payload, loading: false,message:response?.data?.message };
      }
      else{
       
        throw new Error(response.data.errorResponse.message);
      }
    } catch (error: any) {
     toast.error(error.message)
      throw new Error(error.message)
    }
  };


  export default postData;