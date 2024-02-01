import ListGroup from 'react-bootstrap/ListGroup';
import styled from 'styled-components';
import { format } from "date-fns";


const COLOR = 'black'
const COLOR_ACCENT = 'red'
const COLOR_VISITED = 'grey'


const Group = styled.div`
    margin: 15px 0;
`;
const Primary = styled.a`
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
const PrimaryPrefix = styled.span`
    all: unset;  // removing defaults
    color: ${COLOR_ACCENT};
`;
const Secondary = styled.span`
    color: ${COLOR_VISITED};
    cursor: default;
`;
const SecondaryA = styled.a`
    all: unset;  // removing defaults
    cursor: pointer;
    color: ${COLOR};
    &:hover {
        color: ${COLOR_ACCENT};
    };
`;


function GroupHeader(props) {
    return (
        <h4>
            <SecondaryA
                href={`/feeds/${props.feed_data._id}`}
                target='_blank'
            >
                { props.feed_data.title }
            </SecondaryA>
        </h4>
    )
}


function GroupFooter(props) {
    return (
        <Secondary>
            &nbsp;&nbsp;&nbsp;by <SecondaryA
                href={"/feeds/"+ props.feed_data._id}
                target='_blank'
            >
                { props.feed_data.title }
            </SecondaryA>
            {props.feed_data.private && (
                <span style={{
                    opacity: .5,
                }}>
                    { props.feed_data.private ? '🏮' : ''}
                </span>
            )}
            {'region' in props.feed_data.json && `, ${props.feed_data.json.region}`}
            {'tags' in props.feed_data.json && `, [${props.feed_data.json.tags}]`}
        </Secondary>
    )
}


export function UpdatesList(props) {
    return (
        <ListGroup>
            {props.updates.map((update) => (
                <ListGroup.Item>
                    <Primary
                        href={update.href}
                        target='_blank'
                    >
                        <PrimaryPrefix>»&nbsp;</PrimaryPrefix>
                        {update.name}
                    </Primary>
                    { update.feed_id != null &&
                    <Secondary>
                        &nbsp;on {
                            format(
                                new Date(update.datetime.replace(' ', 'T')+"Z"),
                                "yyyy-MM-dd HH:mm"
                            )
                        }
                    </Secondary>
                    }
                </ListGroup.Item>
            ))}
        </ListGroup>
    )
}


export default function Updates(props) {
    let processed = [];
    props.updates.forEach((item) => {
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

    return (
        <div>
            {processed.map(feed => (
                <Group>
                    <GroupHeader
                        feed_data={feed.feed_data}
                    />
                    <UpdatesList
                        updates={feed.updates}
                    />
                    <GroupFooter
                        feed_data={feed.feed_data}
                    />
                </Group>
            ))}
        </div>
    )
}
