import React, { Component } from 'react';
import './App.css';
import ExerciseList from './components/Exercises/ExerciseList';
import Exercise from './components/Exercises/Exercise';
import NavBar from './components/NavBar/NavBar';
import Form from './components/Form/Form';
import HistoricalData from './components/HistoricalData/HistoricalData';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import normsModel from './data/normsModel';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: {
        heartRate: 120,
        sweatRate: 0.4,
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
    const normValuesByAge = normsModel.filter(n => n.age === userInfo.age)[0];

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

  onUpdateIntelligentTrainer = (type, advice) => {
    this.setState(prevState => ({
      intelligentTrainer: {
        ...prevState.intelligentTrainer,
        [type]: advice,
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
          <Route exact path="/exercises/:exrcise" render={() => <Exercise updateIntelligentTrainer={this.onUpdateIntelligentTrainer} userInfo={userInfo} normValuesByAge={normValuesByAge} onChangeBodyCondition={(values) => this.onChangeBodyCondition(values)} />} />
          <Route exact path="/exercises/history/data" render={() => <HistoricalData userInfo={userInfo} normValuesByAge={normValuesByAge} />} />
        </div>
      </Router>
    );
  }
}

export default App;
