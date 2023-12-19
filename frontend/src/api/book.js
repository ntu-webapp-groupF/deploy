import api from "./axiosClient";
import { parseApiResponse } from "./axiosUtility";

const BOOK_BASE_URL = '/books';

export const bookApi = {
    async getAllBooks(){
        try{
            const response = await api.get(BOOK_BASE_URL + '/');
            return parseApiResponse(response)
        } catch (err) {
            return parseApiResponse(err)
        }
    },
    async getBookById(book_id){
        try{
            const response = await api.get(BOOK_BASE_URL + `/${book_id}`);
            return parseApiResponse(response)
        } catch (err) {
            return parseApiResponse(err)
        }
    },
    async getRecommendBooks(){
        try {
            const response = await api.get(BOOK_BASE_URL + '/recommends');
            return parseApiResponse(response);
        } catch (err) {
            return parseApiResponse(err);
        }
    },
    async getBookByCategorys(category_list){
        try {
            const response = await api.get(BOOK_BASE_URL + '/', {
                Categorys: category_list
            });
            return parseApiResponse(response);
        } catch (err) {
            return parseApiResponse(err);
        }
    },
    async getCollectionBooks(){
        try {
            const response = await api.get(BOOK_BASE_URL + '/collections');
            return parseApiResponse(response);
        } catch (err) {
            return parseApiResponse(err);
        }
    },
    async getBooksByAgeRange(age1, age2){
        try {
            const response = await api.get(BOOK_BASE_URL + `/age/${age1}/${age2}`);
            return parseApiResponse(response);
        } catch (err) {
            return parseApiResponse(err);
        }
    },
    async getBooksByPriceRange(price1, price2){
        try {
            const response = await api.get(BOOK_BASE_URL + `/price/${price1}/${price2}`);
            return parseApiResponse(response);
        } catch (err) {
            return parseApiResponse(err);
        }
    },
    async getPurchasedBooks(){
        try {
            const response = await api.get(BOOK_BASE_URL + '/purchased');
            return parseApiResponse(response);
        } catch (err) {
            return parseApiResponse(err);
        }
    },
    async getUploadedBooks(){
        try{
            const response = await api.get(BOOK_BASE_URL + '/uploaded');
            return parseApiResponse(response);
        }
        catch(err){
            return parseApiResponse(err);
        }
    },
    async createBooks(formData){
        try{
            const response = await api.post(BOOK_BASE_URL + '/', formData, {
                headers: {
                    'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
                }
            });
            return parseApiResponse(response);
        } catch( err ){
            return parseApiResponse(err);
        }
    },
    // createBooks send by form
    async purchasedBooks(book_id){
        try {
            const response = await api.post(BOOK_BASE_URL + `/purchased/${book_id}`);
            return parseApiResponse(response);
        } catch (err) {
            return parseApiResponse(err);
        }
    },
    async addBookToCollections(book_id){
        try {
            const response = await api.post(BOOK_BASE_URL + `/collection/${book_id}`);
            return parseApiResponse(response);
        } catch (err) {
            return parseApiResponse(err);
        }
    },
    async editBook(id, bookname, description, category_names, age, price){
        try {
            const response = await api.put(BOOK_BASE_URL + `/edit/${id}`, {
                bookname, description, category_names, age, price
            });
            return parseApiResponse(response);
        } catch (err) {
            return parseApiResponse(err);
        }
    },
    async deleteBook(book_id){
        try {
            const response = await api.delete(BOOK_BASE_URL + `/${book_id}`);
            return parseApiResponse(response);
        } catch (err) {
            return parseApiResponse(err);
        }
    }
}