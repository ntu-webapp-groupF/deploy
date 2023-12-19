import api from "./axiosClient";
import { parseApiResponse } from "./axiosUtility";

const CATEGORY_BASE_URL = '/categories';

export const categoryApi = {
    async createCategory(category_name){
        try{
            const response = await api.post(CATEGORY_BASE_URL + '/', {
                categoryname: category_name   
            })
            return parseApiResponse(response)
        } catch (err) {
            return parseApiResponse(err);
        }
    },
    async getAllCategories(){
        try{
            const repsonse = await api.get(CATEGORY_BASE_URL + '/');
            return parseApiResponse(repsonse)
        } catch (err) {
            return parseApiResponse(err);
        }
    },
}