import { StatusBar } from 'react-native';
import { StyleSheet, Text, View, Image, SafeAreaView, ImageBackground, TouchableOpacity, TextInput, Button } from 'react-native';
import { COLORS, SIZES, FONT, images } from '../../constants'
import { useNavigation } from "@react-navigation/native";
import { Colors } from 'react-native/Libraries/NewAppScreen';
import HeaderTop from '../component/profile/HeaderTop';

const TransferSuccess = () => {

  const navigation = useNavigation();

  

  return (
    <SafeAreaView style={styles.container}>
    <StatusBar style="light"/>
    <ImageBackground 
      source={require("../../assets/image/back_one.png")}
      style={styles.image}
    
    />

    <HeaderTop value={"Transfer Success"}/>


    <View style={styles.successContainer}>
        <Image 
            source={require("../../assets/image/round_bg.png")}
            style={styles.centerImage}
            />
        <Text style={styles.title}>Transfer Success</Text>
        <Text style={styles.subtitle}>Amount</Text>
        <Text style={styles.title}>$1,436</Text>    
    </View>
    
      
      
      
      

      
    
        
    </SafeAreaView>
  )
}

export default TransferSuccess


const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
  },
  image: {
    position: 'absolute',
    width: "100%",
    height: "100%",
    resizeMode: "cover", 
  },
  contentContainer: {
    position:'absolute'
  },
  centerImage:{
    width: 200,
    height: 200,
    resizeMode: "cover",  
  },
  title: {
    color: "white",
    fontFamily: FONT.bold,
    fontSize: 28,
    justifyContent:'center',
    marginStart: 10,
    
  },
  subtitle: {
    color: "white",
    fontFamily: FONT.semibold,
    fontSize: 14,
    display:'flex',
    justifyContent:'center',
    alignItems: 'baseline',
    marginStart: 10,
    marginTop: 20
  },
  successContainer: {
    display:'flex',
    justifyContent:'center',
    alignItems: 'center',
    marginTop: "10%"
  }
  
  

});
