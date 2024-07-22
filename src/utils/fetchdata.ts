import { commonRequest } from "../config/api";



const config = {
    headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      credentials: "include"
  };
  

const fetchData = async(url: string) => {
    try {
     
      const response = await commonRequest("get", url, config);
      if (response?.data?.status) {
     
        return { data: response?.data?.payload, loading: false,message:response?.data?.message };
      }else{
   
        throw new Error(response.data.errorResponse.message);
      }
      
    } catch (error: any) {
    
      throw new Error(error.message);
    }
  };
  
  export default fetchData;