import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

import styled from 'styled-components';


const Centered = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;


export default function UpdatesFooter(props) {
    return(
        <Centered>
            <ButtonGroup>
                <Button
                    variant="secondary"
                    onClick={() => {
                        props.setKwargs({
                            ...props.kwargs,
                            ...{
                                limit: props.kwargs['limit'] + props.LIMIT_DEFAULT,
                            }
                        });
                    }}
                >
                    More!
                </Button>
                <Button
                    variant="secondary"
                    onClick={() => {
                        props.setKwargs({
                            ...props.kwargs,
                            ...{
                                limit: props.LIMIT_DEFAULT,
                            }
                        });
                    }}
                >
                    Reset
                </Button>
            </ButtonGroup>
        </Centered>
    )
}
