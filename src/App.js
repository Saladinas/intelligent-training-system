import React, { Component } from 'react';
import './App.css';
import ExerciseList from './components/Exercises/ExerciseList';
import Exercise from './components/Exercises/Exercise';
import NavBar from './components/NavBar/NavBar';
import Form from './components/Form/Form';
import HistoricalData from './components/HistoricalData/HistoricalData';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import config from './data/config';
import normsModel from './data/normsModel';
import bodyConditions from './data/bodyConditions';

class App extends Component {
  constructor(props) {
    super(props);
    // Initial system values
    this.state = {
      // Same structure as 'Body' class in class diagram
      body: {
        heartRate: 120,
        heartRatecategory: 'norm',
        sweatRate: 0.4,
        sweatRateCategory: 'norm',
        condition: 'regular',
        waterLevel: 'regular',
      },
      // Same structure as 'Person' class in class diagram
      userInfo: {
        id: 1,
        name: 'Lukas',
        age: 20,
        height: '180',
        weight: '72',
        injured: false,
      },
      // Same structure as 'Digital training' class in class diagram
      intelligentTrainer: {
        trainingAdvice: 'start training',
        waterAdvice: 'regular',
        duration: 0,
        program: null,
      }
    };
  }

  // Function which returns new finding about body condition.
  // As we are not using bracelet for receiving new data, we are imitating received data
  // from bodyConditions.js file which is in data folder.
  receive(exerciseSecond, exerciseType) {
    if (exerciseType === 'Strength') {
      const currentBodyCondition = bodyConditions.strength.filter(s => s.duration === exerciseSecond)[0];
      return currentBodyCondition;
    }
    if (exerciseType === 'Cardio') {
      const currentBodyCondition = bodyConditions.cardio.filter(s => s.duration === exerciseSecond)[0];
      return currentBodyCondition;
    }
  }

  // Main worlflow function which is called during monitoring process every 10 or 30 seconds depending on exercise information.
  // As we are not using bracelet for receiving new data, we are checking exercise duration in code.
  monitor(exerciseSecond, exerciseInformation) {
    const { userInfo } = this.state;
    // Monitor Strength type exercises every 10 seconds
    if (exerciseInformation.type === 'Strength' && exerciseSecond % config.monitoringTimes.strength === 0) {
      const currentBodyCondition = this.receive(exerciseSecond, exerciseInformation.type);
      const normValues = this.select(userInfo, normsModel);
      const difference = this.compare(currentBodyCondition, normValues);
      const advice = this.classify(difference);
      this.provide(currentBodyCondition, advice);
    } else if (exerciseInformation.type === 'Cardio' && exerciseSecond % config.monitoringTimes.cardio === 0) {
      // Monitor Strength type exercises every 30 seconds
      const currentBodyCondition = this.receive(exerciseSecond, exerciseInformation.type);
      const normValues = this.select(userInfo, normsModel);
      const difference = this.compare(currentBodyCondition, normValues);
      const advice = this.classify(difference);
      this.provide(currentBodyCondition, advice);
    }
  }

  // Main worlflow function which is called during monitoring process to get difference between current and norm body conditions.
  compare(currentBodyCondition, normValues) {
    return currentBodyCondition.heartRate - normValues.maximum;
  }

  // Main worlflow function which is called during monitoring process classify advice based on difference.
  classify(difference) {
    if (difference < 0) {
      return 'continue';
    } else {
      return 'take a break';
    }
  }

  // Main worlflow function which is called during monitoring process to provide advice.
  // In the system it updates navigation bar on top and table below slider.
  provide(newValues, advice) {
    this.setState(prevState => ({
      body: {
        ...prevState.body,
        heartRate: newValues.heartRate,
        sweatRate: newValues.sweatRate,
      },
      intelligentTrainer: {
        ...prevState.intelligentTrainer,
        trainingAdvice: advice,
      }
    }));
  }

  // Main worlflow function which is called during monitoring process to select norm values based on user age.
  select(userInfo, norms) {
    const normValuesByAge = norms.filter(n => n.age === userInfo.age)[0];

    return normValuesByAge;
  }

  // Function which is called when changing settings in initial settings page
  onChangeUserInfo = prop => event => {
    event.persist();
    this.setState(prevState => ({
      userInfo: {
        ...prevState.userInfo,
        [prop]: event.target.value,
      }
    }))
  };

  // Function to explicitly update intelligent trainer. For example when slider reaches the end.
  onUpdateIntelligentTrainer = (type, advice) => {
    this.setState(prevState => ({
      intelligentTrainer: {
        ...prevState.intelligentTrainer,
        [type]: advice,
      }
    }))
  };

  // This function is called to display components based on current URL. It is used for single page application.
  render() {
    const { body, userInfo, intelligentTrainer } = this.state;
    const normValues = this.select(userInfo, normsModel);
    return (
      <Router>
        <div className="App">
          <Route path="/exercises" component={() => <NavBar intelligentTrainer={intelligentTrainer} body={body} />} />
          <Route exact path="/" render={() => <Form userInfo={userInfo} handleChange={(prop, event) => this.onChangeUserInfo(prop, event)} />} />
          <Route exact path="/exercises" component={() => <ExerciseList />} />
          <Route exact path="/exercises/:exrcise" render={() => <Exercise monitor={this.monitor.bind(this)} updateIntelligentTrainer={this.onUpdateIntelligentTrainer} userInfo={userInfo} normValues={normValues} />} />
          <Route exact path="/exercises/history/data" render={() => <HistoricalData userInfo={userInfo} normValues={normValues} />} />
        </div>
      </Router>
    );
  }
}

export default App;
