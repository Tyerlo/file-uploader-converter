import React, { useState } from "react";
import {
	Popover,
	PopoverHeader,
	PopoverBody,
	ListGroup,
	ListGroupItem
} from "reactstrap";

const ShowUserRuc = ({ rucs }) => {
	const [popoverOpen, setPopoverOpen] = useState(false);
	const toggle = () => setPopoverOpen(!popoverOpen);

	return (
		<div>
			<button id="Popover1" className="btn btn--dark" onClick={toggle}>
				Rucs registrados
			</button>
			<Popover
				placement="left"
				isOpen={popoverOpen}
				target="Popover1"
				toggle={toggle}
			>
				<PopoverHeader style={{ fontSize: "2rem" }}>
					Rucs registrados
				</PopoverHeader>
				<PopoverBody style={{ fontSize: "2rem" }}>
					{rucs !== undefined &&
						rucs.ruc !== undefined &&
						rucs.ruc.map((file, index) => (
							<ListGroup key={index}>
								<ListGroupItem>
									{file}
									<br />
								</ListGroupItem>
							</ListGroup>
						))}
				</PopoverBody>
			</Popover>
		</div>
	);
};

export default ShowUserRuc;
