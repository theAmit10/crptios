import { SafeAreaView, StyleSheet, Text, View,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS,FONT } from '../../../constants'

const TodayStatus = () => {

 

  return (
    <SafeAreaView style={styles.containerTodayStatus}>
        <TouchableOpacity >
            <Text style={styles.gainer}>Top Gainers</Text>
        </TouchableOpacity>
        <TouchableOpacity>
            <Text style={styles.loser}>Top Losers</Text> 
        </TouchableOpacity>   
    </SafeAreaView>
  )
}

export default TodayStatus

const styles = StyleSheet.create({

  containerTodayStatus: {
    display:'flex',
    backgroundColor: COLORS.skyBlue,
    
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop: 15,
    marginStart:10,
    marginEnd:10,
    lineHeight: 50,
    padding:10,
    borderWidth: 2,         
    borderRadius: 10, 
  },
  gainer: {
    color: "white",
    fontFamily: FONT.semibold,
    fontSize: 12,
    paddingBottom:5,
    paddingTop:5,
    paddingStart: 30,
    paddingEnd:30,
    backgroundColor:"green",
    borderWidth: 2,         
    borderColor: COLORS.white,   
    borderRadius: 10, 
    textAlignVertical:'center',
    textAlign:'center' ,
    opacity: 0.8
      
  },
  loser: {
    color: "white",
    fontFamily: FONT.semibold,
    fontSize: 12,
    paddingBottom:5,
    paddingTop:5,
    paddingStart: 30,
    paddingEnd:30,
    backgroundColor:"red",
    borderWidth: 2,         
    borderColor: "red",   
    borderRadius: 10, 
    textAlignVertical:'center',
    textAlign:'center'    ,
    opacity: 0.8
  },

})