import React from 'react';
import ReactDOM from 'react-dom';
import * as actions from './app/actions';
import ActionTypes from './app/constants';
import ExpenseTracker from './app/components/ExpenseTracker';
import * as reducers from './app/reducers';
import {createStore, combineReducers} from 'redux';
import {connect, Provider} from 'react-redux';
import './app/style/style.css';
import './node_modules/rc-calendar/assets/index.css';

const initialState = {
    categories: [],
    items: [],
    categoryForm: {
        editing: false,
        editId: null
    },
    itemForm: {
        editing: false,
        editId: null
    }

}

const store = createStore(combineReducers(reducers));


function mapStateToProps(state=initialState){
    return state;
}

function mapDispatchToProps(dispatch){
    return {
        onAddCategory: (name) => {dispatch(actions.addCategory(name));},
        onRemoveCategory: (id) => {dispatch(actions.removeCategory(id));},
        onEditCategory: (id, name) => {dispatch(actions.editCategory(id, name));},
        onEditCategoryStart: (id) => {dispatch(actions.startEditCategory(id));},
        onAddItem: (name, price, time, categoryId) => {dispatch(actions.addItem(name, price, time, categoryId));},
        onRemoveItem: (id) => {dispatch(actions.removeItem(id));},
        onEditItemStart: (id) => {dispatch(actions.startEditItem(id));},
        onEditItem: (id, name, price, time, categoryId) => {dispatch(actions.editItem(id, name, price, time, categoryId));},
        onCategoryFilterChange: (id) => {dispatch(actions.filterCategory(id));},
    };
}

const App = connect(mapStateToProps, mapDispatchToProps)(ExpenseTracker);


ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById("root"));