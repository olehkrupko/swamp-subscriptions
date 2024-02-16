import ListGroup from 'react-bootstrap/ListGroup';

import styled from 'styled-components';


const COLOR_ACCENT = 'red';
const COLOR_VISITED = 'grey';


const Group = styled.div`
    margin: 15px 0;
`;
const Primary = styled.a`
    all: unset;  // removing defaults
    cursor: pointer;
    font-weight: bold;
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
                href={"/feeds/"+ props.feed._id}
                target='_blank'
            >
                <b>{ props.feed.title }</b>
            </SecondaryA>
            {props.feed.private && (
                <span style={{
                    opacity: .5,
                }}>
                    { props.feed.private ? '🏮' : ''}
                </span>
            )}
            {'region' in props.feed.json && `, ${props.feed.json.region}`}
            {'tags' in props.feed.json && `, [${props.feed.json.tags}]`}
        </Secondary>
    )
}


export function UpdatesList(props) {
    function datetime_str_format(dt_str) {
        const not_including = ['+', '-']
        if (!not_including.some(function(v) { return dt_str.includes(v); })) {
            dt_str = dt_str.replace(' ', 'T')+"Z";
        }

        const dt = new Date(dt_str);
        const dt_str_date = `${ dt.getFullYear() }/${ ('0'+dt.getMonth()).slice(-2) }/${ dt.getDay() }`
        const dt_fmt_time = `${ dt.getHours() }:${ dt.getMinutes() }`
        const dt_fmt_tz   = `GMT${ dt.getTimezoneOffset()<0 ? '+' : '' }${ -dt.getTimezoneOffset()/60 }`
        const dt_fmt      = `${dt_str_date} ${dt_fmt_time} ${dt_fmt_tz}`

        const dt_now = new Date();
        const diff_minutes = Math.round((dt_now - dt)/(      60*1000));
        const diff_hours   = Math.round((dt_now - dt)/(   60*60*1000));
        const diff_days    = Math.round((dt_now - dt)/(24*60*60*1000));
        let diff_str = '';
        if (diff_minutes === 1) {
            diff_str = '1 minute';
        } else if (1 < diff_minutes && diff_minutes <= 60) {
            diff_str = `${diff_minutes} minutes`;
        } else if (1 < diff_hours && diff_hours <= 24) {
            diff_str = `${diff_hours} hours`;
        } else if (1 < diff_days && diff_days <= 12) {
            diff_str = `${diff_days} days`;
        }

        if (diff_str !== '') {
            return `${dt_fmt} (${diff_str} ago)`
        } else {
            return dt_fmt;
        }
    }

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
                    <Secondary>
                        &nbsp;on { datetime_str_format(update.datetime) }
                    </Secondary>
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
    });

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
                        feed={feed.feed_data}
                    />
                </Group>
            ))}
        </div>
    )
}
