import { SafeAreaView, StyleSheet, Text, View,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS,FONT } from '../../../constants'
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';







const ProfileContent = (props) => {

  const { image, value ,amount,itemColor  } = props;

 
   
  return (
    <TouchableOpacity style={styles.container} >

        <View style={{flexDirection: 'row'}}>


          <Text style={{textAlignVertical:'center',}} className="rounded-full bg-white p-2">
            <AntDesign name={image} size={heightPercentageToDP(3)} color={'black'} style={styles.centerImage} />
          </Text>
              
          <Text style={styles.title}>{value}</Text>
        
        
        </View>
        
        

        <Text style={{textAlignVertical:'center'}}>
             <AntDesign name='right' size={heightPercentageToDP(3)} color={'white'} style={styles.centerImage} />
        </Text>
        
        
    </TouchableOpacity>
  )
}

export default ProfileContent

const styles = StyleSheet.create({

  container: {
    display:'flex',
    backgroundColor: COLORS.skyBlue,  
    flexDirection:'row',
    justifyContent:'space-between',
    padding:10,
  },
  
 

  title: {
    color: "white",
    fontFamily: FONT.extrabold,
    fontSize: 15,
    textAlignVertical:'center',
    marginStart:10
    
    
    
  },
  
  centerImage:{
    width:40,
    height: 60,
    
        
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
  },
  

})