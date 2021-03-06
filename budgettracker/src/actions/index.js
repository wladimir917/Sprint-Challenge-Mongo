/* 
  Action Types Go Here!
  Be sure to export each action type so you can pull it into your reducer
*/

/*
  For this project you'll need at least 2 action creators for the main portion,
   and 2 more for the stretch problem.
   Be sure to include action types for each type of action creator. Also, be sure to mind
     the "pending" states like, fetching, creating, updating and deleting.
   C - addBudget
   R - getBudget
   U - updateBudget
   D - deleteBudget
*/

import axios from 'axios';

export const FETCH = 'FETCH';
export const ADD = 'ADD';
export const EDIT = 'EDIT';
export const CANCEL = 'CANCEL';


export const FETCHING = 'FETCHING';
export const FETCHED = 'FETCHED';

export const SAVING = 'SAVING';
export const SAVED = 'SAVED';

export const UPDATING = 'UPDATING';
export const UPDATED = 'UPDATED';

export const DELETING = 'DELETING';
export const DELETED = 'DELETED';

export const ERROR = 'ERROR';


const fetch = () => {
    return {
        type: FETCH
    }
}

const add = () => {
    return {
        type: ADD
    }
}

const edit = () => {
    return {
        type: EDIT
    }
}

const cancel = () => {
    return {
        type: CANCEL
    }
}


const fetching = () => {
    return {
        type: FETCHING
    }
}

const fetched = (data) => {
    return {
        type: FETCHED,
        payload: data
    }
}

const saving = () => {
    return {
        type: SAVING
    }
}

const saved = (data) => {
    return {
        type: SAVED,
        payload: data
    }
}

const updating = () => {
    return {
        type: UPDATING
    }
}

const updated = (data) => {
    return {
        type: UPDATED,
        payload: data
    }
}

const deleting = () => {
    return {
        type: DELETING
    }
}

const deleted = (data) => {
    return {
        type: DELETED,
        payload: data
    }
}

const error = (err) => {
    return {
        type: ERROR,
        payload: err
    }
}

export const fetchBudgets = () => {
    return function(dispatch) {
        dispatch(fetch());
    }
}

export const newBudget = () => {
    return function(dispatch) {
        dispatch(add());
    }
}

export const editBudget = () => {
    return function(dispatch) {
        dispatch(edit());
    }
}

export const cancelEdit = () => {
    return function(dispatch) {
        dispatch(cancel());
    }
}

export const getBudgets = () => {
    const promise = axios.get('http://localhost:5000/api/expenses/totals');
    console.log("fetching budgets... ")
    return function(dispatch) {
        dispatch(fetching());
        promise
            .then( res => {
                //Simulates delay on server response
                setTimeout(() => {
                    dispatch(fetched(res.data));
                }, 1000);
            })
            .catch( err => {
                dispatch(error(err));
            })
    }
}

export const addBudget = (budget) => {
    const promise = axios.post('http://localhost:5000/api/budgets', budget);
    return function(dispatch) {
        dispatch(saving());
        promise
            .then( res => {
                dispatch(saved(res.data))
                dispatch(cancelEdit());
            })
            .catch( err => {
                dispatch(error(err));
            })
    }
}

export const updateBudget = (budget) => {
    const promise = axios.put(`http://localhost:5000/api/budgets/${budget.id}`, budget)
    return function(dispatch) {
        dispatch(updating())
        promise
            .then( res  => {
                dispatch(updated(res.data));
                dispatch(cancelEdit());
            })
            .catch( err => {
                dispatch(error(err));
            })
    }
}

export const deleteBudget = (budget) => {
    const promise = axios.delete(`http://localhost:5000/api/budgets${budget.id}`)
    return function(dispatch) {
        dispatch(deleting())
        promise 
            .then( res => {
                console.log("deleted res ", res.data);
                dispatch(deleted(res.data));
            })
            .catch( err => {
                dispatch(error(err));
            })
    }
}