import { SafeAreaView, StyleSheet, Text, View,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS,FONT } from '../../../constants'

const TopContainer = ({from, value}) => {
  return (
    <SafeAreaView style={styles.sendContainer}>
    
        <View style={styles.sendContainerLeft}>
           
        <Text style={styles.email}>Send</Text>
        <Text style={styles.name}>2,856,34</Text>
            <Image 
            source={require("../../../assets/image/bitcoin.png")}
            style={styles.centerImage}
                />
        </View>
        
        <View style={styles.sendContainerRight}> 
            
            <Image 
            source={require("../../../assets/image/round_bg.png")}
            style={styles.profileImage}
                />  
            
            <Text style={styles.tradeValue}>BTC</Text> 

            <Image 
            source={require("../../../assets/image/round_bg.png")}
            style={styles.profileImage}
                />  
            
        </View>
        


        
      
    </SafeAreaView>
  )
}

export default TopContainer

const styles = StyleSheet.create({

  sendContainer: {
    display:'flex',
    backgroundColor: COLORS.skyBlue,
    
    height:120,
    flexDirection:'row',
    justifyContent:'flex-start',
    marginTop: 15,
    marginBottom: 25,
    marginStart:10,
    marginEnd:10,
    borderWidth: 1,         
    borderColor: COLORS.skyBlue,   
    borderRadius: 5,
    
    
    
  },
  email: {
    color: "white",
    fontFamily: FONT.semibold,
    fontSize: 16,  
    
  },
  name: {
    color: "white",
    fontFamily: FONT.bold,
    fontSize: 24,
    textAlignVertical: 'center'
   
    
  },
  number: {
    color: "white",
    fontFamily: FONT.regular,
    fontSize: 16,
    opacity:0.5
       
  },

  centerImage:{
    position: "absolute",
    width: 150,
    height: "100%",
    resizeMode: "cover", 
    opacity:0.1,
    tintColor: "green",
    left:-20 
  },
  sendContainerLeft: {
    width: 150,
    flexDirection:'column',
    justifyContent:'center',
    padding:10
  },
  sendContainerRight: {
    flexDirection:'row',
    flex:1,
    justifyContent:'flex-end'
  },
  profileImage:{
    width: 50,
    height: 50,
    resizeMode: "cover",  
    tintColor: "white" ,
    alignSelf:'center'
    

  },
  tradeValue:{
    color: "white",
    fontFamily: FONT.semibold,
    fontSize: 20,
    textAlignVertical: 'center'
  }

  
  

})