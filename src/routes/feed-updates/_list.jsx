import ListGroup from 'react-bootstrap/ListGroup';
import styled from 'styled-components';
import { format } from "date-fns";


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
                    { update.feed_id != null ? 
                    <UpdateSecondary>
                        <span style={{
                            opacity: .2,
                        }}>
                            { update.feed_data.private ? '🏮' : '💎'}
                        </span>
                        by <UpdateSecondaryA
                            href={"/feeds/"+ update.feed_id}
                            target='_blank'
                        >
                            { update.feed_data.title }
                        </UpdateSecondaryA>
                        &nbsp;on {
                            format(
                                new Date(update.datetime.replace(' ', 'T')+"Z"),
                                "yyyy-MM-dd HH:mm"
                            )
                        }
                    </UpdateSecondary>
                    : ''}
                </ListGroup.Item>
            ))}
        </ListGroup>
    )
}
