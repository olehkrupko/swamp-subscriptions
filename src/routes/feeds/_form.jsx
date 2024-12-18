import { useState, useEffect } from 'react'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Modal from 'react-bootstrap/Modal';
import FeedsApi from '../../api/feeds';
import FrequencyApi from '../../api/frequencies';
import RangeSlider from 'react-bootstrap-range-slider';
import { useNavigate } from "react-router-dom";

import { UpdatesList } from './../updates/components/Updates';


export default function FeedForm(props) {
    const navigate = useNavigate();

    const [frequencies, setFrequencies] = useState([]);

    const [inputTitle, setTitle] = useState('');
    const [inputHref, setHref] = useState('');
    const [inputHrefUser, setHrefUser] = useState('');
    const [inputPrivate, setPrivate] = useState(false);
    const [inputFrequency, setFrequency] = useState(1);
    const [inputNotes, setNotes] = useState('');
    const [inputJson, setJson] = useState('{}');

    const [readonlyId, setReadonlyId] = useState(null);
    const [readonlyCreated, setReadonlyCreated] = useState('');
    const [readonlyDelayed, setReadonlyDelayed] = useState('');

    const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
    const [modalTestUrlVisible, setModalTestUrlVisible] = useState(false);
    const [modalSimilarFeedsVisible, setModalSimilarFeedsVisible] = useState(false);
    
    const [updates, setUpdates] = useState([]);
    const [similarFeeds, setSimilarFeeds] = useState([]);

    useEffect(() => {
        FrequencyApi.getFrequencies()
            .then(
                (result) => {
                    console.log('getFrequencies() ->', typeof result, result)
                    setFrequencies(result);
                },
                // // Note: it's important to handle errors here
                // // instead of a catch() block so that we don't swallow
                // // exceptions from actual bugs in components.
                // (error) => {
                //     setIsLoaded(true);
                //     setError(error);
                // }
            )
    }, [])

    useEffect(() => {
        if (typeof props.feed_id !== "undefined") {
            FeedsApi.readFeed(props.feed_id)
                .then((result) => {
                    console.log('readFeed() ->', typeof result, result);
                    setTitle(result.title);
                    setHref(result.href);
                    setHrefUser(result.href_user);
                    setPrivate(result.private);
                    setNotes(result.notes);
                    setJson(JSON.stringify(result.json));

                    setReadonlyId(result._id);
                    setReadonlyCreated(result._created);
                    setReadonlyDelayed(result._delayed);

                    frequencies.forEach((element, index) => {
                        if (result.frequency === element) {
                            setFrequency(index);
                        }
                    });
                })
        }
    }, [ frequencies, props.feed_id, ])

    const HandleSubmit = event => {
        event.preventDefault();
        let data = {
            title: inputTitle,
            href: inputHref,
            href_user: inputHrefUser,
            private: inputPrivate,
            frequency: frequencies[inputFrequency],
            notes: inputNotes,
            json: JSON.parse(inputJson),
        }

        if (props.feed_id) {
            FeedsApi.updateFeed(props.feed_id, data)
                .then(
                    (result) => {
                        console.log('updateFeed() ->', typeof result, result)
                        navigate("/feeds/"+ props.feed_id);
                    },
                    // // Note: it's important to handle errors here
                    // // instead of a catch() block so that we don't swallow
                    // // exceptions from actual bugs in components.
                    // (error) => {
                    //     setIsLoaded(true);
                    //     setError(error);
                    // }
                )
        } else {
            FeedsApi.createFeed(data)
                .then(
                    (result) => {
                        console.log('createFeed() ->', typeof result, result)
                        navigate("/feeds/"+ result._id);
                    },
                    // Note: it's important to handle errors here
                    // instead of a catch() block so that we don't swallow
                    // exceptions from actual bugs in components.
                    // (error) => {
                    //     setError(error);
                    // }
                )
        }
    };

    const HandleTestUrl = event => {
        FeedsApi.testFeedUrl(inputHref)
            .then(
                (result) => {
                    setUpdates(result);
                    setModalTestUrlVisible(true);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                // (error) => {
                //     setError(error);
                // }
            )
    }

    const HandleExplainUrl = event => {
        FeedsApi.explainFeedUrl(inputHref, readonlyId)
            .then(
                (result) => {
                    if (result.similar_feeds.length) {
                        setModalSimilarFeedsVisible(true);
                        setSimilarFeeds(result.similar_feeds);
                    }
                    const explained = result.explained;

                    setTitle(explained.title);
                    setHref(explained.href);
                    setHrefUser(explained.href_user);
                    setPrivate(explained.private);
                    setFrequency(frequencies.indexOf(explained.frequency));
                    setNotes(explained.notes);
                    setJson(JSON.stringify(explained.json));
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                // (error) => {
                //     setError(error);
                // }
            )
    };

    const HandleDelete = event => {
        event.preventDefault();
        FeedsApi.deleteFeed(props.feed_id)
            .then(
                (result) => {
                    console.log('deleteFeed() ->', typeof result, result)
                    if (result.success === true) {
                        navigate("/feeds/list");
                    }
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                // (error) => {
                //     setError(error);
                // }
            )
    };

    return (
        <Form
            onSubmit={HandleSubmit}
        >
            <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                    value={inputTitle}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Enter feed name. TODO: generate from URL"
                    disabled={props.read_only}
                />
            </Form.Group>
            <br/>
            <Form.Group>
                <Form.Label>URL</Form.Label>
                <Form.Control
                    value={inputHref}
                    onChange={e => setHref(e.target.value)}
                    placeholder="Enter feed URL"
                    disabled={props.read_only}
                />
                <ButtonGroup>
                    <Button
                        variant="secondary"
                        onClick={() => HandleExplainUrl()}
                    >
                        Explain URL
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => HandleTestUrl()}
                    >
                        Test URL
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => navigator.clipboard.writeText(inputHref)}
                    >
                        Copy URL
                    </Button>
                </ButtonGroup>
            </Form.Group>
            <br/>
            <Form.Group>
                <Form.Label>Public URL</Form.Label>
                <Form.Control
                    value={inputHrefUser}
                    onChange={e => setHrefUser(e.target.value)}
                    placeholder="Optional user-frienly URL"
                    disabled={props.read_only}
                />
                <ButtonGroup>
                    <Button
                        variant="secondary"
                        onClick={() => setHrefUser(inputHref)}
                    >
                        Copy URL
                    </Button>
                    <Button
                        variant="secondary"
                        href={inputHrefUser}
                        target="_blank"
                        disabled={!props.read_only}
                    >
                        Open URL
                    </Button>
                    {/* <Button
                        variant="secondary"
                        href={inputHrefUser}
                        target="_blank"
                        disabled={!props.read_only}
                    >
                        Generate main URL from user-friendly one (placeholder)
                    </Button> */}
                </ButtonGroup>
            </Form.Group>
            <br/>
            <Form.Group>
                <Form.Label>Notes</Form.Label>
                <Form.Control
                    as="textarea"
                    rows="3"
                    value={inputNotes}
                    onChange={e => setNotes(e.target.value)}
                    disabled={props.read_only}
                />
            </Form.Group>
            <br/>
            <Form.Group>
                <Form.Label>JSON</Form.Label>
                <Form.Control
                    as="textarea"
                    rows="3"
                    value={inputJson}
                    onChange={e => setJson(e.target.value)}
                    disabled={props.read_only}
                />
                {/* <Button
                    variant="secondary"
                    href={inputHrefUser}
                    target="_blank"
                    disabled={!props.read_only}
                >
                    Verify JSON
                </Button> */}
                {/* <Button
                    variant="secondary"
                    href={inputHrefUser}
                    target="_blank"
                    disabled={!props.read_only}
                >
                    Format JSON
                </Button> */}
            </Form.Group>
            <br/>
            <Form.Group>
                <Form.Label>Private</Form.Label>
                <Form.Check 
                    checked={inputPrivate}
                    onChange={e => setPrivate(e.target.checked)}
                    type="switch"
                    label="Feed is private?"
                    disabled={props.read_only}
                />
            </Form.Group>
            <br/>
            <Form.Group>
                <Form.Label>Frequency</Form.Label>
                <RangeSlider
                    value={inputFrequency}
                    min={0}
                    max={frequencies.length-1}

                    tooltip='on'
                    tooltipLabel={currentValue => frequencies[currentValue]}

                    onChange={e => setFrequency(e.target.value)}
                    disabled={props.read_only}
                />
                <br/>
            </Form.Group>
            <br/>
            <ButtonGroup>
                <Button
                    variant={props.read_only ? "secondary" : "primary"}
                    type="submit"
                    disabled={props.read_only}
                >
                    Submit
                </Button>
                <Button
                    variant="secondary"
                    disabled={!props.read_only}
                    onClick={() => navigate("/feeds/"+ props.feed_id +"/edit")}
                >
                    Edit
                </Button>
                <Button
                    variant="secondary"
                    disabled={props.read_only || (props.feed_id ? false : true)}
                    onClick={() => navigate("/feeds/"+ props.feed_id )}
                >
                    View
                </Button>
                <Button
                    variant="secondary"
                    disabled={props.feed_id ? false : true}
                    onClick={() => setModalDeleteVisible(true)}
                >
                    Delete
                </Button>
            </ButtonGroup>
            <br/><br/>
            <div>
                ID: {readonlyId ? readonlyId : 'undefined'}<br/>
                Created: {readonlyCreated ? readonlyCreated : 'now()'}<br/>
                Delayed: {readonlyDelayed ? readonlyDelayed : 'undefined'}
            </div>

            <Modal
                show={modalDeleteVisible}
                onHide={() => setModalDeleteVisible(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Are you sure that you want to delete this feed?
                    </Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setModalDeleteVisible(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        onClick={HandleDelete}
                    >
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
            
            <Modal
                show={modalTestUrlVisible}
                onHide={() => setModalTestUrlVisible(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Data returned by test request to URL:
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <UpdatesList
                        updates={updates}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="primary"
                        onClick={() => setModalTestUrlVisible(false)}
                    >
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            
            <Modal
                show={modalTestUrlVisible}
                onHide={() => setModalTestUrlVisible(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Data returned by test request to URL:
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <UpdatesList
                        updates={updates}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="primary"
                        onClick={() => setModalTestUrlVisible(false)}
                    >
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            
            <Modal
                show={modalSimilarFeedsVisible}
                onHide={() => setModalSimilarFeedsVisible(false)}
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
                            <li>{inputTitle}</li>
                            <li style={{ wordWrap: 'break-word' }}>{inputHref}</li>
                            <li>{frequencies[inputFrequency]}</li>
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
                                    { inputTitle !== feed.title &&
                                        <li>{inputTitle}</li>
                                    }
                                    { inputHref !== feed.href &&
                                        <li style={{ wordWrap: 'break-word' }}>{feed.href}</li>
                                    }
                                    { frequencies[inputFrequency] !== feed.frequency &&
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
                        onClick={() => setModalSimilarFeedsVisible(false)}
                    >
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Form>
    )
}
