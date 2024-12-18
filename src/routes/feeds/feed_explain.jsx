import { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import FeedsApi from '../../api/feeds';


export default function FeedExplain(props) {
    const [similarFeeds, setSimilarFeeds] = useState([]);
    
    const [visible, setVisible] = useState(false);


    const HandleExplainUrl = event => {
        console.log(">>>> it clicked");
        FeedsApi.explainFeedUrl(props.inputFeed['href'], props.inputFeed['readonly_id'])
            .then(
                (result) => {
                    console.log(">>>> it loaded")
                    props.setInputFeed({
                        ...props.inputFeed,
                        ...{
                            'title': result.explained.title,
                            'href': result.explained.href,
                            'href_user': result.explained.href_user,
                            'private': result.explained.private,
                            // 'frequency': props.frequencies.indexOf(result.explained.frequency),
                            // 'notes': result.explained.notes,
                            // 'json': JSON.stringify(result.explained.json),
                        }
                    });

                    console.log(">>>> similar feeds length", result.similar_feeds.length)
                    if (result.similar_feeds.length) {
                        console.log(">>>> similar feeds", result.similar_feeds)
                        setSimilarFeeds(result.similar_feeds);
                        setVisible(true);
                    }
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                // (error) => {
                //     setError(error);
                // }
            )
    }


    const ExplainModal = event => {
        return (
            <Modal
                show={visible}
                onHide={() => setVisible(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Similar feeds detected:
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul>
                        <li><b>CURRENT</b></li>
                        <ul>
                            <li>{props.inputFeed['title']}</li>
                            <li style={{ wordWrap: 'break-word' }}>{props.inputFeed['href']}</li>
                            <li>{props.frequencies[props.inputFeed['frequency']]}</li>
                        </ul>
                        {similarFeeds.map(feed => (
                            <li>
                                <a
                                    href={"/feeds/"+feed._id}
                                    title={"href: "+feed.href}
                                >
                                    <b>{feed._id}</b>: {feed.title}
                                </a>
                                <ul>
                                    <li>{feed._created}</li>
                                    { props.inputFeed['title'] !== feed.title &&
                                        <li>{feed.title}</li>
                                    }
                                    { props.inputFeed['href'] !== feed.href &&
                                        <li style={{ wordWrap: 'break-word' }}>{feed.href}</li>
                                    }
                                    { props.frequencies[props.inputFeed['frequency']] !== feed.frequency &&
                                        <li>{feed.frequency}</li>
                                    }
                                </ul>
                            </li>
                        ))}
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="primary"
                        onClick={() => setVisible(false)}
                    >
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }


    return (
        <>
            <Button
                variant="secondary"
                onClick={() => HandleExplainUrl()}
            >
                Explain URL
            </Button>
            
            {ExplainModal()}
        </>
    )
}
