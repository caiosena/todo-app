import React from 'react';
import { View, Text, StatusBar, StyleSheet } from 'react-native';

export function Header({counterTasks}: {counterTasks: number}) {
  return (
    <View style={styles.header}>
      <View style={styles.headerNameApp}>
        <Text style={styles.headerNameAppText}>to.</Text>
        <Text style={[styles.headerNameAppText, { fontFamily: 'Poppins-SemiBold' }]}>do</Text>
      </View>
      <View style={styles.headerCounterTasks}>
        <Text style={styles.headerCounterTasksText}>Você tem {''}</Text>
        <Text style={[styles.headerCounterTasksText, { fontFamily: 'Poppins-SemiBold' }]}>{counterTasks} tarefas</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    paddingTop: StatusBar.currentHeight,
    paddingBottom: 44,
    backgroundColor: '#8257E5',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  headerNameApp: {
    alignItems: 'center',
    paddingLeft: 10,
    flexDirection: 'row'
  },
  headerCounterTasks: {
    alignItems: 'center',
    paddingRight: 10,
    color: '#FFF',
    flexDirection: 'row',
  },
  headerNameAppText: {
    fontSize: 24,
    color: '#FFF',
    fontFamily: 'Poppins-Regular',
  },
  headerCounterTasksText: {
    fontSize: 12,
    color: '#FFF',
    fontFamily: 'Poppins-Regular',
  }
});
