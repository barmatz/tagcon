import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import FormField from './FormField';

function List({ name, label, items, children, onChange }) {
	const [ itemList, setItemList ] = useState([])
			, [ newItem, setNewItem ] = useState('');

	function updateItemList(itemList) {
		setItemList(itemList);
		onChange && onChange({ target: { value: itemList }});
	}

	useEffect(() => {
		setItemList(items);
	});

  return (
		<div>
			<FormField
				name={name}
				label={label}
				value={newItem}
				button={
					<button onClick={() => {
						if (newItem) {
							updateItemList(itemList.concat(newItem));
							setNewItem('');
						}
					}}>Add</button>
				}
				onChange={({ target: { value }}) => setNewItem(value)} />
				{itemList.map((item, index) => (
					<div key={`list-item${index}`}>
						{children ? children(item) : <div>{item}</div>}
						<button onClick={() => updateItemList(itemList.filter(otherItem => otherItem !== item))}>Remove</button>
					</div>
				))}
		</div>     
  );
}

List.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	items: PropTypes.array,
	children: PropTypes.func,
	onChange: PropTypes.func
};

export default List;
