import { useState } from "react";
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
      console.log(url,'------body');
      
      const response = await commonRequest("get", url, config);
      if (response?.data?.status) {
        console.log(response?.data?.payload,'data====...');
        return { data: response?.data?.payload, loading: false };
      }else{
        console.log(response.data)
        throw new Error(response.data.errorResponse.message);
      }
      
    } catch (error: any) {
      console.log(error.message)
      throw new Error(error.message);
    }
  };
  
  export default fetchData;