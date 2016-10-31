import React from 'react';
import ExpenseTracker from 'ExpenseTracker';

class Category extends ExpenseTracker {
    render(){
        const {categories, categoryForm: {editing: editing, editId: editId}, items} = this.props;
        return (
            <div>
                <CategoryAddForm categories={categories} editing={editing} editId={editId}
                                 onAddCategory={this.props.onAddCategory} onEditCategory={this.props.onEditCategory}/>
                <CategoryList data={categories} items={items} onRemoveCategory={this.props.onRemoveCategory} onEditStart={this.props.onEditCategoryStart}/>
            </div>
        );
    }
}