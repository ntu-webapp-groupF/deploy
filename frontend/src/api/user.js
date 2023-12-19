import api from './axiosClient';
import { parseApiResponse } from './axiosUtility';

const USER_BASE_URL = '/users';

export const userApi = {
    async register(username, password){
        try{
            const response = await api.post(USER_BASE_URL + '/register', {
                username, password
            });
            return parseApiResponse(response);
        } catch (err) {
            console.log(err)
            return parseApiResponse(err);
        }
    },
    async login(username, password){
        try{
            const response = await api.post(USER_BASE_URL + '/login', {
                username, password
            });
            return parseApiResponse(response);
        } catch ( err ){
            return parseApiResponse(err);
        }
    },
    async logout(){
        try{
            const response = await api.post(USER_BASE_URL + '/logout');
            return parseApiResponse(response);
        } catch ( err ){
            return parseApiResponse(err);
        }
    },
    async getCurrentUser(){
        try{
            const response = await api.get(USER_BASE_URL + '/');
            return parseApiResponse(response);
        } catch ( err ){
            return parseApiResponse(err);
        }
    },
    async edit(username, old_password, new_password){
        try {
            const response = await api.put(USER_BASE_URL + '/update', {
                username, old_password, new_password
            });
            return parseApiResponse(response);
        } catch (err) {
            return parseApiResponse(err);
        }
    },
    async joinMember(id){
        try {
            const response = await api.post(USER_BASE_URL + `/add/${id}`);
            return parseApiResponse(response);
        } catch (err) {
            return parseApiResponse(err);
        }
    }
};
