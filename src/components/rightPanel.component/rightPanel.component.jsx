import React from 'react';
import WidgetService from '../../services/widgets.service';

import './rightPanel.component.scss';

export default ({widget, onEditClick}) => {

	return (
		<div className="rightPanel">
			<div className="title">Details</div>
			<div className="content">
				<div className="field">
					<div className="label">ID</div>
					<div className="text">{widget.id}</div>
				</div>
				<div className="field">
					<div className="label">Name</div>
					<div className="text">{widget.name}</div>
				</div>
				<div className="field">
					<div className="label">Magic Number</div>
					<div className="text capitalize">{WidgetService.getMagicNumber(widget.number)}</div>
				</div>
				<div className="field">
					<div className="label">Key-Value Pairs</div>
					<div className="text">{widget.pairs.map((item, index) => <div key={index}>{item.key}: {item.value}</div>)}</div>
				</div>
				<div className="edit" onClick={onEditClick.bind(null, widget)}>Edit</div>
			</div>
		</div>

	);
};