import ListGroup from 'react-bootstrap/ListGroup';
import styled from 'styled-components';


export default function FeedUpdatesList(props) {
    const COLOR = 'black'
    const COLOR_ACCENT = 'red'
    const COLOR_VISITED = 'grey'

    const UpdatePrefix = styled.a`
        all: unset;  // removing defaults
        color: ${COLOR_ACCENT};
        &:hover {
            color: ${COLOR_ACCENT};
        };
        &:visited {
            color: ${COLOR_VISITED};
        };
    `;
    const UpdateName = styled.a`
        all: unset;  // removing defaults
        cursor: pointer;
        font-weight: bold;
        color: ${COLOR};
        &:hover {
            color: ${COLOR_ACCENT};
        };
        &:visited {
            color: ${COLOR_VISITED};
        };
    `;
    const UpdateSecondary = styled.div`
        color: ${COLOR_VISITED};
    `;
    const UpdateSecondaryA = styled.a`
        all: unset;  // removing defaults
        cursor: pointer;
        color: ${COLOR};
        &:hover {
            color: ${COLOR_ACCENT};
        };
    `;

    return(
        <ListGroup>
            {props.feedUpdates.map((update) => (
                <ListGroup.Item>
                    <div id="Primary">
                        <UpdatePrefix
                            href={update.href}
                            target='_blank'
                        >»&nbsp;</UpdatePrefix>
                        <UpdateName
                            href={update.href}
                            target='_blank'
                        >
                            {update.name}
                        </UpdateName>
                    </div>
                    <UpdateSecondary>
                        by <UpdateSecondaryA
                            href={"/feeds/"+ update.feed_id}
                            target='_blank'
                        >
                            { update.feed_data.title }
                        </UpdateSecondaryA>
                        &nbsp;on { update.datetime }
                    </UpdateSecondary>
                </ListGroup.Item>
            ))}
        </ListGroup>
    )
}
