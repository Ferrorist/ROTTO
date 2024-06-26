import { Text, StyleSheet } from 'react-native';

const Title = ({children}) => {
  return (
    <Text style={styles.title}>{children}</Text>
  )
}

export default Title;

const styles = StyleSheet.create({
  title: {
    fontFamily: 'pretendard-bold',
    fontSize: 20
  }
});