import  {FETCH_QUESTIONS}  from '../action/index';

const initialState={
    questions:[]
};

export default function (state = initialState, action){
    switch(action.type){
        case FETCH_QUESTIONS :
            return action.payload;
        default:
            return state
    }
}