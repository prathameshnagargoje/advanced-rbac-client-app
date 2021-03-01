import React from 'react';
import { ApiService } from '../Service/ApiService';

class DropDown extends React.Component {
    constructor(props) {
        super(props);
        this.apiService = new ApiService();
        this.state = {
            values: [],
            selected: null
        }
    }
    componentDidMount() {
        this.apiService.callResourceAllUsers()
            .then((json) => {
                this.setState({
                    values: json.data
                })
            });
    }

    handleSelectChange(evt){
        this.props.handleStateChange(evt.target.value);
    }

    render() {
        return <div className="drop-down">
            <select onChange={evt => this.handleSelectChange(evt)}>{
                this.state.values.map((obj) => {
                    return <option value={obj.id}>{obj.email}</option>
                })
            }</select>
        </div>;
    }
}

export default DropDown;