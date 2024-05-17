import { useEffect } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import Colors from "../../constants/Colors";
import { useNavigation } from "@react-navigation/native";

const FarmDetail = ({ data }) => {
  const Navigation = useNavigation();
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    console.log(data);
  }, []);

  return (
    <Pressable
      onPress={() => {
        Navigation.navigate("farm", {
          farmCode: data.farmCode,
        });
      }}
      style={[styles.container, { width: width * 0.9, height: 100 }]}
    >
      <Image
        source={{
          uri: `${process.env.EXPO_PUBLIC_S3URL}/farm_img/1/${data.farmLogoPath}`,
        }}
        style={styles.farmLogo}
      />
      {/* <Image source={{ uri: data.farmLogoPath }} /> */}
      <View>
        <Text style={styles.title}>{data.farmName}</Text>
        <Text style={styles.profit}>지난 수익률 : + 12.66%</Text>
        <Text>{data.beanName}</Text>
      </View>
    </Pressable>
  );
};

export default FarmDetail;

const styles = StyleSheet.create({
  container: {
    marginBottom: 0,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    color: "black",
  },
  farmLogo: {
    height: 52,
    width: 52,
    resizeMode: "stretch",
    borderRadius: 26,
    marginRight: 10,
  },
  profit: {
    color: "red",
  },
});