import React from 'react';

export default class ExpenseTracker extends React.Component{
    render(){
        return (
            <div id="expense-tracker">
                <div>
                    <h4>Expense Category</h4>
                    <Category {...this.props}/>
                </div>
                <div>
                    <h4>Expenses</h4>
                    <Item {...this.props}/>
                </div>
            </div>
        );
    }
}