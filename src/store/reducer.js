import { CLOSE_MODAL, EMAIL_INPUT_VALUE, OPEN_MODAL, SUBSCRIBE_EMAIL } from "./constants";

export const initialState = {
    isModal: false, // показ модального окна
    value: '', // хэндлер инпута имэйла
    usedEmails: localStorage.getItem('usedEmails') ? JSON.parse(localStorage.getItem('usedEmails')) : [], // список использованных имэйлов
    message: 'Subscribe to receive promocode', // сообщения перед кнопкой proceed
    color: '' // цвет сообщения перед кнопкой proceed
};

export const reducer = (state, action) => {
    switch(action.type) {
        case OPEN_MODAL:
            return {
                ...state,
                isModal: true
            }
        case CLOSE_MODAL:
            return {
                ...state,
                isModal: false
            }
        case EMAIL_INPUT_VALUE:
            return {
                ...state,
                value: action.payload
            }
        case SUBSCRIBE_EMAIL:
            let color, message, arr;
            // если список использованных имэйлов не пуст
            if(state.usedEmails.length > 0) {
                // если в списке использованных имэйлов есть имэйл из хэндлера инпута имэйла
                if(state.usedEmails.some(email => email === state.value)) {
                    color = 'red';
                    message = 'You have already subscribed to the newsletter';
                } else { // если в списке использованных имэйлов нет имэйла из хэндлера инпута имэйла
                    color = 'green';
                    message = 'You have successfully subscribed to the newsletter';
                    arr = [...state.usedEmails, state.value];
                    localStorage.setItem('usedEmails', JSON.stringify(arr));
                };
            } else { // если список использованных имэйлов пуст
                color = 'green';
                message = 'You have successfully subscribed to the newsletter';
                arr = [...state.usedEmails, state.value];
                localStorage.setItem('usedEmails', JSON.stringify(arr));
            };
            return {
                ...state,
                isModal: false,
                usedEmails: arr ? arr : [...state.usedEmails],
                color,
                message
            }
        default: return state;
    }
}