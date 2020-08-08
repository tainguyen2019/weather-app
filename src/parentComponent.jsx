import React, { Component } from 'react';
class ParentComponent extends Component {
    render() {
        return (<div>
            {this.props.children('Tai', 'Nguyen', 21)}
        </div>);
    }
}

export default ParentComponent;