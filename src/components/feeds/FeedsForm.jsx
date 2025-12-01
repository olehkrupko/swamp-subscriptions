import { useState, useEffect } from 'react'

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router";
import styled from 'styled-components';

import FeedsFormHrefButtons from './FeedsFormHrefButtons';
import { getThemeHighlight } from '../ThemePicker';
import FeedsApi from '../../api/feeds';


const CustomButtonGroup = styled(ButtonGroup)`
    margin: 10px 0;
`;
const CustomFormLabel = styled(Form.Label)`
    margin-top: 10px;
    margin-bottom: 0;
`;


export default function FeedsForm(props) {
    const navigate = useNavigate();

    // inputFeed['title']
    // setInputFeed({
    //     ...inputFeed,
    //     ...{
    //         'title': result.title,
    //     }
    // })
    const [inputFeed, setInputFeed] = useState({
        'title': '',
        'href': '',
        'href_user': '',
        'private': false,
        'frequency': 'DAYS',
        'notes': '',
        'json': '{}',

        'readonly_id': null,
        'readonly_created': '',
        'readonly_delayed': '',
    });

    const [modalDeleteVisible, setModalDeleteVisible] = useState(false);

    useEffect(() => {
        if (typeof props.feed_id !== "undefined") {
            FeedsApi.readFeed(props.feed_id)
                .then((result) => {
                    console.log('readFeed() ->', typeof result, result);
                    setInputFeed({
                        'title': result.title,
                        'href': result.href,
                        'href_user': result.href_user,
                        'private': result.private,
                        'frequency': result.frequency,
                        'notes': result.notes,
                        'json': JSON.stringify(result.json),

                        'readonly_id': result._id,
                        'readonly_created': result._created,
                        'readonly_delayed': result._delayed,
                    })
                })
        }
    }, [ props.feed_id ]);

    const HandleSubmit = event => {
        event.preventDefault();
        let data = {
            title: inputFeed['title'],
            href: inputFeed['href'],
            href_user: inputFeed['href_user'],
            private: inputFeed['private'],
            frequency: inputFeed['frequency'],
            notes: inputFeed['notes'],
            json: JSON.parse(inputFeed['json']),
        }

        if (props.feed_id) {
            FeedsApi.updateFeed(props.feed_id, data)
                .then(
                    (result) => {
                        console.log('updateFeed() ->', typeof result, result)
                        navigate("/feeds/"+ props.feed_id);
                    },
                )
        } else {
            FeedsApi.createFeed(data)
                .then(
                    (result) => {
                        console.log('createFeed() ->', typeof result, result)
                        navigate("/feeds/"+ result._id);
                    },
                )
        }
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
            )
    };

    function renderMainButtons() {
        return (
            <CustomButtonGroup>
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
            </CustomButtonGroup>
        )
    }

    function renderFrequencies() {
        const frequencies = ['minutes', 'hours', 'days', 'weeks', 'months', 'years', 'never'];

        return (
            <ButtonGroup>
                {
                    frequencies.map((freq, idx) => (
                        <Button
                            key={idx}
                            variant={inputFeed['frequency'] === freq.toUpperCase() ? getThemeHighlight() : "secondary"}
                            onClick={() => setInputFeed({
                                ...inputFeed,
                                ...{
                                    'frequency': freq.toUpperCase(),
                                }
                            })}
                            disabled={props.read_only}
                        >
                            {freq.toUpperCase()}
                        </Button>
                    ))
                }
            </ButtonGroup>
        )
    }

    return (
        <Form
            onSubmit={HandleSubmit}
        >
            {renderMainButtons()}
            <Form.Group>
                <CustomFormLabel>URL</CustomFormLabel>
                <Form.Control
                    value={inputFeed['href']}
                    onChange={e => setInputFeed({
                        ...inputFeed,
                        ...{
                            'href': e.target.value,
                        }
                    })}
                    placeholder="Enter feed URL"
                    disabled={props.read_only}
                />
                <FeedsFormHrefButtons
                    frequencies={frequencies}
                    inputFeed={inputFeed}
                    setInputFeed={setInputFeed}
                    feed_id={props.feed_id}
                    read_only={props.read_only}
                />
            </Form.Group>
            <Form.Group>
                <CustomFormLabel>Title</CustomFormLabel>
                <Form.Control
                    value={inputFeed['title']}
                    onChange={e => setInputFeed({
                        ...inputFeed,
                        ...{
                            'title': e.target.value,
                        }
                    })}
                    placeholder="Enter feed name. TODO: generate from URL"
                    disabled={props.read_only}
                />
            </Form.Group>
            <Form.Group>
                <CustomFormLabel>JSON</CustomFormLabel>
                <Form.Control
                    as="textarea"
                    rows="3"
                    value={inputFeed['json']}
                    onChange={e => setInputFeed({
                        ...inputFeed,
                        ...{
                            'json': e.target.value,
                        }
                    })}
                    disabled={props.read_only}
                />
            </Form.Group>
            <Form.Group>
                <CustomFormLabel>Private</CustomFormLabel>
                <Form.Check 
                    checked={inputFeed['private']}
                    onChange={e => setInputFeed({
                        ...inputFeed,
                        ...{
                            'private': e.target.checked,
                        }
                    })}
                    type="switch"
                    label="Feed is private?"
                    disabled={props.read_only}
                />
            </Form.Group>
            <Form.Group>
                <CustomFormLabel>Frequency</CustomFormLabel>
                <br/>
                {renderFrequencies()}
                <br/>
            </Form.Group>
            <Form.Group>
                <CustomFormLabel>Public URL</CustomFormLabel>
                <Form.Control
                    value={inputFeed['href_user']}
                    onChange={e => setInputFeed({
                        ...inputFeed,
                        ...{
                            'href_user': e.target.value,
                        }
                    })}
                    placeholder="Optional user-frienly URL"
                    disabled={props.read_only}
                />
                <ButtonGroup>
                    <Button
                        variant="secondary"
                        onClick={() => setInputFeed({
                            ...inputFeed,
                            ...{
                                'href': inputFeed['href'],
                            }
                        })}
                    >
                        Copy URL
                    </Button>
                    <Button
                        variant="secondary"
                        href={inputFeed['href_user']}
                        target="_blank"
                        disabled={!props.read_only}
                    >
                        Open URL
                    </Button>
                </ButtonGroup>
            </Form.Group>
            <Form.Group>
                <CustomFormLabel>Notes</CustomFormLabel>
                <Form.Control
                    as="textarea"
                    rows="3"
                    value={inputFeed['notes']}
                    onChange={e => setInputFeed({
                        ...inputFeed,
                        ...{
                            'notes': e.target.value,
                        }
                    })}
                    disabled={props.read_only}
                />
            </Form.Group>
            <Form.Group>
                <CustomFormLabel>System</CustomFormLabel>
                <div>ID: {inputFeed['readonly_id'] ? inputFeed['readonly_id'] : 'undefined'}</div>
                <div>Created: {inputFeed['readonly_created'] ? inputFeed['readonly_created'] : 'now()'}</div>
                <div>Delayed: {inputFeed['readonly_delayed'] ? inputFeed['readonly_delayed'] : 'undefined'}</div>
            </Form.Group>
            {renderMainButtons()}

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
