import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, Alert, Image } from "react-native";
import axios from "axios";
import { COLORS } from "../../constants";

const Transfer = () => {

  const [cryptoData, setCryptoData] = useState([]);
  const [error, setError] = useState(null);


  // useEffect(() => {
  //   const fetchCryptoData = async () => {
  //     try {
  //       const response = await axios.get(
  //         'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
  //       );
  //       setCryptoData(response.data);
  //       console.log("Data : "+response.data.name)
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   // Fetch data on component mount
  //   fetchCryptoData();

  //   // Update data every 10 seconds (adjust as needed)
  //   const interval = setInterval(fetchCryptoData, 1000);

  //   // Cleanup interval on unmount
  //   return () => clearInterval(interval);
  // }, []);

  const fetchData = async () => {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data"+response);
    }
    const data = await response.json();

    data.map((da) => {
      
      console.log("DATA : "+da.name +" || " +da.current_price);
    })

    

    setCryptoData(data);
    setError(null);
  } catch (error) {
    setError("Error fetching data. Please try again later.");
    console.error("Error fetching data:", error);
  }
};

  // useEffect(() => {
    
  //   fetchData();
  // },[] );


  setInterval( () => {
    console.log("Interval Data: ")
    fetchData();
},10000)

  

  return (
    
    <View style={styles.container}>
    <Text style={styles.header}>Crypto Price Tracker</Text>
    {error && <Text style={styles.errorText}>{error}</Text>}
    <ScrollView>
      <View style={styles.tableHeader}>
        <Text style={styles.headerText}>Name</Text>
        <Text style={styles.headerText}>Symbol</Text>
        <Text style={styles.headerText}>Price</Text>
        <Text style={styles.headerText}>Change (/H)</Text>
      </View>
      {cryptoData.map((item) => (
        <View key={item.id} style={styles.cryptoContainer}>
          <Image style={styles.coinImage} source={{ uri: item.image }} />
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.symbol}>{item.symbol}</Text>
          <Text style={styles.price}>${item.current_price.toFixed(2)}</Text>
          <Text style={styles.percentChange}>
            {item.price_change_percentage_24h.toFixed(2)} %
          </Text>
        </View>
      ))}
    </ScrollView>
  </View>
    
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.purpleDark,
    paddingTop: 40,
  },
  header: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
    color: "green",
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "red",
  },
  cryptoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  name: {
    fontSize: 18,
    color: "blue",
  },
  symbol: {
    fontSize: 18,
    color: "red",
  },
  price: {
    fontSize: 18,
    color: "orange",
  },
  percentChange: {
    fontSize: 18,
    color: "green",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
  coinImage: {
    width: 30,
    height: 30,
  },
});



export default Transfer

// import { StatusBar } from 'react-native';
// import { StyleSheet, Text, View, Image, SafeAreaView, ImageBackground, TouchableOpacity, TextInput, Button, ScrollView, VirtualizedList } from 'react-native';
// import { COLORS, SIZES, FONT, images } from '../../constants'
// import { useNavigation } from "@react-navigation/native";
// import { Colors } from 'react-native/Libraries/NewAppScreen';
// import NavigationContainer from '../component/home/NavigationContainer';
// import HeaderTop from '../component/profile/HeaderTop';


// const Transfer = () => {

//   const navigation = useNavigation();

  

//   return (
//     <SafeAreaView style={styles.container} >
//     <StatusBar style="light" hidden={false}  />
//     <HeaderTop value={"Transfer"}/>
//     <ScrollView >    
//         <View style={styles.settingContent}>
//             <View style={styles.cardDetails}>
//                 <View style={styles.cardDetailsLeft}>
//                     <Image 
//                     source={require("../../assets/image/round_bg.png")}
//                     style={styles.centerImage}
//                     />
//                     <View style={styles.cardDetailsLeftRight}>
//                         <Text style={styles.cardDetailText}>Mastercard Dabit</Text>
//                         <Text style={styles.cardDetailTextCard}>*****4581</Text>
//                     </View>
                    

//                 </View>
//                 <View style={styles.cardDetailsRight}>
//                     <Text style={styles.cardDetailText}>$20,360.34</Text>
//                 </View>
                
//             </View>


//             <View style={styles.cardPaymentConatainer}>
//                     <Text style={styles.cardPaymentConatainerText}>How much ?</Text>
//                     <TextInput style={styles.cardPaymentConatainerEditText} placeholder='$ 300,3000' placeholderTextColor="gray" inputMode='decimal'></TextInput>    
//             </View>
          
         
        
        
          
        
//         </View>
//     </ScrollView>

//     <View style={styles.bottonContainer}>
//         <Text style={styles.next} onPress={() => navigation.navigate("Login")} >Continue</Text>
//     </View>

//     <NavigationContainer/>
        
        
//     </SafeAreaView>
//   )
// }

// export default Transfer


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     position: 'relative',
//     backgroundColor: COLORS.purpleDark,
    
//   },
//   settingContent:{
//     marginTop:25,
    
//   },
//   cardDetails: {
//     backgroundColor: COLORS.skyBlue,
//     padding: 10,
//     flexDirection: 'row',
//     justifyContent:'space-between'
//   },
//   cardDetailText: {
//     color: COLORS.white,
//     fontFamily: FONT.semibold,
//     fontSize: 14,
//     justifyContent:'center',
//     alignItems: 'baseline',  
//   },
//   cardDetailTextCard :{
//     color: COLORS.white,
//     fontFamily: FONT.semibold,
//     fontSize: 12,
//     justifyContent:'center',
//     alignItems: 'baseline', 
//     opacity: 0.5
//   },
//   cardDetailsLeft: {
//     flexDirection: 'row',
//     gap:10,
//     alignItems: 'center' 

//   },
//   cardDetailsRight: {
//     justifyContent: 'center' 

//   },
//   centerImage:{
//     width:40,
//     height: 60,
//     resizeMode: "cover",     
//   },
//   cardPaymentConatainer: {
//     marginTop: 20,
//     padding: 10,
//     flexDirection: 'column',
//     justifyContent:'center',
//     alignItems: 'stretch',


//   },
//   cardPaymentConatainerText: {
//     color: COLORS.white,
//     fontFamily: FONT.bold,
//     fontSize: 20,
//     justifyContent:'center',
//     alignSelf:'center',
//     padding: 10,

//   },
//   cardPaymentConatainerEditText:{
//     color: COLORS.white,
//     fontFamily: FONT.bold,
//     fontSize: 14,
    
//     padding: 10,
//     textAlign:'center',
//     borderWidth:2,
//     borderColor: COLORS.skyBlue,
//     borderRadius:10
//   }
//   ,
//   bottonContainer: {
//     position: 'absolute',
//     width: "100%",
//     flexDirection: 'row',
//     alignItems:'flex-end',
//     padding: 20,
//     marginTop: 10,
//     bottom: 80
    

//   },
//   next: {
//     color: "white",
//     width: "100%",
//     fontFamily: FONT.semibold,
//     backgroundColor: COLORS.green,
//     borderBottomColor:COLORS.green,
//     fontSize:14,
//     padding: 12,
//     borderRadius: 5,
//     textAlign:'center'
//   },
  
  
  

// });
