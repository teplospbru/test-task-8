import { useReducer } from 'react';
import { initialState, reducer } from './store/reducer';
import { OPEN_MODAL } from './store/constants';

// Components
import Modal from './components/modal'

function App() {
  const [{ color, isModal, message, value }, dispatch] = useReducer(reducer, initialState);
  
  return (
    <div className="App">

        <div className="wrapper">
            <span className="promo-2" style={{ color }}>{ message }</span>
            <button onClick={ () => dispatch({ type: OPEN_MODAL }) } data-testid="proceed">Proceed</button>
        </div>

        { isModal && ( <Modal dispatch={ dispatch } value={ value } /> ) }

    </div>
  );
}

export default App;