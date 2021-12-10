import React from 'react';
import { FlatList, TouchableOpacity, View, Text, StyleSheet, FlatListProps } from 'react-native';
import { TaskItem } from './TaskItem';
interface TasksListProps {
  tasks: {
    id: number;
    title: string;
    done: boolean;
  }[];
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (item: {taskId: number, newTaskTitle: string}) => void;
}

export function TasksList({ tasks, toggleTaskDone, removeTask, editTask }: TasksListProps) {
  return (
    <>
    <View style={{ backgroundColor: '#E5E5E5', marginTop:30 }}>
      <FlatList
        data={tasks}
        keyExtractor={item => String(item.id)}
        renderItem={({ item, index }) => {
          return (
            <TaskItem 
              task={item} 
              index={index} 
              toggleTaskDone={toggleTaskDone} 
              removeTask={removeTask} 
              editTask={editTask} 
            />
          )
        }}
        ListHeaderComponentStyle={{
          marginBottom: 20,
        }}
      />
    </View>
    </>
  )
}

const styles = StyleSheet.create({
  header: {
    color: '#3D3D4D',
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold'
  },
})