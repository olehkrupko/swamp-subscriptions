import PropTypes from 'prop-types';
import ListGroup from 'react-bootstrap/ListGroup';
import styled from 'styled-components';


const COLOR_ACCENT = 'red';
const COLOR_VISITED = 'grey';


const Group = styled.div`
    margin: 15px 0;
`;
const Update = styled.ul`
    all: unset;  // removing defaults
    font-size: 19px;
    line-height: 1.2;
`;
const UpdateLi = styled.li`
    list-style-type: none;
    text-decoration: none;
    word-break: normal;
    overflow-wrap: break-word;
    &:before {
        content: "»";
        color: rgba(0, 0, 0, 0);
        font-weight: bold;
        padding-right: 7px;
    };
`;
const Primary = styled(UpdateLi)`
    &:before {
        color: red;
    };
`;
const Secondary = styled(UpdateLi)`
    color: ${COLOR_VISITED};
    cursor: default;
`;
const PrimaryA = styled.a`
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
const AccentA = styled.a`
    all: unset;  // removing defaults
    cursor: pointer;
    &:hover {
        color: ${COLOR_ACCENT};
    };
`;
const GroupSecondary = styled.div`
    padding-left: 16px;
    color: ${COLOR_VISITED};
    cursor: default;
`;
const Attr = styled.span`
    display: inline-block;
    padding: 5px;
    border-style: solid;
    border-width: 0 0 1px 1px;
    border-color: var(--bs-border-color);
    border-radius: 0 0 0 6px;
`;
const AttrPositive = styled(Attr)`
    color: green;
    font-weight: bold;
`;
const AttrWarning = styled(Attr)`
    color: red;
`;


export default function UpdatesFeedList(props) {
    function GroupHeader(props) {
        return (
            <h4>
                <AccentA
                    href={`/feeds/${props.feed_data._id}`}
                    target='_blank'
                >
                    { props.feed_data.title }
                </AccentA>
            </h4>
        )
    }

    function GroupFooter(props) {
        function renderRegion(region) {
            if (region === 'Ukraine') {
                return(
                    <AttrPositive>◎{region}</AttrPositive>
                )
            } else if (region === 'Russia') {
                return(
                    <AttrWarning>◎{region}</AttrWarning>
                )
            } else {
                return(
                    <Attr>◎{region}</Attr>
                )
            }
        }

        function renderTag(tag) {
            if (['journalism', 'favourite'].includes(tag)) {
                return(
                    <AttrPositive key={`tag-${tag}`}>#{tag}</AttrPositive>
                )
            } else if ([].includes(tag)) {
                return(
                    <AttrWarning key={`tag-${tag}`}>#{tag}</AttrWarning>
                )
            } else {
                return(
                    <Attr key={`tag-${tag}`}>#{tag}</Attr>
                )
            }
        }

        return (
            <GroupSecondary>
                <Attr>
                    by <AccentA
                        href={"/feeds/"+ props.feed._id}
                        target='_blank'
                    >
                        <b>{ props.feed.title }</b>
                    </AccentA>
                </Attr>
                {props.feed.private && (
                    <AttrWarning>⛌private</AttrWarning>
                )}
                <Attr>
                    @{
                        props.feed.href
                            .replace('http://','')
                            .replace('https://','')
                            .replace('www.','')
                            .split('/')[0]
                    }
                </Attr>
                <Attr>⏲{ props.feed.frequency }</Attr>
                {'region' in props.feed.json && renderRegion(props.feed.json.region)}
                {'tags' in props.feed.json && props.feed.json.tags.map(item => renderTag(item))}
            </GroupSecondary>
        )
    }

    function UpdatesGroupList(props) {
        function datetime_str_format(dt_str) {
            const not_including = ['+', '-']
            if (!not_including.some(function(v) { return dt_str.includes(v); })) {
                dt_str = dt_str.replace(' ', 'T')+"Z";
            }

            function pre_zero(num) {
                return ('0'+num.toString()).slice(-2)
            }
            const dt = new Date(dt_str);
            const dt_str_date = `${ dt.getFullYear() }/${pre_zero( dt.getMonth()+1 )}/${pre_zero( dt.getDate() )}`
            const dt_fmt_time = `${pre_zero( dt.getHours() )}:${pre_zero( dt.getMinutes() )}`
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
                    <ListGroup.Item key={update.id}>
                        <Update>
                            <Primary>
                                <PrimaryA
                                    href={update.href}
                                    target='_blank'
                                >
                                    {update.name}
                                </PrimaryA>
                            </Primary>
                            <Secondary>
                                on { datetime_str_format(update.datetime) }
                            </Secondary>
                        </Update>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        )
    }

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
                <Group key={feed.feed_data._id}>
                    <GroupHeader
                        feed_data={feed.feed_data}
                    />
                    <UpdatesGroupList
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

UpdatesFeedList.propTypes = {
    updates: PropTypes.array.isRequired,
    feed_data: PropTypes.object,
    feed: PropTypes.object,
};
