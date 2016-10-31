import React from 'react';
import ExpenseTracker from 'ExpenseTracker';

class ItemCategoryFilter extends ExpenseTracker {
    constructor(props){
        super(props);
        this.state={selectedCategory: null};
    }
    render() {
        const {categories, items} = this.props;
        const categoriesWithItems = categories.filter(category => {
            let categoryItems = items.filter(item => (item.category === category.id));
            return categoryItems.length > 0;
        });
        const filterOptions = categoriesWithItems.map(category => {
            return (
                <option value={category.id} key={category.id}>
                    {category.name}
                </option>
            );
        });
        let style = {display: items.length>0?"block":"none"};
        return (
            <div id='category-filter' style={style}>
                <select value={this.state.selectedCategory} onChange={this.handleFilterChange.bind(this)}>
                    <option value="">All</option>
                    {filterOptions}
                </select>
            </div>
        );
    }

    handleFilterChange(e){
        //console.log("ItemCategoryFilter change: %s", e.target.value);
        let filterValue = e.target.value
        if(filterValue==="")
            filterValue = null;

        this.setState({selectedCategory: filterValue});
        this.props.onCategoryFilterChange(filterValue);
    }
}