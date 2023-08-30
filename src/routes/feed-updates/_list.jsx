import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate } from "react-router-dom";


export default function FeedUpdatesList(props) {
    const navigate = useNavigate();

    console.log(typeof props.feedUpdates, props.feedUpdates)
    return(
        <ListGroup
            style={{
                fontWeight: 200,
            }}
        >
            {props.feedUpdates.map((update) => (
                <ListGroup.Item>
                    <span style={{
                        color: 'red',
                        fontWeight: 400,
                    }}>
                        »
                    </span>
                    &nbsp;
                    <span
                        style={{
                            cursor: "pointer",
                            fontWeight: "bold",
                        }}
                        onClick={() => window.open(update.href, '_blank')}
                    >
                        {update.name}
                    </span>
                    &nbsp;(by&nbsp;
                    <span
                        style={{
                            cursor: "pointer",
                            fontWeight: 400,
                        }}
                        onClick={() => navigate("/feeds/"+ update.feed_id)}
                    >
                        { update.feed_data.title }
                    </span>
                    &nbsp;on { update.datetime })
                </ListGroup.Item>
            ))}
        </ListGroup>
    )
}
