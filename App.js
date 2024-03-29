import { useState } from 'react';
import { StyleSheet, View, FlatList, Button } from 'react-native';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [courseGoals, setCourseGoals] = useState([]);

  function startAddGoalHandler() {
    setModalIsVisible(true);
  }

  function endAddGoalHandler() {
    setModalIsVisible(false);
  }

  function addGoalHanlder(goalText) {
    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals, {
        text: goalText,
        id: Math.random().toString()
      }]);
    endAddGoalHandler();
  }

  function deleteGoalHandler(id) {
    setCourseGoals((currentCourseGoals) => {
      return currentCourseGoals.filter((goal) => goal.id !== id);
    });
  }

  return (
    <>
      <StatusBar style='light' />
        <View style={styles.appContainer}>
          <Button
            title='Add New Goal'
            color='#094ACD'
            onPress={startAddGoalHandler}
          />
          <GoalInput
            visible={modalIsVisible}
            onAddGoal={addGoalHanlder}
            onCancel={endAddGoalHandler}
          />
          <View style={styles.goalsContainer}>
            <FlatList
              data={courseGoals}
              renderItem={itemData => {
                return <GoalItem
                  text={itemData.item.text}
                  id={itemData.item.id}
                  onDeleteItem={deleteGoalHandler}
                />;
              }}
              keyExtractor={(item) => {
                return item.id.toString();
              }}
              alwaysBounceVertical={false} />
          </View>
        </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  goalsContainer: {
    flex: 5,
    marginTop: 8,
  },
});
