import { commonRequest } from "../config/api";



const config = {
    headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      credentials: "include"
  };
  

const updateData = async(url: string,body: any) => {
    try {
      const response = await commonRequest("patch", url, config,body);
      if (response?.data?.status) {
     
        return { status:true,data: response?.data?.payload, loading: false,message:response?.data?.message };
      }else{

        throw new Error(response.data.errorResponse.message);

      }
      
    } catch (error: any) {
      
    
      throw new Error(error.message);
    }
  };
  
  export default updateData;