export const initialState = {
    basket: localStorage.getItem('basket') ? JSON.parse(localStorage.getItem('basket')) : []
};



const reducer = (state, action) => {
    switch (action.type) {
        case 'add_basket':
            localStorage.setItem('basket', JSON.stringify([...state.basket, action.data]))
            return {
                ...state,
                basket: [...state.basket, action.data]
            }
        case 'remove_basket':
            localStorage.setItem('basket', JSON.stringify([...state.basket.filter(item => item.id !== action.data.id)]))
            return {
                ...state,
                basket: [...state.basket.filter(item => item.id !== action.data.id)]
            }
        default:
            return state;
    }
}

export default reducer;