import React, { Component } from 'react'

class Input extends Component {

    onFieldChange = (event) => {
        const fieldName = event.target.id;
        const fieldValue = event.target.value;
        this.props.onChange(fieldName, fieldValue);
    }

    render() {
        return (
            <div>
                <div className="form-group" style={{ marginLeft: "10%" }}>
                    <label htmlFor={this.props.field} style={{ color: "black", fontWeight: "bold", marginTop: 20, fontSize: 20 }}>{this.props.label}</label>
                    <input type={this.props.type} className={this.props.styleInput} id={this.props.field} placeholder={this.props.placeholder} required onChange={this.onFieldChange} 
                    disabled={this.props.disable}
                    value={this.props.value}
                    maxLength={this.props.maxLength}
                    />
                </div>
            </div>
        )
    }
}

export default Input
