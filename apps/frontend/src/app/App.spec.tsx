import { Text } from 'react-native';
import { render } from '@testing-library/react-native';

test('renders correctly', () => {
  const { getByTestId } = render(<Text testID='heading'>Hey, Jane!</Text>);
  expect(getByTestId('heading')).toHaveTextContent(/Hey,/);
});
