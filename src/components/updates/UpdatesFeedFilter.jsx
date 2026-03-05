import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';


export default function UpdatesFeedFilter(props) {
    const PRIVATE_BUTTON_TITLE = {
        all: 'Privacy: Full',
        false: 'Privacy: Public',
        true: 'Privacy: Private',
    };
    const PRIVATE_BUTTON_VARIANT = {
        all: 'warning',
        false: 'secondary',
        true: 'danger',
    };

    return(
        <>
            <DropdownButton
                title={PRIVATE_BUTTON_TITLE[props.kwargs.get('private')]}
                variant={PRIVATE_BUTTON_VARIANT[props.kwargs.get('private')]}
            >
                <Dropdown.Item
                    onClick={() => props.setKwargs({
                        ...Object.fromEntries(props.kwargs.entries()),
                        ...{
                            'private': false,
                        }
                    })}
                    active={props.kwargs.get('private') === false}
                >
                    Public
                </Dropdown.Item>
                <Dropdown.Item
                    onClick={() => props.setKwargs({
                        ...Object.fromEntries(props.kwargs.entries()),
                        ...{
                            'private': true,
                        }
                    })}
                    active={props.kwargs.get('private') === true}
                >
                    Private
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                    onClick={() => props.setKwargs({
                        ...Object.fromEntries(props.kwargs.entries()),
                        ...{
                            'private': 'all',
                        }
                    })}
                    active={props.kwargs.get('private') === 'all'}
                >
                    Full
                </Dropdown.Item>
            </DropdownButton>

            <p>debug: {JSON.stringify(Object.fromEntries( props.kwargs.entries() ))}</p>
        </>
    )
}

UpdatesFeedFilter.propTypes = {
    kwargs: PropTypes.object.isRequired,
    setKwargs: PropTypes.func.isRequired,
    DEFAULT_KWARGS: PropTypes.object.isRequired,
};
