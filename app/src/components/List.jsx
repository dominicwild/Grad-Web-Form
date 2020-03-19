import React, { Component } from "react";

class List extends Component {
  render() {
      const {id, labelText, list} = this.props
    return (
      <div>
        <label htmlFor={id}>{labelText}:</label>
        <select type="text" id={id} name={id} disabled={list === undefined}>
          {() => {
            if (list) {
              return list.map(list => {
                return <option value={list.id}>{list.name}</option>;
              });
            } else {
              return <option>Loading...</option>;
            }
          }}
        </select>
      </div>
    );
  }
}

export default List;
