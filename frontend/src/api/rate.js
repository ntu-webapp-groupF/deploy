import api from "./axiosClient";
import { parseApiResponse } from "./axiosUtility";

const RATE_BASE_URL = '/rates';

export const rateApi = {
    async getBookRating(book_id){
        try{
            const response = await api.get(RATE_BASE_URL + `/${book_id}`);
            return parseApiResponse(response)
        } catch (err) {
            return parseApiResponse(err)
        }
    },
}