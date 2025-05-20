/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useMemo } from "react";
import { type AxiosInstance } from "axios";

const useAxios = (
  useApi: boolean = true,
  version: number = 1,
): AxiosInstance | undefined => {
  const axiosInstance: AxiosInstance | undefined = useMemo(() => {
    return axios.create({
      baseURL: `http://127.0.0.1:4000/${useApi ? "api" : ""}/${useApi ? "v" + version : ""}`,
    });
  }, []);

  useEffect(() => {
    if (!axiosInstance) return;
  }, [axiosInstance]);

  return axiosInstance;
};

export default useAxios;
