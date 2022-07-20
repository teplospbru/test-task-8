import { useState } from 'react';
import { CLOSE_MODAL, EMAIL_INPUT_VALUE, SUBSCRIBE_EMAIL } from '../store/constants';
import Monsters from './monsters.png'

const Modal = ({ dispatch, value }) => {
    const [ isChecked, setChecked ] = useState(false); // состояние чекбокса
    const [ isCheckboxAlert, setCheckboxAlert ] = useState(false); // состояние алерта чекбокса
    const [ isInputAlert, setInputAlert ] = useState(false); // состояние алерта инпута
    
    // Хэндлер кнопки "крестик"
    const closeBtnHandler = (e) => {
        e.preventDefault();
        dispatch({ type: CLOSE_MODAL })
    }

    // Хэндлер чекбокса
    const checkboxHandler = (e) => {
        e.stopPropagation();
        setChecked(isChecked => !isChecked);
        setCheckboxAlert(false);
    }

    // Хэндлер инпута
    const emailInputHandler = (e) => {
        const value = e.target.value;
        dispatch({ type: EMAIL_INPUT_VALUE, payload: value });
    }

    // Хэндлер кнопки subscribe
    const subscribeBtnHandler = (e) => {
        e.preventDefault();

        if(isChecked) { // если чекбокс зачекан
            const validate = /^\S+@\S+$/; // простая валидация email
            if(validate.test(value)) { // если email-адрес валидный
                dispatch({ type: SUBSCRIBE_EMAIL });
            } else { // если невалидный
                setInputAlert(true);
            }
        } else { // если чекбокс не зачекан
            setCheckboxAlert(true);
        }
    }

    return (
        <div className="modal" data-testid="modal">
            <div className="pop-up">
                <a href="" className="close" onClick={ e => closeBtnHandler(e) } data-testid="close">
                    <svg>
                        <use xlinkHref="#close"></use>
                    </svg>
                </a>
                <div className="images-container">
                    <svg width="567" height="502">
                        <use xlinkHref="#mask-1"></use>
                    </svg>
                    <div className="oblique-image">
                        <img src={ Monsters } alt=""></img>
                    </div>
                </div>
                <div className="text-container">
                    <div className="title">
                        <h1 className="big">10%</h1>
                        <h1 className="small">off</h1>
                    </div>
                    <span className="promo-1">your first order</span>
                    <div className="line"></div>
                    <span className="promo-2">Subscribe to recieve 10% off promocode plus<br/>exclusive offers and deals</span>
                    <form className="subscribe">
                        <label className="label-1">Email-address{ isInputAlert && ( <span style={{ color: 'red' }} data-testid="alert-span">  invalid email</span> ) }</label>
                        <input type="text" name="email" onChange={ e => emailInputHandler(e) } value={ value } data-testid="input"></input>
                        <input type="submit" value="Subscribe" onClick={ e => subscribeBtnHandler(e) } data-testid="submit"></input>
                        <label className="label-2" htmlFor="policy">
                            <input type="checkbox" name="policy" id="policy" onClick={ e => checkboxHandler(e) } data-testid="checkbox"></input>
                            I’m agree with privacy policy
                            <div className="checkbox__unchecked">
                                <svg style={ isCheckboxAlert ? { fill: 'red' } : null } data-testid="unchecked">
                                    <use xlinkHref="#unchecked"></use>
                                </svg>
                            </div>
                            <div className="checkbox__checked">
                                <svg>
                                    <use xlinkHref="#checked"></use>
                                </svg>
                            </div>
                        </label>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Modal;