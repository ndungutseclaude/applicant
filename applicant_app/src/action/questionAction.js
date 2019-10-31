import { FETCH_QUESTIONS } from './index';
import axios from 'axios';

export const getQuestions = () => async dispatch =>{
    //console.log('ACTION IS WORKING')
    const response = await axios.get('/api/')
    //console.log(response)
    dispatch({
        type: FETCH_QUESTIONS,
        payload: response.data
    })
}