import React from 'react';
import './error.css';
import {Alert} from "react-bootstrap";

const ErrorIndicator = ({error}) => {

    const msg = error ? error.msg : 'unknown mistake';

    return (
        <div>
            <Alert variant='danger' data-testid="error">{msg}</Alert>
        </div>
    )
};

export default ErrorIndicator;