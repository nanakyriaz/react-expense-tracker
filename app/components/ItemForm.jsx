import React from 'react';
import Calendar from 'rc-calendar';
import DatePicker from 'rc-calendar/lib/Picker';
import CalendarLocale from 'rc-calendar/lib/locale/en_US';
import GregorianCalendar from 'gregorian-calendar';
import DateTimeFormat from 'gregorian-calendar-format';
import ExpenseTracker from 'ExpenseTracker';

const dateFormatter = new DateTimeFormat('yyyy-MM-dd');

class ItemForm extends ExpenseTracker {
    constructor(props){
        super(props);
        this.state = {selectedCategory: "", name: null, price: null, time: null};
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.editing===true){
            const editItem = this.props.items.filter(item => item.id===nextProps.editId);
            if(editItem.length>0){
                this.setState({
                    name: editItem[0].name,
                    price: editItem[0].price,
                    selectedCategory: editItem[0].category,
                    time: editItem[0].time
                });
            }
        }
    }

    render() {
        let {categories} = this.props;
        let categoryOptions = categories.map(category => (
            <option key={category.id} value={category.id}>{category.name}</option>
        ));
        const calendar = (<Calendar locale={CalendarLocale}
                                    style={{zIndex: 1000}}
                                    disabledTime={false}
                                    showDateInput={false}/>)
        return (
            <div className="form-horizontal form-group-sm">
                <div className="form-group">
                    <label className="col-sm-3 control-label">Name</label>
                    <div className="col-sm-9">
                        <input value={this.state.name} type="text" className="form-control" placeholder="Item Name" onChange={this.handleNameChange.bind(this)}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-3 control-label">Price</label>
                    <div className="col-sm-9">
                        <input value={this.state.price} type="text" className="form-control" placeholder="Item Price" onChange={this.handlePriceChange.bind(this)}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-3 control-label">Time</label>
                    <div className="col-sm-9">
                        <DatePicker animation='slide-down' calendar={calendar} onChange={this.handleDateChange.bind(this)}>{
                            ({value}) => {
                                if(this.state.time!==null){
                                    value = new GregorianCalendar(CalendarLocale);
                                    value.setTimezoneOffset(0);
                                    console.log("time : %s", this.state.time);
                                    value.setTime(this.state.time);
                                } else {
                                    value = null;
                                }
                                return (<input className="form-control input-sm"
                                               value={value && dateFormatter.format(value)}
                                               placeholder="Buy Date"></input>);
                            }
                        }</DatePicker>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-3 control-label">Category</label>
                    <div className="col-sm-9">
                        <select className="form-control input-sm" value={this.state.selectedCategory} onChange={this.handleCategoryChange.bind(this)}>
                            <option value={""}>Select Category</option>
                            {categoryOptions}
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-9 col-sm-offset-3">
                        <button type="text" className="btn btn-default btn-sm" onClick={this.handleItemSubmit.bind(this)}>Submit</button>
                    </div>
                </div>
            </div>
        );
    }

    handleItemSubmit(e){
        const {onAddItem, onEditItem} = this.props;
        let price = 0.0;
        try{
            price = parseFloat(this.state.price);
        }catch(e){
            //console.log("Error parsing!!!");
        }

        if(this.props.editing===true)
            onEditItem(this.props.editId, this.state.name, price, this.state.time, this.state.selectedCategory);
        else
            onAddItem(this.state.name, price, this.state.time, this.state.selectedCategory);

        this.resetForm();
        //console.log(this.state);
        //this.resetForm();
    }

    resetForm(){
        this.setState({
            selectedCategory: "",
            name: null,
            price: null,
            time: null
        });
    }

    handleCategoryChange(e){
        this.setState({selectedCategory: e.target.value});
    }

    handleNameChange(e){
        this.setState({name: e.target.value});
    }

    handlePriceChange(e){
        this.setState({price: e.target.value});
    }

    handleDateChange(value){
        value = value.clone();
        value.setHourOfDay(0+value.getTimezoneOffset()/60);
        value.setMinutes(0);
        value.setSeconds(0);
        value.setMilliseconds(0);
        console.log(value.getTime());
        this.setState({time: value.getTime()});
    }
}