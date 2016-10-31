import React from 'react';
import ExpenseTracker from 'ExpenseTracker';

class Item extends ExpenseTracker {
    render() {
        return (
            <div>
                <ItemForm categories={this.props.categories} onAddItem={this.props.onAddItem} onEditItem={this.props.onEditItem} editing={this.props.itemForm.editing} editId={this.props.itemForm.editId} items={this.props.items}/>
                <ItemCategoryFilter categories={this.props.categories} items={this.props.items} onCategoryFilterChange={this.props.onCategoryFilterChange}/>
                <ItemList items={this.props.items} categories={this.props.categories} onRemoveItem={this.props.onRemoveItem} onEditItemStart={this.props.onEditItemStart} categoryFilter={this.props.categoryFilter}/>
            </div>
        );
    }
}