import React, {useEffect, useState} from 'react';
import EditModal from '../editModal.component/editModal.component.jsx';
import LeftPanel from '../leftPanel.component/leftPanel.component.jsx';
import RightPanel from '../rightPanel.component/rightPanel.component.jsx';
import WidgetService from '../../services/widgets.service';

import './main.component.scss';

export default () =>
{
	const [widgets, setWidgets] = useState([]);
	const [selectedWidget, setSelectedWidget] = useState();
	const [modalState, setModalState] = useState({open: false});

	const openAddModal = () => setModalState({open: true, widget: WidgetService.getEmptyWidget(), mode: 'add', onConfirm: addNewWidget});
	const editWidget = (widget) => setModalState({open: true, widget: widget, mode: 'edit', onConfirm: saveWidgetChanges});
	const closeModal = () => setModalState({open: false});

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

	const deleteWidget = (widget) => {
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
			<LeftPanel
				widgets={widgets}
				selectedWidget={selectedWidget}
				selectWidget={setSelectedWidget}
				addWidget={openAddModal}
				editWidget={editWidget}
				deleteWidget={deleteWidget} />
			{selectedWidget && <RightPanel widget={selectedWidget} onEditClick={editWidget}></RightPanel>}
			<EditModal {...modalState} onCancel={closeModal} />
		</div>)
};