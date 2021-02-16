import React from 'react';
import WidgetService from '../../services/widgets.service';

import './leftPanel.component.scss';

export default ({widgets, selectedWidget, selectWidget, addWidget, editWidget, deleteWidget}) => {

	const onSelectWidget = (widget) => selectWidget(widget);
	const onAddWidgetClick = () => addWidget();

	const onEditWidgetClick = (widget, event) => {
		event.stopPropagation();
		editWidget(widget);
	};

	const onDeleteWidgetClick = (widget, event) => {
		event.stopPropagation();
		deleteWidget(widget);
	};

	return (
		<div className="leftPanel">
			<div className="widgetsList">
				<div className="title">Widgets</div>
				<ul className="items">
					{widgets.map(item => <li key={item.id} className={`item ${item.id === selectedWidget.id && 'selected'}`} onClick={() => onSelectWidget(item)}>
						<div className="label">{item.name}</div>
						<div className="action edit" onClick={onEditWidgetClick.bind(null, item)}>EDIT</div>
						<div className="action delete" onClick={onDeleteWidgetClick.bind(null, item)}>DEL</div>
					</li>)}
					<li className="addButton" onClick={onAddWidgetClick}>Add Widget</li>
				</ul>
			</div>
		</div>
	);
};