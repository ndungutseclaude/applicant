import { FETCH_QUESTIONS } from './index';
import axios from 'axios';

export const getQuestions = () => async dispatch =>{
    //console.log('ACTION IS WORKING')
    // const response = await axios.get('https://codecatalyst-rwanda.herokuapp.com/api/')
    const response = await axios.get('https://codecatalyst-test.herokuapp.com/api/')
    console.log(response)
    dispatch({
        type: FETCH_QUESTIONS,
        payload: response.data
    })
}