import { Alert } from '@chakra-ui/react';
const AlertInfo = ({ message }) => {
  <Alert.Root status="success" variant="solid">
    <Alert.Indicator />
    <Alert.Title>{{ message }}</Alert.Title>
  </Alert.Root>;
};

export default AlertInfo;
