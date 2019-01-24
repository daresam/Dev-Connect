import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const TextInput = ({
    name,
    placeholder,
    type,
    value,
    label,
    info,
    onChange,
    disabled,
    error

}) => {
    return (
        <div className="form-group">
            <input 
                type={type}
                className={classnames('form-control form-control-lg',
                {'is-invalid': error })}
                placeholder={placeholder} name={name}  
                value={value} onChange={onChange}
                disabled={disabled}

                />
                {info && (<small className="form-text text-muted">{info}</small>)}
                {error && (<div className="invalid-feedback">{error}</div>)}
        </div>
    );
}

TextInput.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    info: PropTypes.string,
    error: PropTypes.string,
    type: PropTypes.string,
    disabled: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string,
};

TextInput.defaultPropTypes = {
    type: 'text'
};

export default TextInput;
