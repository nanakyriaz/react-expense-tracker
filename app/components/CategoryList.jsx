import React from 'react';
import ExpenseTracker from 'ExpenseTracker';

class CategoryList extends ExpenseTracker {
    render(){
        const items = this.props.items;
        let list = this.props.data.map(category => {
            let count=0, total=0;
            items.forEach(item => {
                if(item.category===category.id){
                    count++;
                    total+=item.price;
                }
            });
            return(
                <div key={category.id}>
                    <span className="fa fa-times" onClick={this.handleCategoryRemove.bind(this, category.id)}>&nbsp;&nbsp;</span>
                    <span className="fa fa-pencil" onClick={this.handleStartEditCategory.bind(this, category.id)}>&nbsp;&nbsp;</span>
                    <span>{category.name} - </span>
                    <span>{count} items - </span>
                    <span>${total} </span>
                </div>);
        });
        return (
            <div>{list}</div>
        );
    }

    handleCategoryRemove(id){
        let {onRemoveCategory} = this.props;
        //console.log("handleCategoryRemove %s", id);
        onRemoveCategory(id);
    }

    handleStartEditCategory(id){
        let {onEditStart} = this.props;
        onEditStart(id);
    }
}