import React from 'react';
import ExpenseTracker from 'ExpenseTracker';

class ItemList extends ExpenseTracker {
    render() {
        const {items, categories, onRemoveItem, onEditItemStart, categoryFilter} = this.props;
        //console.log("categoryFilter : %s", categoryFilter);
        let filteredItems = items;
        if(categoryFilter!==null){
            filteredItems = filteredItems.filter(item => item.category===categoryFilter);
        }
        let itemList = filteredItems.map(item => {
            let category = categories.filter(category => category.id===item.category);
            let categoryName = category.length>0?category[0].name:null;
            return (<tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{categoryName}</td>
                <td>
                    <span className="fa fa-times" onClick={onRemoveItem.bind(null, item.id)}>&nbsp;&nbsp;</span>
                    <span className="fa fa-pencil" onClick={onEditItemStart.bind(null, item.id)}></span>
                </td>
            </tr>)});
        let hideTable = (items.length===0);
        let style = {display: hideTable?'none':'block'};
        return (
            <div style={style}>
                <table className='table table-bordered table-hover item-table'>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>{itemList}</tbody>
                </table>
            </div>
        );
    }
}