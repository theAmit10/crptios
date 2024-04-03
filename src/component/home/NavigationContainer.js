import { SafeAreaView, StyleSheet, Text, View,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS,FONT } from '../../../constants'
import { useNavigation } from "@react-navigation/native";



const NavigationContainer = () => {

    const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerLeft}>
        <TouchableOpacity onPress={() => navigation.navigate("TransferSuccess")} >
            <Image 
            source={require("../../../assets/image/home.png")}
            style={styles.centerImage}
            />
        
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Hcontainer")}>
            <Image 
            source={require("../../../assets/image/wallet_nav.png")}
            style={styles.centerImage}
        />
        </TouchableOpacity>
        
          
      </View>



      <View style={styles.containerRight}>
        <TouchableOpacity style={styles.imageContainer} onPress={() => navigation.navigate("Trade")}>
            <Image 
            source={require("../../../assets/image/chart.png")}
            style={styles.centerImage}
            />

        </TouchableOpacity>

        <TouchableOpacity style={styles.imageContainer} onPress={() => navigation.navigate("Profile")}>
            <Image 
            source={require("../../../assets/image/profile.png")}
            style={styles.centerImage}
            />
        </TouchableOpacity>

        
        
        
      </View>
      
    </SafeAreaView>
  )
}

export default NavigationContainer

const styles = StyleSheet.create({

  container: {
    display:'flex',
    height:70,
    backgroundColor: COLORS.skyBlue,
    width:"100%",
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginTop: 25,
    lineHeight: 50,
    paddingStart:10,
    paddingEnd:10
  },
  title: {
    color: "white",
    fontFamily: FONT.extrabold,
    fontSize: 20,
    textAlignVertical:'center',
    alignItems: 'center',
    marginStart:-5,
    margin: 10,
    
  },
  centerImage:{
    width:30,
    height: 30,
    resizeMode: "cover",   
    tintColor: 'white',  
  },
  containerLeft: {
    flexDirection:'row',
    gap:50
  },
  containerRight: {
    flexDirection:'row',
    gap:50
  },
  imageContainer: {
    position: 'relative'
  },
  centerImageIcon:{
    width:20,
    height: 20,
    resizeMode: "cover",  
    position: 'absolute',
    top: 20,
    left: 10
  }

})