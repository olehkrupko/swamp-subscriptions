import { useState } from 'react'

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router";

import { UpdatesList } from '../updates/UpdatesFeedList';
import FeedsApi from '../../api/feeds';
import UpdatesApi from '../../api/updates';


export default function FeedsFormHrefButtons(props) {
    const navigate = useNavigate();
    
    const [similarFeeds, setSimilarFeeds] = useState([]);
    const [parsedUpdates, setParsedUpdates] = useState([]);
    
    const [similarFeedModalVisible, setSimilarFeedModalVisible] = useState(false);
    const [modalParseHrefVisible, setModalParseHrefVisible] = useState(false);


    function LoadAndCompare(result) {
        props.setInputFeed({
            ...props.inputFeed,
            ...{
                'title': result.explained.title,
                'href': result.explained.href,
                'href_user': result.explained.href_user,
                'private': result.explained.private,
                'frequency': props.frequencies.indexOf(result.explained.frequency),
                'notes': result.explained.notes,
                'json': JSON.stringify(result.explained.json),
            }
        });

        if (result.similar_feeds.length) {
            setSimilarFeeds(result.similar_feeds);
            setSimilarFeedModalVisible(true);
        }
    };


    function HandleExplain() {
        FeedsApi.explainFeedHref(props.inputFeed['href'], props.inputFeed['readonly_id'], 'explain')
            .then(
                (result) => {
                    LoadAndCompare(result);
                },
            )
    };


    function HandlePush() {
        FeedsApi.explainFeedHref(props.inputFeed['href'], props.inputFeed['readonly_id'], 'push')
            .then(
                (result) => {
                    if (result.similar_feeds.length) {
                        LoadAndCompare(result);
                    } else if (result.explained._id) {
                        navigate("/feeds/" + result.explained._id);
                    } else {
                        console.log('HandleParseHref() ->', 'error', result);
                    }
                },
            )
    };


    function HandlePushIgnore() {
        FeedsApi.explainFeedHref(props.inputFeed['href'], props.inputFeed['readonly_id'], 'push_ignore')
            .then(
                (result) => {
                    window.location.reload();
                }
            )
    }


    function HandleParseHref() {
        UpdatesApi.parseHrefUpdates(props.inputFeed['href'])
            .then(
                (result) => {
                    setParsedUpdates(result);
                    setModalParseHrefVisible(true);
                },
            )
    };


    function SimilarDetectedModal() {
        return (
            <Modal
                show={similarFeedModalVisible}
                onHide={() => setSimilarFeedModalVisible(false)}
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
                    <ButtonGroup>
                        <Button
                            variant="secondary"
                            onClick={() => window.location.reload()}
                        >
                            Reset
                        </Button>
                        <Button
                            variant="primary"
                            onClick={() => setSimilarFeedModalVisible(false)}
                        >
                            Close
                        </Button>
                    </ButtonGroup>
                </Modal.Footer>
            </Modal>
        )
    };


    function ParseHrefModal() {
        return (
            <Modal
                show={modalParseHrefVisible}
                onHide={() => setModalParseHrefVisible(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Data returned by test request to URL:
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <UpdatesList
                        updates={parsedUpdates}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="primary"
                        onClick={() => setModalParseHrefVisible(false)}
                    >
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    };


    return (
        <ButtonGroup>
            <Button
                variant="secondary"
                onClick={() => HandleExplain()}
                disabled={props.read_only}
            >
                Explain
            </Button>

            <Button
                variant="secondary"
                onClick={() => HandlePush()}
                disabled={props.feed_id}
            >
                Push
            </Button>

            <Button
                variant="secondary"
                onClick={() => HandlePushIgnore()}
                disabled={props.feed_id}
            >
                Push&Ignore
            </Button>

            <Button
                variant="secondary"
                onClick={() => HandleParseHref()}
            >
                Parse
            </Button>

            <Button
                variant="secondary"
                onClick={() => navigator.clipboard.writeText(props.inputFeed['href'])}
            >
                Copy
            </Button>

            {SimilarDetectedModal()}

            {ParseHrefModal()}
        </ButtonGroup>
    )
}
