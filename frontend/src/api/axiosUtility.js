export const parseApiResponse = (response) => {
    if( response.status === 200 ){
        return {
            status: response.status,
            data: response.data
        }
    } else {
        const res = response.response
        if( res.data.message ) {
            return {
                status: res.status,
                data: res.data.message
            }
        }
        else if( res.data.data ){
            return {
                status: res.status,
                data: res.data.data
            }
        }
        else {
            return {
                status: res.status,
                data: res.data.error
            }
        }
    }
}