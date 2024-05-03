import { createStackNavigator } from "@react-navigation/stack";
import Routers from "./Routers";
import OnboardingScreen from "../screens/loading/OnboardingScreen";
import NameIdInputScreen from "../screens/user/NameIdInputScreen";
import PhoneNumberInputScreen from "../screens/user/PhoneNumberInputScreen";
import PasswordInputScreen from "../screens/user/PasswordInputScreen";
import SignInScreen from "../screens/user/SignInScreen";

const AuthRouters = () => {
  const AuthStack = createStackNavigator();

  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }} >
      <AuthStack.Screen name="Onboarding" component={OnboardingScreen} />
      <AuthStack.Screen name="NameIdInput" component={NameIdInputScreen} />
      <AuthStack.Screen name="PhoneNumberInput" component={PhoneNumberInputScreen} />
      <AuthStack.Screen name="PasswordInput" component={PasswordInputScreen} />
      <AuthStack.Screen name="SignIn" component={SignInScreen} />
      <AuthStack.Screen name="Routers" component={Routers} />
    </AuthStack.Navigator>
  )
}

export default AuthRouters;