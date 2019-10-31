import { FETCH_QUESTIONS } from './index';
import axios from 'axios';

export const getQuestions = () => async dispatch =>{
    //console.log('ACTION IS WORKING')
    const response = await axios.get('https://code-catalist-phone-book-rails.herokuapp.com/contacts')
    console.log(response)
    dispatch({
        type: FETCH_QUESTIONS,
        payload: response.data
    })
}