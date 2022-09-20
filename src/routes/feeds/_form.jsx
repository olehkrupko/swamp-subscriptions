import React, { useState, useEffect } from 'react'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Modal from 'react-bootstrap/Modal';
import FeedsApi from '../../api/feeds';
import RangeSlider from 'react-bootstrap-range-slider';
import { useNavigate } from "react-router-dom";


export default function FeedForm(props) {
    const navigate = useNavigate();

    const [frequencies, setFrequencies] = useState(['minutes', 'hours', 'days', 'weeks', 'months', 'years', 'never']);

    const [inputTitle, setTitle] = useState('');
    const [inputHref, setHref] = useState('');
    const [inputPrivate, setPrivate] = useState(false);
    const [inputFrequency, setFrequency] = useState(0);

    const [modalDeleteVisible, setModalDeleteVisible] = useState(0);

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
                        console.log(result)
                    },
                    // // Note: it's important to handle errors here
                    // // instead of a catch() block so that we don't swallow
                    // // exceptions from actual bugs in components.
                    // (error) => {
                    //     setIsLoaded(true);
                    //     setError(error);
                    // }
                )
            window.location.reload();
        } else {
            FeedsApi.createFeed(data)
                .then(
                    (result) => {
                        console.log(result)
                    },
                    // // Note: it's important to handle errors here
                    // // instead of a catch() block so that we don't swallow
                    // // exceptions from actual bugs in components.
                    // (error) => {
                    //     setIsLoaded(true);
                    //     setError(error);
                    // }
                )
        }
    };

    const HandleDelete = event => {
        event.preventDefault();
        FeedsApi.deleteFeed(props.feed_id)
            .then(
                (result) => {
                    if (result.response === "Feed deleted") {
                        navigate("/feeds/list");
                    }
                },
                // // Note: it's important to handle errors here
                // // instead of a catch() block so that we don't swallow
                // // exceptions from actual bugs in components.
                // (error) => {
                //     setIsLoaded(true);
                //     setError(error);
                // }
            )
    };

    return (
        <Form
            onSubmit={HandleSubmit}
        >
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
                    disabled={true}
                >
                    Test URL
                </Button>
            </Form.Group>
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
                <Form.Check 
                    value={inputPrivate}
                    onChange={e => setPrivate(e.target.value)}
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
            <ButtonGroup className="float-end">
                <Button
                    variant="primary"
                    type="submit"
                    disabled={props.read_only}
                >
                    Submit
                </Button>
                <Button
                    variant="secondary"
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
        </Form>
    )
}