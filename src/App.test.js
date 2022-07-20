import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { EMAIL_INPUT_VALUE, SUBSCRIBE_EMAIL } from './store/constants';
import { reducer } from './store/reducer';

describe('App', () => {
  it('renders wrapper with text and button onload', () => {
    render(<App />);

    expect(screen.getByText(/Subscribe to receive promocode/i)).toBeInTheDocument();
    expect(screen.getByTestId('proceed')).toBeInTheDocument();
  });
  it('opens modal by click on \'Proceed\'', () => {
    render(<App />);
    const proceed = screen.getByTestId('proceed');

    fireEvent.click(proceed);
    expect(screen.getByTestId('modal')).toBeInTheDocument();
  });
  it('closes modal by click on \'Close\'', async () => {
    render(<App />);
    const proceed = screen.getByTestId('proceed');

    fireEvent.click(proceed);

    const close = screen.getByTestId('close');
    expect(await screen.findByText(/10% off/i)).toBeInTheDocument();

    fireEvent.click(close);
    expect(screen.queryByText(/10% off/i)).not.toBeInTheDocument();
  });
  it('changes color of checkbox to red by click \'Submit\' while checkbox is unchecked', () => {
    render(<App />);
    const proceed = screen.getByTestId('proceed');

    fireEvent.click(proceed);

    const checkbox = screen.getByTestId('checkbox');
    const unchecked = screen.getByTestId('unchecked');
    const submit = screen.getByTestId('submit');
    expect(checkbox).toBeInTheDocument();
    expect(submit).toBeInTheDocument();

    fireEvent.click(submit);
    expect(unchecked).toHaveStyle('fill: red');
  });
  it('writes warning text by click \'Submit\' while checkbox is checked and field is empty', () => {
    render(<App />);
    const proceed = screen.getByTestId('proceed');

    fireEvent.click(proceed);

    const checkbox = screen.getByTestId('checkbox');
    const input = screen.getByTestId('input');
    const submit = screen.getByTestId('submit');
    expect(input).toBeInTheDocument();
    expect(submit).toBeInTheDocument();

    fireEvent.click(checkbox);
    fireEvent.click(submit);
    expect(screen.getByTestId('alert-span')).toBeInTheDocument();
  });
  it('writes warning text by click \'Submit\' while email is invalid', () => {
    render(<App />);
    const proceed = screen.getByTestId('proceed');

    fireEvent.click(proceed);

    const checkbox = screen.getByTestId('checkbox');
    const input = screen.getByTestId('input');
    const submit = screen.getByTestId('submit');
    expect(input).toBeInTheDocument();
    expect(submit).toBeInTheDocument();

    fireEvent.click(checkbox);
    fireEvent.change(input, {target: {value: 'Some messy text'}})
    fireEvent.click(submit);
    expect(screen.getByTestId('alert-span')).toBeInTheDocument();
  });
  it('closes modal and showes green text by click \'Submit\' while email is valid and is not used yet', () => {
    render(<App />);
    const proceed = screen.getByTestId('proceed');

    fireEvent.click(proceed);

    const checkbox = screen.getByTestId('checkbox');
    const input = screen.getByTestId('input');
    const submit = screen.getByTestId('submit');
    expect(input).toBeInTheDocument();
    expect(submit).toBeInTheDocument();

    fireEvent.click(checkbox);
    fireEvent.change(input, {target: {value: 'test@test.com'}})
    fireEvent.click(submit);
    expect(screen.getByText(/You have successfully subscribed to the newsletter/i)).toBeInTheDocument();
  });
  it('closes modal and showes red text by click \'Submit\' while email is already used', async () => {
    render(<App />);
    const proceed = screen.getByTestId('proceed');

    fireEvent.click(proceed);

    expect(screen.getByTestId('checkbox')).toBeInTheDocument();
    expect(screen.getByTestId('submit')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('checkbox'));
    fireEvent.change(screen.getByTestId('input'), {target: {value: 'test@test.com'}})
    fireEvent.click(screen.getByTestId('submit'));
    expect(screen.getByText(/You have successfully subscribed to the newsletter/i)).toBeInTheDocument();

    fireEvent.click(proceed);
    fireEvent.click(screen.getByTestId('checkbox'));
    fireEvent.change(screen.getByTestId('input'), {target: {value: 'test@test.com'}})
    fireEvent.click(screen.getByTestId('submit'));
    expect(await screen.findByText(/You have already subscribed to the newsletter/i)).toBeInTheDocument();
  });
  it('loads emails list from local storage onload', () => {

    // здесь тестируем редьюсер, предположив, что в из local storage в initialState попадёт 1 имэйл-адрес
    const initialState = {
      isModal: false,
      value: '',
      usedEmails: ['test@test.com'],
      message: 'Subscribe to receive promocode',
      color: ''
  }

    // проверяем, что сейчас в редьюсере 1 адрес
    expect(initialState.usedEmails.length).toBe(1);
    
    // записываем в state новый адрес
    const step_1 = reducer(initialState, { type: EMAIL_INPUT_VALUE, payload: 'yyy@xxx.net' });
    const step_2 = reducer(step_1, { type: SUBSCRIBE_EMAIL });

    // проверяем, что сейчас в редьюсере 2 адреса
    expect(step_2.usedEmails.length).toBe(2);
  });
});