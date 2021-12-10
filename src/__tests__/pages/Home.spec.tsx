import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import { Home } from '../../pages/Home';
import { Alert, AlertButton } from 'react-native';

jest.mock('react-native/Libraries/Alert/Alert', () => {
  return {
    alert: jest.fn()
  }
});

jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => 'Icon')
jest.mock('react-native-vector-icons/AntDesign', () => 'Icon')

describe('Home', () => {
  it('should be able to render new added tasks', () => {
    const { getByPlaceholderText, getByText, queryByText } = render(<Home />);
    const inputElement = getByPlaceholderText('Adicionar novo todo...');

    fireEvent.changeText(inputElement, 'primeirotodo');
    fireEvent(inputElement, 'submitEditing');
    
    fireEvent.changeText(inputElement, 'segundotodo');
    fireEvent(inputElement, 'submitEditing');

    queryByText('primeirotodo');
    queryByText('segundotodo');
  });

  it('should not be able to add an empty task', () => {
    const { getByPlaceholderText, queryByText } = render(<Home />);
    const inputElement = getByPlaceholderText('Adicionar novo todo...');

    fireEvent.changeText(inputElement, '');
    fireEvent(inputElement, 'submitEditing');

    expect(queryByText('')).toBeNull();
  });

  it('should be able to render tasks as done and undone', () => {
    const { getByPlaceholderText, getByText, getByTestId, queryByText } = render(<Home />);
    const inputElement = getByPlaceholderText('Adicionar novo todo...');
    fireEvent.changeText(inputElement, 'primeirotodo');
    fireEvent(inputElement, 'onSubmitEditing');
    
    const buttonElement = getByTestId('button-0');
    const markerElement = getByTestId('marker-0');
    
    const taskElement = getByTestId('0');

    expect(buttonElement).toHaveStyle({
      paddingHorizontal: 10,
      paddingVertical: 12,
      marginBottom: 4,
      borderRadius: 4,
      flexDirection: 'row',
      alignItems: 'center'
    });
    expect(markerElement).toHaveStyle({
      height: 16,
      width: 16,
      borderWidth: 1,
      borderColor: '#3D3D4D',
      marginRight: 10
    });
    expect(taskElement).toHaveStyle({
      color: '#3D3D4D',
    });
  });

  it('should be able to remove tasks by "longPress" event', async () => {
    const { getByPlaceholderText, getByText, queryByText, getByTestId } = render(<Home />);
    const inputElement = getByPlaceholderText('Adicionar novo todo...');

    fireEvent.changeText(inputElement, 'primeirotodo');
    fireEvent(inputElement, 'onSubmitEditing');
    
    fireEvent.changeText(inputElement, 'segundotodo');
    fireEvent(inputElement, 'onSubmitEditing');

    fireEvent(getByTestId('button-0'), 'onLongPress');

    const spyAlert = jest.spyOn(Alert, 'alert');

    Alert.alert.mock.calls[0][2][0].onPress()

    expect(getByTestId('0').props.value).toBe('segundotodo');
  });
})