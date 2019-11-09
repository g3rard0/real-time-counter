import React, {Component} from 'react';
import { Icon, Segment, Button } from 'semantic-ui-react'


class Counter extends Component {

  render() {
    //const { count } = this.state;
    const { handleDecrement, handleIncrement,handleRemoval, start, name} = this.props;
    return (
      <Segment>
        <div className="counter">
          <div className="counter__value">{start}</div>
          <div className="counter__name">{name}: </div>
          <Button size="massive" icon onClick={handleIncrement}><Icon name="add" /></Button>
          <Button size="massive" icon onClick={handleDecrement}><Icon name="minus"/></Button>
          <Button size="massive" color="red" icon onClick={handleRemoval}><Icon name="trash alternate outline" /></Button>
        </div>
      </Segment>
  );
  }
}

export default Counter;
