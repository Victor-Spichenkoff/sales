import { AxiosResponse } from "axios";

export const handleTokenError = (resposne: AxiosResponse) => {
    if(resposne.status != 403) 
        return resposne

    //lidar com o forbidden
}   