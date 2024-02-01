import ListGroup from 'react-bootstrap/ListGroup';
import styled from 'styled-components';
import { format } from "date-fns";


export default function FeedUpdatesList(props) {
    const COLOR = 'black'
    const COLOR_ACCENT = 'red'
    const COLOR_VISITED = 'grey'

    const UpdateGroupDiv = styled.div`
        margin: 15px 0;
    `;
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

    let processed = [];
    props.feedUpdates.forEach((item) => {
        if (processed.length === 0 || processed.at(-1).feed_data._id !== item.feed_id) {
            let { feed_data, ...item_only } = item;
            processed.push({
                feed_data: feed_data,
                updates: [item_only],
            })
        } else {
            processed.at(-1).updates.push(item)
        }
    })

    function UpdateGroup(group) {
        return (
            <UpdateGroupDiv>
                <ListGroup>
                {group.updates.map((update) => (
                    <ListGroup.Item>
                        <div>
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
                        { update.feed_id != null &&
                        <UpdateSecondary>
                            <span style={{
                                opacity: .2,
                            }}>
                                { group.feed_data.private ? '🏮' : '💎'}
                            </span>
                            by <UpdateSecondaryA
                                href={"/feeds/"+ update.feed_id}
                                target='_blank'
                            >
                                { group.feed_data.title }
                            </UpdateSecondaryA>
                            &nbsp;on {
                                format(
                                    new Date(update.datetime.replace(' ', 'T')+"Z"),
                                    "yyyy-MM-dd HH:mm"
                                )
                            }
                        </UpdateSecondary>
                    }
                    </ListGroup.Item>
                ))}
                </ListGroup>
            </UpdateGroupDiv>
        )
    }

    function GenerateUpdateGroup(processed) {
        return (
            <div>
                {processed.map(feed => UpdateGroup(feed))}
            </div>
        )
    }

    return (
        GenerateUpdateGroup(processed)
    )
}
