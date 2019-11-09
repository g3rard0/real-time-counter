import React, {Component} from 'react';
import './App.css';
import firebase from './firebase.js';
import Counter from './Counter';
import { Button, Modal, Form } from 'semantic-ui-react';

class App extends Component {
  state = {
    counters: {

    },
    name: '',
    start: 0,
    modalOpen: false
  };

  handleOpen = () => this.setState({ modalOpen: true });
  handleClose = () => this.setState({ modalOpen: false, name: '', start: 0 });

  handleIncrement = (counterId) => {
    const {counters} = this.state;
    const eventRef = firebase.database().ref(`events/event1/counters/${counterId}`);
    eventRef.update({
      start: counters[counterId].count + 1
    });
    console.log(counters[counterId].count);
  };

  handleDecrement = (counterId) => {
    
    const {counters} = this.state;
    if (counters[counterId].count < 1) return; 
    const eventRef = firebase.database().ref(`events/event1/counters/${counterId}`);
    eventRef.update({
      start: counters[counterId].count - 1
    });
  };

  componentDidMount() {
    const eventRef = firebase.database().ref('events/event1/counters');
    eventRef.on('value', (snapshot) => {
      console.log('snapshot', snapshot.val())
      let counters = {};

      if (snapshot.val()){
        Object.entries(snapshot.val()).forEach(([id, counter]) => {
          console.log(id, counter);
          counters[id] = {
            name: counter.name,
            count: counter.start
          }
        });
      }
       console.log(counters);
      this.setState({
        counters: counters
      });
    });

  }

  handleNewCounter = () => {
    console.log('new counter');
    const {name, start} = this.state;
    const eventRef = firebase.database().ref('events/event1/counters');
  
    //push takes in a callback, called when an error occurs and after the operation completes
    eventRef.push({
      name,
      start: parseInt(start)
    }, (error) => {
      if (error) {
        console.log('error, need to handle this');
      } else {
        this.setState({
          name: '',
          start: 0,
          modalOpen: false
        })
      }
    });
    
  };

  handleRemoval = (counterId) => {
    const eventRef = firebase.database().ref(`events/event1/counters/${counterId}`);
    eventRef.remove();
  };

  handleChange = (event) => {
    // console.log('handle change', event.target.name)
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    let {counters, name, start} = this.state;
    return (
      <div className="App">
        {Object.entries(counters).map(([id, counter]) => 
          <Counter 
            start={counter.count} 
            name={counter.name} 
            key={id}
            handleDecrement={() => this.handleDecrement(id)}
            handleIncrement={() => this.handleIncrement(id)}
            handleRemoval={() => this.handleRemoval(id)}
        />) }
            <Modal 
              trigger={<Button onClick={this.handleOpen} size="massive" primary>Add new counter</Button>} closeIcon
              open={this.state.modalOpen}
              onClose={this.handleClose}
              >
              <Modal.Content>
                <Form>
                  <Form.Field>
                    <label>Name:</label>
                    <input name="name" onChange={this.handleChange} value={name}/>
                  </Form.Field>
                  <Form.Field>
                    <label>Number:</label>
                    <input name="start" placeholder="0" onChange={this.handleChange} value={start}/>
                  </Form.Field>
                  <Button size="massive" positive fluid onClick={this.handleNewCounter}>Create new counter</Button>
                </Form>
              </Modal.Content>
            </Modal>
      </div>
    );
  }
}

export default App;
