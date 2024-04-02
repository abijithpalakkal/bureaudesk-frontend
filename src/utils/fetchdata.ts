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
      }
      throw new Error('Unsuccessful response');
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
  
  export default fetchData;