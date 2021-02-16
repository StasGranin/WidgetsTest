import {numberToWords} from '../utils/magicNumber';

class WidgetsService {
	getWidgets() {
		const savedWidgets = localStorage.getItem('savedWidgets');

		if (savedWidgets) {
			try {
				return JSON.parse(savedWidgets) || [];
			} catch (error) {
				//
			}
		}

		return [];
	}

	getEmptyWidget() {
		return {
			id: null,
			name: 'Widget',
			number: 1224,
			pairs: [{key: 1, value: 10},{key: 2, value: 20},{key: 3, value: 30},{key: 4, value: 40},{key: 5, value: 50}]
		}
	}

	addWidget(widgets, widget) {
		let result = [...widgets];

		widget.id = new Date().getTime();
		widget.number = Number(widget.number);

		result.push(widget);

		this.saveToStorage(result);

		return result;
	}

	editWidget(widgets, widget) {

		widget.number = Number(widget.number);

		for (let i=0, l=widgets.length; i<l; i++) {
			if (widgets[i].id === widget.id) {
				widgets[i] = {...widget};
				break;
			}
		}

		this.saveToStorage(widgets);

		return [...widgets];
	}

	deleteWidget(widgets, widget) {
		const result = widgets.filter(item => item.id !== widget.id);

		this.saveToStorage(result);

		return result;
	}

	getMagicNumber(number) {
		return numberToWords(number);
	}

	saveToStorage(widgets) {
		localStorage.setItem('savedWidgets', JSON.stringify(widgets));
	}
}

export default new WidgetsService();