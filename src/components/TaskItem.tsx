import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface TaskItemProps {
    task: {
      id: number;
      title: string;
      done: boolean;
    };
    index: number;
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    editTask: (item: {taskId: number, newTaskTitle: string}) => void;
  }

export function TaskItem({ task, index, toggleTaskDone, removeTask, editTask }: TaskItemProps) {
    const [editingTitleTask, setEditingTitleTask] = useState<boolean>(false);
    const [editedTitleTask, setEditedTitleTask] = useState<string>(task.title);
    const textInputRef = useRef<TextInput>(null);

    function handleStartEditing() {
        setEditingTitleTask(true);
    }

    function handleCancelEditing() {
        setEditingTitleTask(false);
        setEditedTitleTask(task.title);
    }

    function handleSubmitEditing() {
        editTask({taskId: task.id, newTaskTitle: editedTitleTask});
        setEditedTitleTask(task.title);
        setEditingTitleTask(false);
    }

    useEffect(()=>{
        if (editingTitleTask)
            textInputRef.current?.focus();
        else
            textInputRef.current?.blur();
    }, [editingTitleTask]);

    return(
      <View 
          style={[index % 2 === 0 
              ? {backgroundColor: '#C4C4C4'} 
              : {backgroundColor: '#E5E5E5'}, 
              styles.taskContainer]}>
          <TouchableOpacity
              testID={`button-${index}`}
              activeOpacity={0.7}
              onPress={() => toggleTaskDone(task.id)}
              onLongPress={() => removeTask(task.id)}
              style={task.done ? styles.taskButtonDone : styles.taskButton}
          >
              <View 
              testID={`marker-${index}`}
              style={[task.done ? styles.taskMarkerDone : styles.taskMarker, { marginLeft: 10 }]}
              />
          </TouchableOpacity>
          <TextInput
              testID={index.toString()}
              value={editedTitleTask}
              onChangeText={item=>setEditedTitleTask(item)}
              editable={editingTitleTask}
              onSubmitEditing={handleSubmitEditing}
              style={task.done ? styles.taskTextDone : styles.taskText}
              ref={textInputRef}
          />
          <View style={{flexDirection: 'row'}}>
              {editingTitleTask ? 
                  <TouchableOpacity
                  testID={`cancel-${index}`}
                  activeOpacity={0.2}
                  onPress={handleCancelEditing}
                  style={{ justifyContent: 'center', marginRight: 15 }}
                  >
                      <Icon name='close' size={18} />
                  </TouchableOpacity>
              :
                  <TouchableOpacity
                  testID={`edit-${index}`}
                  activeOpacity={0.2}
                  onPress={handleStartEditing}
                  style={{ justifyContent: 'center', marginRight: 15 }}
                  >
                      <Icon name='pencil' size={18} />
                  </TouchableOpacity>
              }
              <View style={{width: 1, height: 24, backgroundColor: 'rgba(196, 196, 196, 0.24)'}} />
              <TouchableOpacity
                  testID={`trash-${index}`}
                  activeOpacity={0.2}
                  onPress={()=>removeTask(task.id)}
                  disabled={editingTitleTask}
                  style={[{ justifyContent: 'center', marginRight: 15 }, editingTitleTask ? {opacity: 0.2} : {opacity: 1}]}
                  >
                      <Icon name='delete' size={18} />
              </TouchableOpacity>

          </View>
      </View>
    );
}

const styles = StyleSheet.create({
    taskContainer: {
      flexDirection: 'row',
    },
    taskButton: {
      paddingHorizontal: 10,
      paddingVertical: 12,
      marginBottom: 4,
      borderRadius: 4,
      flexDirection: 'row',
      alignItems: 'center',
    },
    taskButtonDone: {
      paddingHorizontal: 10,
      paddingVertical: 12,
      marginBottom: 4,
      borderRadius: 4,
      flexDirection: 'row',
      alignItems: 'center'
    },
    taskMarker: {
      height: 16,
      width: 16,
      borderWidth: 1,
      borderColor: '#3D3D4D',
      marginRight: 10
    },
    taskMarkerDone: {
      height: 16,
      width: 16,
      backgroundColor: '#1DB863',
      textDecorationLine: 'line-through',
      marginRight: 10
    },
    taskText: {
      flex: 1,
      color: '#3D3D4D',
    },
    taskTextDone: {
      flex: 1,
      color: '#1DB863',
      textDecorationLine: 'line-through',
    }
  })