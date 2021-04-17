import React from 'react';
import ErrorIndicator from './index';
import {render} from '@testing-library/react';

const error = {
    msg: 'error from msg'
};

describe('ErrorIndicator component', () => {
    it('should render error with default text', () => {
        const {getByTestId} = render(
            <ErrorIndicator/>
        );

        const element = getByTestId('error');

        expect((element).textContent).toBe('unknown mistake');
    });

    it('should render error from msg', () => {
        const {getByTestId} = render(
            <ErrorIndicator error={error}/>
        );

        const element = getByTestId('error');

        expect((element).textContent).toBe('error from msg');
    });
});