import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


export default function FeedExplain(props) {
    return (
        <Modal
            show={props.visible}
            onHide={() => props.setVisible(false)}
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
                    {props.similarFeeds.map(feed => (
                        <li>
                            <a
                                href={"/feeds/"+feed._id}
                                title={"href: "+feed.href}
                            >
                                <b>{feed._id}</b>: {feed.title}
                            </a>
                            <ul>
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
                    onClick={() => props.setVisible(false)}
                >
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
