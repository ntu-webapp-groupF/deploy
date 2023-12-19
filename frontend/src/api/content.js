import api from "./axiosClient";
import { parseApiResponse } from "./axiosUtility";

const CONTENT_BASE_URL = '/contents';

export const contentApi = {
    async getBookContent(book_id, image_id){
        try {
            const response = await api.get(CONTENT_BASE_URL + `/${book_id}/pages/${image_id}`, {
                responseType: 'arraybuffer'
            });
            return parseApiResponse(response);
        } catch (error) {
            return parseApiResponse(error);
        }
    },
    // editBookContent send by form
}