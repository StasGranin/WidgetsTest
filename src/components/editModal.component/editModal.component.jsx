import React, {useEffect, useState} from 'react';

import './editModal.component.scss';

export default ({open, widget, mode, onConfirm, onCancel}) => {

	const [formData, setFormData] = useState();
	const [formValidationErrors, setFormValidationErrors] = useState({count: 0, errors: {}});

	const onInputChange = (event) => {
		setFormData({...formData, [event.target.name]: event.target.value});
	};

	const onPairChange = (index, event) => {
		const fieldName = event.target.name.split('.')[1];

		formData.pairs[index][fieldName] = event.target.value;
		setFormData({...formData});
	};

	const addPair = () => {
		formData.pairs.push({key: '', value: ''});
		setFormData({...formData});
	};

	const onSubmit = (event) => {
		event.preventDefault();

		const validationErrors = validate(formData);

		setFormValidationErrors(validationErrors);

		if (validationErrors.count === 0) {
			onConfirm(formData)
		}
	};

	const validate = (data) => {
		const validationErrors = {count: 0, errors: {}};

		if (!data.name.trim()) {
			validationErrors.errors.count++;
			validationErrors.errors.name = 'Name cannot be empty';
		}

		if (!data.number || isNaN(Number(data.number))) {
			validationErrors.errors.count++;
			validationErrors.errors.number = 'Number is invalid';
		}

		return validationErrors;
	};

	useEffect(() => {
		if (open) {
			setFormData(widget);
		}
	}, [widget]);

	return (
	<>
		{open && formData && <div className="editModal">
			<div className="modal">
				<div className="title">
					{mode === 'edit' ? 'Edit Widget' : 'Add New Widget'}
				</div>
				<form onSubmit={onSubmit}>
					<div className="field">
						<label htmlFor="name">Name</label>
						<input name="name" value={formData.name} onChange={onInputChange}/>
						{formValidationErrors.errors.name && <div className="validationError">{formValidationErrors.errors.name}</div>}
					</div>
					<div className="field">
						<label htmlFor="number">Number</label>
						<input name="number" value={formData.number} onChange={onInputChange}/>
						{formValidationErrors.errors.number && <div className="validationError">{formValidationErrors.errors.number}</div>}
					</div>
					<div className="keyValuePairs">
						<label>Key-Value Pairs</label>
						{formData.pairs.map((pair, index) => <div key={index} className="field">
								<input name={`pairs[${index}].key`} value={pair.key} onChange={onPairChange.bind(null, index)}/>
								<input name={`pairs[${index}].value`} value={pair.value} onChange={onPairChange.bind(null, index)}/>
							</div>)}
						<div className="addPair" onClick={()=>addPair()}>Add another key-value pair</div>
					</div>
					<div className="actions">
						<input className="cancel" type="button" value="Cancel" onClick={() => onCancel()}/>
						<input className="submit" type="submit" value="Save"/>
					</div>
				</form>
			</div>
		</div>}
	</>)
};