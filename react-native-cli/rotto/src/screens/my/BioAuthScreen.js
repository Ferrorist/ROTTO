import { View, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import SettingService from '../../utils/setting';
import * as LocalAuthentication from 'expo-local-authentication';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

const BioAuthScreen = ({navigation, route}) => {
  const amount = route.params.amount;

  useFocusEffect(
    useCallback(() => {
      const proceedBioAuth = async () => {
        const isEnabled = await SettingService.getBiometricEnabled();
        
        if (isEnabled) {
          const bioAuth = await LocalAuthentication.authenticateAsync({
            promptMessage: '생체 인증 진행',
            fallbackLabel: '비밀번호 입력',
            disableDeviceFallback: false
          });
  
          if (bioAuth.success) {
            console.log('생체 인증 성공');
            navigation.navigate('transactionResult', { amount });
          } else if (bioAuth.error === 'user_cancel') {
            navigation.goBack();
          } else {
            console.log('생체 인증 실패');
            navigation.navigate('transactionPinAuth', { amount });
          }
        } else {
          navigation.navigate('transactionPinAuth', { amount });
        }
      };
  
      proceedBioAuth();
    }, [navigation])
  );

  return (
    <View style={styles.container}>
    </View>
  )
}

export default BioAuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgOrg
  }
});