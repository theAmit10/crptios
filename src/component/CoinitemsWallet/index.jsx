import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { COLORS } from '../../../constants';
import { widthPercentageToDP } from 'react-native-responsive-screen';

const CoinitemsWallet = ({ marketCoin }) => {

    const {
        name,
        current_price,
        market_cap_rank,
        price_change_percentage_24h,
        symbol,
        market_cap,
        image,

    } = marketCoin;


    const percentageColor = price_change_percentage_24h < 0 ? '#ea3943' : '#16c784';


    const normalisedMarketCap =  (markeCap) => {
        if(markeCap > 1_000_000_000_000){
            return `${Math.floor(markeCap / 1_000_000_000_000 )} T`
        } if(markeCap > 1_000_000_000){
            return `${Math.floor(markeCap / 1_000_000_000 )} B`
        } if(markeCap > 1_000_000){
            return `${Math.floor(markeCap / 1_000_000 )} M`
        } if(markeCap > 1_000){
            return `${Math.floor(markeCap / 1_000 )}K `
        }
        return markeCap;
    }

  return (
    <View style={styles.coinCointainer}>
        <Image
          source={{
            uri: image
          }}
          style={{
            height: 30,
            width: 30,
            marginRight: 10,
            alignSelf: 'center'
            
          }}
        />
        
        <View>
          <Text style={styles.title}>{name}</Text>
          <View style={{flexDirection: 'row'}}>
            
            
            <Text style={styles.text}>{symbol.toUpperCase()}</Text>
            
          </View>
        </View>

        <View style={{marginLeft: 'auto', alignItems: 'flex-end'}}> 
          <Text style={styles.title}>${current_price}</Text>
         
          <Text style={{color: percentageColor}}>{price_change_percentage_24h.toFixed(2)}% </Text> 
        </View>
      
      </View>
  )
}

export default CoinitemsWallet

const styles = StyleSheet.create({

    title: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 3
      },
      text: {
        width: widthPercentageToDP(30),
        color:"white",
        marginRight: 5,
    
      },
      coinCointainer: {
        flexDirection: 'row',
        backgroundColor: COLORS.skyBlue,
        
       
        padding: 15,
        

        marginTop: 15,
        marginStart:10,
        marginEnd:10,
       
        padding:10,
        borderWidth: 2,         
        borderRadius: 10, 
    
      },
      rank: {
        fontWeight: 'bold',
        color: 'white',
        marginRight: 5,
        
        
    
      },
      rankContainer:{
        backgroundColor: "#585858",
        paddingHorizontal: 5,
        borderRadius: 5,
        marginRight: 5
      }

})