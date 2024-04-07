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
      console.log(url,body,'------body');
      const response = await commonRequest("post", url, config, body);
      console.log(response,"😁💕😘❤️🚀😊👍😒😍🤣👌😂")
      if (response.data?.status) {
        return { data: response.data.payload, loading: false,message:response?.data?.message };
      }
      else{
        console.log(response.data,"chdjchjsckh cnk cknh sknc")
        throw new Error(response.data.errorResponse.message);
      }
    } catch (error: any) {
      console.log(error.message)
      alert(error.message)
      throw new Error(error.message);
    }
  };


  export default postData;