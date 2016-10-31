import React from 'react';
import ExpenseTracker from 'ExpenseTracker';

class CategoryAddForm extends ExpenseTracker {
    constructor(props){
        super(props);
        this.state = {input: null};
    }

    componentWillReceiveProps(nextProps){
        const {categories, editId, editing} = nextProps;
        if(editing===true){
            let category = categories.filter(category => (category.id===editId));
            if(category.length > 0)
                this.setState({input: category[0].name});
        }
    }

    render(){
        return (
            <div>
                <div className="form-group-sm">
                    <div className="form-group">
                        <label className="col-sm-3 control-label">Add/Edit Category</label>
                        <div className="col-sm-9">
                            <input type="text" ref='input' className="form-control" placeholder="Category Name"
                                   value={this.state.input} onChange={this.handleInputChange.bind(this)} onKeyUp={this.handleSubmit.bind(this)}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    handleInputChange(e){
        this.setState({input: e.target.value});
    }

    handleSubmit(e){
        if(e.keyCode===13){
            let {onAddCategory, onEditCategory} = this.props;
            let input = this.state.input.trim();
            this.setState({input: null});

            if(this.props.editing===true)
                onEditCategory(this.props.editId, input);
            else
                onAddCategory(input);
        }

    }
}