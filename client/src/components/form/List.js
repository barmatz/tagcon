import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FormField from './FormField';

function List({ name, label, items, children, onChange }) {
	const [ itemList, setItemList ] = useState(items ? [ ...items ] : [])
			, [ newItem, setNewItem ] = useState('');

  return (
		<div>
			<FormField
				name={name}
				label={label}
				value={newItem}
				button={
					<button onClick={() => {
						if (newItem) {
							const newItemList = itemList.concat(newItem);

							setItemList(newItemList);
							setNewItem('');
							onChange && onChange({ target: { value: newItemList }});
						}
					}}>Add</button>
				}
				onChange={({ target: { value }}) => setNewItem(value)} />
				{itemList.map((item, index) => (
					children
						?
							children(item, index)
						:
							<div key={`list-item${index}`}>{item}</div>
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
