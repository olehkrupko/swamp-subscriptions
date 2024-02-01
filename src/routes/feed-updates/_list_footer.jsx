import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';


export default function UpdatesFooter(props) {
    return(
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
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
        </div>
    )
}
