import { View, Text, TextInput, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

const InputBox = ({ description, title, children }) => {
  return (
    <View>
      <Text style={styles.description}>{ description }</Text>
      <Text style={styles.title}>{ title }</Text>
      <View style={styles.inputContainer}>
        <View style={styles.textContainer}>
          {children}
        </View>
        <MaterialIcons name="cancel" size={18} color={Colors.iconGray} />
      </View>
    </View>
  )
}

export default InputBox;

const styles = StyleSheet.create({
  description: {
    fontFamily: 'pretendard-semiBold',
    fontSize: 16,
    marginBottom: 18
  },
  title: {
    fontFamily: 'pretendard-regular',
    fontSize: 12,
    color: Colors.fontGray,
    marginBottom: 8
  },
  inputContainer: {
    width: '100%',
    borderBottomColor: Colors.fontGray,
    borderBottomWidth: 1,
    alignItems: 'center',
    flexDirection: 'row',
    height: 28
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
});