import ListGroup from 'react-bootstrap/ListGroup';
import { format } from "date-fns";
import styled from 'styled-components';


export default function UpdatesList(props) {
    const Primary = styled.a`
        all: unset;  // removing defaults
        cursor: pointer;
        font-weight: bold;
        color: ${COLOR};
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

    return (
        <ListGroup>
            {group.updates.map((update) => (
                <ListGroup.Item>
                    <Primary
                        href={update.href}
                        target='_blank'
                    >
                        <PrimaryPrefix>»&nbsp;</PrimaryPrefix>
                        {update.name}
                    </Primary>
                    { update.feed_id != null &&
                    <Secondary>
                        &nbsp;on {
                            format(
                                new Date(update.datetime.replace(' ', 'T')+"Z"),
                                "yyyy-MM-dd HH:mm"
                            )
                        }
                    </Secondary>
                }
                </ListGroup.Item>
            ))}
        </ListGroup>
    )
}
