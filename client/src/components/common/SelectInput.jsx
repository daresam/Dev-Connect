import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SelectInput = ({
    name,
    value,
    label,
    info,
    onChange,
    error,
    options

}) => {
    const selectOptions = options.map(option => (
        <option key={option.label} value={option.value}>
            {option.label}
        </option>
    ));
    return (
        <div className="form-group">
            <select 
                className={classnames('form-control form-control-lg',
                {'is-invalid': error })}
                value={value}
                name={name}
                onChange={onChange}
                >
                {selectOptions}
                </select>
                {info && (<small className="form-text text-muted">{info}</small>)}
                {error && (<div className="invalid-feedback">{error}</div>)}
        </div>
    );
}

SelectInput.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    info: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string,
    options: PropTypes.array.isRequired
};



export default SelectInput;
