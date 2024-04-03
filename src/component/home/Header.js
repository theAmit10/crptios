import { SafeAreaView, StyleSheet, Text, View,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS,FONT } from '../../../constants'
import { useNavigation } from '@react-navigation/native'

const Header = () => {

  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerLeft}>
        <Image 
            source={require("../../../assets/image/logo.png")}
            style={styles.centerImage}
          />
        <Text style={styles.title}>VRK Invest</Text>
      </View>



      <View style={styles.containerRight}>
        <TouchableOpacity style={styles.imageContainer}>
          <Image 
                source={require("../../../assets/image/round_bg.png")}
                style={styles.centerImage}
                />

          <Image 
                source={require("../../../assets/image/search_white.png")}
                style={styles.centerImageIcon}
                />
          

        </TouchableOpacity>

        <TouchableOpacity style={styles.imageContainer} onPress={navigation.navigate('NotificationTab')}>
          <Image 
                source={require("../../../assets/image/round_bg.png")}
                style={styles.centerImage}
                />
          <Image 
                source={require("../../../assets/image/notification_white.png")}
                style={styles.centerImageIcon}
                />
          

        </TouchableOpacity>

        <TouchableOpacity style={styles.imageContainer}>
          <Image 
                source={require("../../../assets/image/round_bg.png")}
                style={styles.centerImage}
                />
          <Image 
                source={require("../../../assets/image/menu_white.png")}
                style={styles.centerImageIcon}
                />
          

        </TouchableOpacity>
        
        
      </View>
      
    </SafeAreaView>
  )
}

export default Header

const styles = StyleSheet.create({

  container: {
    display:'flex',
    backgroundColor: COLORS.skyBlue,
    width:"100%",
    flexDirection:'row',
    justifyContent:'space-between',
    lineHeight: 50
  },
  title: {
    color: "white",
    fontFamily: FONT.extrabold,
    fontSize: 20,
    textAlignVertical:'center',
    alignItems: 'baseline',
    marginStart:-5,
    margin: 10,
    
  },
  centerImage:{
    width:40,
    height: 60,
    resizeMode: "cover",     
  },
  containerLeft: {
    flexDirection:'row',
  },
  containerRight: {
    flexDirection:'row',
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