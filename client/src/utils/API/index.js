import axios from 'axios';


//get annual returns for s&p500
export const getReturns = () => {
    return axios.get('/api/sp500');
}