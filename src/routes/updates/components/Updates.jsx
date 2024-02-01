import ListGroup from 'react-bootstrap/ListGroup';
import styled from 'styled-components';
import { format } from "date-fns";


export default function UpdatesList(props) {
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

    const group_updates = (
        <ListGroup>
            {group.updates.map((update) => (
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
        const group_header = (
            <h4>
                <SecondaryA
                    href={`/feeds/${group.feed_data._id}`}
                    target='_blank'
                >
                    { group.feed_data.title }
                </SecondaryA>
            </h4>
        )

        const group_details = (
            <Secondary>
                &nbsp;&nbsp;&nbsp;by <SecondaryA
                    href={"/feeds/"+ group.feed_data._id}
                    target='_blank'
                >
                    { group.feed_data.title }
                </SecondaryA>
                {group.feed_data.private && (
                    <span style={{
                        opacity: .5,
                    }}>
                        { group.feed_data.private ? '🏮' : ''}
                    </span>
                )}
                {'region' in group.feed_data.json && `, ${group.feed_data.json.region}`}
                {'tags' in group.feed_data.json && `, [${group.feed_data.json.tags}]`}
            </Secondary>
        )

        return (
            <Group>
                {group_header}
                {group_updates}
                {group_details}
            </Group>
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
