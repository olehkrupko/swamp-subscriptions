import { useState, useEffect } from 'react'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Modal from 'react-bootstrap/Modal';
import FeedsApi from '../../api/feeds';
import RangeSlider from 'react-bootstrap-range-slider';
import { useNavigate } from "react-router-dom";

import FeedUpdatesList from './../feed-updates/_list';


export default function FeedForm(props) {
    const navigate = useNavigate();

    const [frequencies, setFrequencies] = useState('');

    const [inputTitle, setTitle] = useState('');
    const [inputHref, setHref] = useState('');
    const [inputHrefUser, setHrefUser] = useState('');
    const [inputPrivate, setPrivate] = useState(false);
    const [inputFrequency, setFrequency] = useState(1);

    const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
    const [modalTestUrlVisible, setModalTestUrlVisible] = useState(false);
    
    const [feedUpdates, setFeedUpdates] = useState([]);

    useEffect(() => {
        FeedsApi.getFrequencies()
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
        FeedsApi.readFeed(props.feed_id)
            .then((result) => {
                console.log('readFeed() ->', typeof result, result);
                setTitle(result.title);
                setHref(result.href);
                setHrefUser(result.href_user);
                setPrivate(result.private);

                frequencies.forEach((element, index) => {
                    if (result.frequency === element) {
                        console.log('---> '+index);
                        setFrequency(index);
                    }
                });
            })
    }, [ frequencies, props.feed_id, ])

    const HandleSubmit = event => {
        event.preventDefault();
        // console.log(inputTitle, inputHref, inputPrivate, inputFrequency);
        let data = {
            title: inputTitle,
            href: inputHref,
            private: inputPrivate,
            frequency: frequencies[inputFrequency],
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
                        navigate("/feeds/"+ result.id);
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
        console.log(1, typeof inputHref, inputHref);
        FeedsApi.testFeedUrl(inputHref)
            .then(
                (result) => {
                    // console.log(typeof result, result)
                    setFeedUpdates(result);
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

    const HandleDelete = event => {
        event.preventDefault();
        FeedsApi.deleteFeed(props.feed_id)
            .then(
                (result) => {
                    console.log('deleteFeed() ->', typeof result, result)
                    if (result === "Feed deleted") {
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
                <Form.Label>Feed Title</Form.Label>
                <Form.Control
                    value={inputTitle}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Enter feed name. TODO: generate from URL"
                    disabled={props.read_only}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Feed URL</Form.Label>
                <Form.Control
                    value={inputHref}
                    onChange={e => setHref(e.target.value)}
                    placeholder="Enter feed URL. TODO: test URL parsing"
                    disabled={props.read_only}
                />
                <Button
                    variant="secondary"
                    onClick={() => HandleTestUrl()}
                >
                    Test URL
                </Button>
                <Form.Control
                    value={inputHrefUser}
                    onChange={e => setHrefUser(e.target.value)}
                    placeholder="Optional user-frienly URL"
                    disabled={props.read_only}
                />
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
            </Form.Group>
            <Form.Group>
                <Form.Check 
                    checked={inputPrivate}
                    onChange={e => setPrivate(e.target.checked)}
                    type="switch"
                    label="Feed is private?"
                    disabled={props.read_only}
                />
            </Form.Group>
            <RangeSlider
                value={inputFrequency}
                min={0}
                max={frequencies.length-1}

                tooltip='on'
                tooltipLabel={currentValue => frequencies[currentValue]}

                onChange={e => setFrequency(e.target.value)}
                disabled={props.read_only}
            />
            <br/><br/>
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
                    <FeedUpdatesList
                        feedUpdates={feedUpdates}
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
        </Form>
    )
}
