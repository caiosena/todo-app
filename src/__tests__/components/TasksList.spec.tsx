import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import { TasksList } from '../../components/TasksList';

jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => 'Icon')
jest.mock('react-native-vector-icons/AntDesign', () => 'Icon')

let tasks: {
  id: number;
  title: string;
  done: boolean;
}[] = [];

let mockedRemoveTask: jest.Mock;
let mockedToggleTaskDone: jest.Mock;
let mockedEditTask: jest.Mock;

mockedRemoveTask = jest.fn();
mockedToggleTaskDone = jest.fn();
mockedEditTask = jest.fn();

describe('TasksList', () => {
  beforeAll(() => {
    tasks = [
      {
        id: 1,
        title: 'primeirotodo',
        done: false
      },
      {
        id: 2,
        title: 'segundotodo',
        done: false
      },
      {
        id: 3,
        title: 'terceirotodo',
        done: true
      },
    ];
  });

  test('should be able to render all tasks', () => {
    const { getByText, queryByText, getByTestId } = 
      render(<TasksList tasks={tasks} toggleTaskDone={mockedToggleTaskDone} removeTask={mockedRemoveTask} editTask={mockedEditTask} />);
    
      expect(getByTestId('0').props.value).toBe('primeirotodo');
      expect(getByTestId('1').props.value).toBe('segundotodo');
      expect(getByTestId('2').props.value).toBe('terceirotodo');
  });

  it('should be able to handle "remove" event', () => {
    mockedRemoveTask = jest.fn();
    const { getByText, queryByText, getByTestId } = 
      render(<TasksList tasks={tasks} toggleTaskDone={mockedToggleTaskDone} removeTask={mockedRemoveTask} editTask={mockedEditTask} />);

    fireEvent(getByTestId('trash-1'), 'onPress');

    expect(mockedRemoveTask).toHaveBeenCalledWith(2);
  });

  it('should be able to handle "toggle" event', () => {    
    const { getByText, queryByText, getByTestId } = 
      render(<TasksList tasks={tasks} toggleTaskDone={mockedToggleTaskDone} removeTask={mockedRemoveTask} editTask={mockedEditTask} />);

    fireEvent.press(getByTestId('button-2'));

    expect(mockedToggleTaskDone).toHaveBeenCalledWith(3);
  });
})