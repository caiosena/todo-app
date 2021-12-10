import React, { useState } from 'react';
import { Alert, View } from 'react-native';

import { Header } from '../components/Header';
import { TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

interface Task {
  id: number;
  title: string;
  done: boolean;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const counterTasks: number = tasks ? tasks.length : 0;

  function handleAddTask(newTaskTitle: string) {
    const existsTask = tasks.find(item => item.title === newTaskTitle);

    if (existsTask) {
      Alert.alert('Task já cadastrada', 'Não é possível cadastrar uma task com o mesmo nome');
      return;
    }
      
    if (newTaskTitle) {
      const newTask: Task = 
        { 
          id: new Date().getTime(),
          title: newTaskTitle,
          done: false,
        }
      setTasks([...tasks, newTask]);
    }
  }

  function handleEditTask(item: {taskId: number, newTaskTitle: string}) {
    const {taskId, newTaskTitle} = item;
    const existsTask = tasks.find(item => item.title === newTaskTitle);

    if (existsTask) {
      Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome');
      return;
    }
      
    if (taskId) {
      const updateTasks = tasks.map(
        task => 
        {
          if (task.id === taskId) task.title = newTaskTitle;
          return task;
        });
      setTasks(updateTasks);
    }
  }

  function handleMarkTaskAsDone(id: number) {
    if (id) {
      const updateTasks = tasks.map(
        task => 
        {
          if (task.id === id) task.done = !task.done;
          return task;
        });
      setTasks(updateTasks);
    }
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      'Remover item',
      'Tem certeza que você deseja remover esse item?',
      [
        {
          text: "Sim",
          onPress: () => {
            if (id) {
              const removedTask = tasks.filter(
                value => {
                  if(value.id !== id) return value;
                });
              setTasks(removedTask);
            }
          }
        },
        {
          text: "Não",
          onPress: () => {},
        },
      ]
    );
  }

  return (
    <View style={{ backgroundColor: '#E5E5E5', flex: 1 }}>
      <Header counterTasks={counterTasks} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleMarkTaskAsDone} 
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
      />
    </View>
  )
}