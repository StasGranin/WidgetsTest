import React, {useEffect, useState} from 'react';
import EditModal from '../editModal.component/editModal.component.jsx';
import WidgetService from '../../services/widgets.service';

import './main.component.scss';

export default () =>
{
	const [widgets, setWidgets] = useState([]);
	const [selectedWidget, setSelectedWidget] = useState();
	const [modalState, setModalState] = useState({open: false});

	const openAddModal = () => {
		setModalState({open: true, widget: WidgetService.getEmptyWidget(), mode: 'add', onConfirm: addNewWidget});
	};

	const onEditWidgetClick = (widget, event) => {
		event.stopPropagation();
		setModalState({open: true, widget: widget, mode: 'edit', onConfirm: saveWidgetChanges});
	};

	const closeModal = () => {
		setModalState({open: false});
	};

	const addNewWidget = (widgetData) => {
		const modifiedWidgets = WidgetService.addWidget(widgets, widgetData);
		setWidgets(modifiedWidgets);

		if (modifiedWidgets.length === 1) {
			setSelectedWidget(modifiedWidgets[0]);
		}

		closeModal();
	};

	const saveWidgetChanges = (widgetData) => {
		setWidgets(WidgetService.editWidget(widgets, widgetData));
		setSelectedWidget(widgetData);
		closeModal();
	};

	const onDeleteWidgetClick = (widget, event) => {
		event.stopPropagation();
		const filteredWidgets = WidgetService.deleteWidget(widgets, widget);

		setWidgets(filteredWidgets);

		if (selectedWidget && widget.id === selectedWidget.id) {
			setSelectedWidget(filteredWidgets[0]);
		}
	};

	useEffect(() => {
		const widgets = WidgetService.getWidgets();
		setWidgets(widgets);
		setSelectedWidget(widgets[0]);
	}, []);


	return (
		<div className="main">
			<div className="leftPanel">
				<div className="widgetsList">
					<div className="title">Widgets</div>
					<ul className="items">
						{widgets.map(item => <li key={item.id} className={`item ${item.id === selectedWidget.id && 'selected'}`} onClick={() => setSelectedWidget(item)}>
							<div className="label">{item.name}</div>
							<div className="action edit" onClick={onEditWidgetClick.bind(null, item)}>EDIT</div>
							<div className="action delete" onClick={onDeleteWidgetClick.bind(null, item)}>DEL</div>
						</li>)}
						<li className="addButton" onClick={()=> openAddModal()}>Add Widget</li>
					</ul>
				</div>
			</div>
			{selectedWidget && <div className="rightPanel">
				<div className="widgetDetails">
					<div className="title">Details</div>
					<div className="content">
						<div className="basicDetails">
							<div className="field">
								<div className="label">ID</div>
								<div className="text">{selectedWidget.id}</div>
							</div>
							<div className="field">
								<div className="label">Name</div>
								<div className="text">{selectedWidget.name}</div>
							</div>
							<div className="field">
								<div className="label">Magic Number</div>
								<div className="text capitalize">{WidgetService.getMagicNumber(selectedWidget.number)}</div>
							</div>
							<div className="field">
								<div className="label">Key-Value Pairs</div>
								<div className="text">{selectedWidget.pairs.map((item, index) => <div key={index}>{item.key}: {item.value}</div>)}</div>
							</div>
						</div>
					</div>
				</div>
			</div>}
			<EditModal {...modalState} onCancel={closeModal} />
		</div>)
};