import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';


export default function UpdatesFilter(props) {
    function kwargsUpdate(key, value) {
        let dict = {};
        Object.assign(dict, props.kwargs);
        dict[key] = value;

        props.setKwargs(dict);
    }
    function kwargsRemove(key) {
        let dict = {};
        Object.assign(dict, props.kwargs);
        delete dict[key];

        props.setKwargs(dict);
    }

    const privateButtonVariant = {
        undefined: 'warning',
        false: 'secondary',
        true: 'danger',
    }

    return(
        <>
            <DropdownButton
                title='Privacy'
                variant={privateButtonVariant[props.kwargs.private]}
            >
                <Dropdown.Item
                    onClick={() => kwargsRemove('private')}
                    active={props.kwargs.private === undefined}
                >
                    Full
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                    onClick={() => kwargsUpdate('private', true)}
                    active={props.kwargs.private === true}
                >
                    Private
                </Dropdown.Item>
                <Dropdown.Item
                    onClick={() => kwargsUpdate('private', false)}
                    active={props.kwargs.private === false}
                >
                    Public
                </Dropdown.Item>
            </DropdownButton>

            <p>debug: {JSON.stringify(props.kwargs)}</p>
        </>
    )
}
