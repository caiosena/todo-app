import React, { useState } from 'react';
import { View } from 'react-native';

import { Header } from '../components/Header';
import { MyTasksList } from '../components/MyTasksList';
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
    if (id) {
      const removedTask = tasks.filter(
        value => {
          if(value.id !== id) return value;
        });
      setTasks(removedTask);
    }
  }

  return (
    <View style={{ backgroundColor: '#E5E5E5', flex: 1 }}>
      <Header counterTasks={counterTasks} />

      <TodoInput addTask={handleAddTask} />

      <MyTasksList 
        tasks={tasks} 
        onPress={handleMarkTaskAsDone} 
        onLongPress={handleRemoveTask} 
      />
    </View>
  )
}