import React from 'react';
import { FlatList, TouchableOpacity, View, Text, StyleSheet, FlatListProps } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

function FlatListHeaderComponent() {
  return (
    <View>
      <Text style={styles.header}>Minhas tasks</Text>
    </View>
  )
}

interface MyTasksListProps {
  tasks: {
    id: number;
    title: string;
    done: boolean;
  }[];
  onPress: (id: number) => void;
  onLongPress: (id: number) => void;
}

export function MyTasksList({ tasks, onLongPress, onPress }: MyTasksListProps) {
  return (
    <>
    <View style={{ backgroundColor: '#E5E5E5', marginTop:30 }}>
      <FlatList
        data={tasks}
        keyExtractor={item => String(item.id)}
        renderItem={({ item, index }) => {
          return (
            <View 
              style={[index % 2 === 0 
                ? {backgroundColor: '#C4C4C4'} 
                : {backgroundColor: '#E5E5E5'}, 
                styles.taskContainer]}>
              <TouchableOpacity
                testID={`button-${index}`}
                activeOpacity={0.7}
                onPress={() => onPress(item.id)}
                onLongPress={() => onLongPress(item.id)}
                style={item.done ? styles.taskButtonDone : styles.taskButton}
              >
                <View 
                  testID={`marker-${index}`}
                  style={[item.done ? styles.taskMarkerDone : styles.taskMarker, { marginLeft: 10 }]}
                />
                <Text 
                  style={item.done ? styles.taskTextDone : styles.taskText}
                >
                  {item.title}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
              activeOpacity={0.2}
              onPress={() => onLongPress(item.id)}
              style={{ justifyContent: 'center', marginRight: 15 }}
              >
                <Icon name='delete' size={18} />
              </TouchableOpacity>
            </View>
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
  taskContainer: {
    flexDirection: 'row',
  },
  taskButton: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskButtonDone: {
    flex: 1,
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
    color: '#3D3D4D',
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
  }
})