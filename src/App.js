import React, { Component } from 'react';
import './App.css';
import ExerciseList from './components/Exercises/ExerciseList';
import Exercise from './components/Exercises/Exercise';
import NavBar from './components/NavBar/NavBar';
import Form from './components/Form/Form';
import normValues from './data/normValues';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: {
        heartRate: 100,
        sweatRate: 100,
        condition: 'regular',
        waterLevel: 'regular',
      },
      userInfo: {
        id: 1,
        name: 'Lukas',
        age: 20,
        height: '180',
        weight: '72',
        injured: false,
      },
      intelligentTrainer: {
        trainingAdvice: 'start training',
        waterAdvice: 'regular',
      }
    };
  }

  onChangeBodyCondition(newValues) {

    this.setState(prevSate => ({
      body: {
        ...prevSate.body,
        heartRate: newValues.heartRate,
        sweatRate: newValues.sweatRate,
      }
    }));
  }

  getNormValuesByUserAge() {
    const { userInfo } = this.state;
    const normValuesByAge = normValues.filter(n => n.age === userInfo.age)[0];

    return normValuesByAge;
  }

  onChangeUserInfo = prop => event => {
    event.persist();
    this.setState(prevState => ({
      userInfo: {
        ...prevState.userInfo,
        [prop]: event.target.value,
      }
    }))
  };

  render() {
    const { body, userInfo, intelligentTrainer } = this.state;
    const normValuesByAge = this.getNormValuesByUserAge();
    return (
      <Router>
        <div className="App">
          <Route path="/exercises" component={() => <NavBar intelligentTrainer={intelligentTrainer} body={body} />} />
          <Route exact path="/" render={() => <Form userInfo={userInfo} handleChange={(prop, event) => this.onChangeUserInfo(prop, event)} />} />
          <Route exact path="/exercises" component={() => <ExerciseList />} />
          <Route exact path="/exercises/:exrcise" render={() => <Exercise userInfo={userInfo} normValuesByAge={normValuesByAge} onChangeBodyCondition={(values) => this.onChangeBodyCondition(values)} />} />
        </div>
      </Router>
    );
  }
}

export default App;
