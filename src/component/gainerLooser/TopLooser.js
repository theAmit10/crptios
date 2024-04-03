import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {useEffect} from 'react';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS, FONT} from '../../../constants';
import LinearGradient from 'react-native-linear-gradient';
import {ScrollView} from 'react-native';

const TopLooser = () => {
  const navigation = useNavigation();
  const THEME = useSelector(state => state.theme);
  const priceColor = COLORS.red;
  const [negativeData, setNegativeData] = useState([]);
  const tickerData = useSelector(state => state.websocket.tickerData);

  // const {allMarket} = useSelector(state => state.allMarket);
  // console.log('ALL ORG DATA :: ' + allMarket[0]?.s);

  // useEffect(() => {
  //   if (allMarket) {
  //     // Filter and add negative data to topLoserData
  //     const negativeData = allMarket.filter(item => parseFloat(item.P) < 0);

  //     // Sort negative data by the percentage change in ascending order
  //     negativeData.sort((a, b) => parseFloat(a.P) - parseFloat(b.P));

  //     // Take the top 10 items
  //     const top10NegativeData = negativeData.slice(0, 25);

  //     // Round the 'item.c' values to 2 decimal places
  //     top10NegativeData.forEach(item => {
  //       item.c = parseFloat(item.c).toFixed(2);
  //       item.p = parseFloat(item.p).toFixed(3);
  //       item.P = parseFloat(item.P).toFixed(2);
  //     });

  //     setNegativeData(top10NegativeData);
  //   }
  // }, []);

  useEffect(() => {
    if (tickerData) {
      // Filter and add negative data to topLoserData
      const negativeData = tickerData.filter(item => parseFloat(item.P) < 0);

      // Sort negative data by the percentage change in ascending order
      negativeData.sort((a, b) => parseFloat(a.P) - parseFloat(b.P));

      // Take the top 10 items
      const top10NegativeData = negativeData.slice(0, 25);

      // Round the 'item.c' values to 2 decimal places
      top10NegativeData.forEach(item => {
        item.c = parseFloat(item.c).toFixed(2);
        item.p = parseFloat(item.p).toFixed(3);
        item.P = parseFloat(item.P).toFixed(2);
      });

      setNegativeData(top10NegativeData);
    }
  }, [tickerData]);

  return (
    <View
      style={{
        backgroundColor:
          THEME.data === 'LIGHT' ? COLORS.white : COLORS.purpleDark,
        ...styles.container,
      }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {negativeData.length > 0 ? (
          negativeData.map((item, index) => (
            <TouchableOpacity
              key={index.toString()}
              style={{
                height: heightPercentageToDP(10),
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor:
                  THEME.data === 'LIGHT' ? COLORS.lightGray : COLORS.skyBlue,
                marginVertical: heightPercentageToDP(0.5),
                borderRadius: heightPercentageToDP(1),
                padding: heightPercentageToDP(1),
                marginHorizontal: heightPercentageToDP(1),
              }}
              // on press
              // onPress={() => setSelectedCoin(item)}
              onPress={() => {
                console.log(item.index);
                navigation.navigate('AssetDetails', {
                  itemId: item,
                  itemIndex: index,
                });
              }}>
              {/** LOGO */}
              {/**
                <View
                    style={{
                      width: widthPercentageToDP(15),
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        backgroundColor:
                          THEME.data === 'LIGHT'
                            ? COLORS.white
                            : COLORS.purpleDark,
                        padding: heightPercentageToDP(1),
                      }}
                      className="rounded-full ">
                      <Image
                        source={require('../../../assets/image/logo.png')}
                        style={{
                          height: 20,
                          width: 20,
                          resizeMode: 'cover',
                        }}
                      />
                    </View>
                  </View>
                */}

              {/** NAME */}

              <View
                style={{
                  flex: 1,
                }}>
                <Text
                  style={{
                    color:
                      THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                    fontFamily: FONT.bold,
                    fontSize: heightPercentageToDP(2),
                  }}>
                  {item.s}
                </Text>
                <Text
                  style={{
                    color:
                      THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                    fontFamily: FONT.regular,
                    fontSize: heightPercentageToDP(2),
                  }}>
                  {item.c}
                </Text>
              </View>

              {/** FIGURES */}

              <View>
                <Text
                  style={{
                    textAlign: 'right',
                    fontSize: heightPercentageToDP(2),
                    color:
                      THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                    fontFamily: FONT.medium,
                  }}>
                  {item.p}
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                  }}>
                  {item.minimum_buy_amount != 0 && (
                    <AntDesign
                      name="caretdown"
                      size={heightPercentageToDP(1.5)}
                      color={priceColor}
                      style={{alignSelf: 'center', marginRight: 5}}
                    />
                  )}

                  <Text
                    style={{
                      marginLeft: 5,
                      color: priceColor,
                      fontFamily: FONT.regular,
                      lineHeight: 15,
                      padding: 2,
                      fontSize: heightPercentageToDP(1.5),
                      textAlignVertical: 'center',
                      textAlign: 'center',
                    }}>
                    {item.P}%
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <LinearGradient
            colors={[
              THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.gray2,
              THEME.data === 'DARK' ? COLORS.purpleDark : COLORS.lightWhite,
            ]}
            style={{
              height: heightPercentageToDP(30),
              margin: heightPercentageToDP(2),
              borderRadius: heightPercentageToDP(2),
            }}></LinearGradient>
        )}
      </ScrollView>
    </View>
  );
};

export default TopLooser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: heightPercentageToDP(5),
  },
});

// import {
//   FlatList,
//   Image,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import React from 'react';
// import {useDispatch, useSelector} from 'react-redux';
// import {useNavigation} from '@react-navigation/native';
// import {useState} from 'react';
// import {useEffect} from 'react';
// import {
//   heightPercentageToDP,
//   widthPercentageToDP,
// } from 'react-native-responsive-screen';

// import AntDesign from 'react-native-vector-icons/AntDesign';
// import {fetchCoinMarket} from '../../../stores/coinMarketSlice';
// import {COLORS, FONT} from '../../../constants';
// import axios from 'axios';
// import {fetchTopLooserMarket} from '../../../stores/topLooserSlice';
// import LinearGradient from 'react-native-linear-gradient';
// import useWebSocket from 'react-native-use-websocket';

// const TopLooser = () => {
//   const navigation = useNavigation();
//   const THEME = useSelector(state => state.theme);

//   const [negativeData, setNegativeData] = useState([]);

//   const tickerData = useSelector(state => state.websocket.tickerData);

//   useEffect(() => {
//     if (tickerData) {
//       // Filter and add negative data to topLoserData
//       const negativeData = tickerData.filter(item => parseFloat(item.P) < 0);

//       // Sort negative data by the percentage change in ascending order
//       negativeData.sort((a, b) => parseFloat(a.P) - parseFloat(b.P));

//       // Take the top 10 items
//       const top10NegativeData = negativeData.slice(0, 25);

//       // Round the 'item.c' values to 2 decimal places
//       top10NegativeData.forEach(item => {
//         item.c = parseFloat(item.c).toFixed(2);
//         item.p = parseFloat(item.p).toFixed(3);
//         item.P = parseFloat(item.P).toFixed(2);
//       });

//       setNegativeData(top10NegativeData);
//     }
//   }, [tickerData]);

//   return (
//     <View
//       style={{
//         backgroundColor:
//           THEME.data === 'LIGHT' ? COLORS.white : COLORS.purpleDark,
//         ...styles.container,
//       }}>
//       {negativeData.length > 0 ? (
//         <FlatList
//           data={negativeData}
//           keyExtractor={(item, index) => index.toString()}
//           contentContainerStyle={{}}
//           renderItem={({item, index}) => {
//             let priceColor = COLORS.red;

//             return (
//               <TouchableOpacity
//                 style={{
//                   height: heightPercentageToDP(10),
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   backgroundColor:
//                     THEME.data === 'LIGHT' ? COLORS.lightGray : COLORS.skyBlue,
//                   marginVertical: heightPercentageToDP(0.5),
//                   borderRadius: heightPercentageToDP(1),
//                   padding: heightPercentageToDP(1),
//                   marginHorizontal: heightPercentageToDP(1),
//                 }}
//                 // on press
//                 // onPress={() => setSelectedCoin(item)}
//                 onPress={() => {
//                   console.log(item.index);
//                   navigation.navigate('AssetDetails', {
//                     itemId: item,
//                     itemIndex: index,
//                   });
//                 }}>
//                 {/** LOGO */}
//                 {/**
//               <View
//                   style={{
//                     width: widthPercentageToDP(15),
//                     alignItems: 'center',
//                   }}>
//                   <View
//                     style={{
//                       backgroundColor:
//                         THEME.data === 'LIGHT'
//                           ? COLORS.white
//                           : COLORS.purpleDark,
//                       padding: heightPercentageToDP(1),
//                     }}
//                     className="rounded-full ">
//                     <Image
//                       source={require('../../../assets/image/logo.png')}
//                       style={{
//                         height: 20,
//                         width: 20,
//                         resizeMode: 'cover',
//                       }}
//                     />
//                   </View>
//                 </View>
//               */}

//                 {/** NAME */}

//                 <View
//                   style={{
//                     flex: 1,
//                   }}>
//                   <Text
//                     style={{
//                       color:
//                         THEME.data === 'DARK'
//                           ? COLORS.white
//                           : COLORS.purpleDark,
//                       fontFamily: FONT.bold,
//                       fontSize: heightPercentageToDP(2),
//                     }}>
//                     {item.s}
//                   </Text>
//                   <Text
//                     style={{
//                       color:
//                         THEME.data === 'DARK'
//                           ? COLORS.white
//                           : COLORS.purpleDark,
//                       fontFamily: FONT.regular,
//                       fontSize: heightPercentageToDP(2),
//                     }}>
//                     {item.c}
//                   </Text>
//                 </View>

//                 {/** FIGURES */}

//                 <View>
//                   <Text
//                     style={{
//                       textAlign: 'right',
//                       fontSize: heightPercentageToDP(2),
//                       color:
//                         THEME.data === 'DARK'
//                           ? COLORS.white
//                           : COLORS.purpleDark,
//                       fontFamily: FONT.medium,
//                     }}>
//                     {item.p}
//                   </Text>

//                   <View
//                     style={{
//                       flexDirection: 'row',
//                       alignItems: 'center',
//                       justifyContent: 'flex-end',
//                     }}>
//                     {item.minimum_buy_amount != 0 && (
//                       <AntDesign
//                         name="caretdown"
//                         size={heightPercentageToDP(1.5)}
//                         color={priceColor}
//                         style={{alignSelf: 'center', marginRight: 5}}
//                       />
//                     )}

//                     <Text
//                       style={{
//                         marginLeft: 5,
//                         color: priceColor,
//                         fontFamily: FONT.regular,
//                         lineHeight: 15,
//                         padding: 2,
//                         fontSize: heightPercentageToDP(1.5),
//                         textAlignVertical: 'center',
//                         textAlign: 'center',
//                       }}>
//                       {item.P}%
//                     </Text>
//                   </View>
//                 </View>
//               </TouchableOpacity>
//             );
//           }}
//           ListFooterComponent={
//             <View
//               style={{
//                 marginBottom: 10,
//                 paddingBottom: heightPercentageToDP(10),
//               }}></View>
//           }
//         />
//       ) : (
//         <LinearGradient
//           colors={[
//             THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.gray2,
//             THEME.data === 'DARK' ? COLORS.purpleDark : COLORS.lightWhite,
//           ]}
//           style={{
//             height: heightPercentageToDP(30),
//             margin: heightPercentageToDP(2),
//             borderRadius: heightPercentageToDP(2),
//           }}></LinearGradient>
//       )}
//     </View>
//   );
// };

// export default TopLooser;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });

// import {
//   FlatList,
//   Image,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import React from 'react';
// import {useDispatch, useSelector} from 'react-redux';
// import {useNavigation} from '@react-navigation/native';
// import {useState} from 'react';
// import {useEffect} from 'react';
// import {
//   heightPercentageToDP,
//   widthPercentageToDP,
// } from 'react-native-responsive-screen';

// import AntDesign from 'react-native-vector-icons/AntDesign';
// import {fetchCoinMarket} from '../../../stores/coinMarketSlice';
// import {COLORS, FONT} from '../../../constants';
// import axios from 'axios';
// import {fetchTopLooserMarket} from '../../../stores/topLooserSlice';

// const TopLooser = () => {
//   const navigation = useNavigation();
//   const [selectedCoin, setSelectedCoin] = useState(null);
//   const THEME = useSelector(state => state.theme);

//   const dispatch = useDispatch();
//   const coins = useSelector(state => state.coinMarket.coins);
//   const topLooser = useSelector(state => state.topLooserMarket.topLooser);

//   useEffect(() => {
//     dispatch(fetchCoinMarket());
//     dispatch(fetchTopLooserMarket());
//   }, []);

//   console.log("FOR TOP lOOSER")
//   if(topLooser){
//     console.log("FOR TOP lOOSER : "+topLooser[1]?.name )
//     console.log("FOR TOP lOOSER datas : "+topLooser.length)
//   }

//   return (
//     <View
//       style={{
//         backgroundColor:
//           THEME.data === 'LIGHT' ? COLORS.white : COLORS.purpleDark,
//         ...styles.container,
//       }}>
//       <FlatList
//         data={coins}
//         keyExtractor={item => item.id}
//         contentContainerStyle={{}}
//         renderItem={({item, index}) => {
//           let priceColor =
//             item.price_change_percentage_7d_in_currency == 0
//               ? COLORS.gray
//               : item.price_change_percentage_7d_in_currency > 0
//               ? COLORS.green
//               : COLORS.red;

//           return (
//             <TouchableOpacity
//               style={{
//                 height: heightPercentageToDP(10),
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 backgroundColor:
//                   THEME.data === 'LIGHT' ? COLORS.lightGray : COLORS.skyBlue,
//                 marginVertical: heightPercentageToDP(1),
//                 borderRadius: heightPercentageToDP(1),
//                 padding: heightPercentageToDP(1),
//                 marginHorizontal: heightPercentageToDP(1),
//               }}
//               // on press
//               // onPress={() => setSelectedCoin(item)}
//               onPress={() => {
//                 console.log(item.id);
//                 navigation.navigate('AssetDetails', {
//                   itemId: item,
//                   itemIndex: index,
//                 });
//               }}>
//               {/** LOGO */}
//               <View
//                 style={{
//                   width: widthPercentageToDP(15),
//                   alignItems: 'center',
//                 }}>
//                 <View
//                   style={{
//                     backgroundColor:
//                       THEME.data === 'LIGHT' ? COLORS.white : COLORS.purpleDark,
//                     padding: heightPercentageToDP(1),
//                   }}
//                   className="rounded-full ">
//                   <Image
//                     source={{uri: item.image}}
//                     style={{
//                       height: 20,
//                       width: 20,
//                       resizeMode: 'cover',
//                     }}
//                   />
//                 </View>
//               </View>

//               {/** NAME */}

//               <View
//                 style={{
//                   flex: 1,
//                 }}>
//                 <Text
//                   style={{
//                     color:
//                       THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
//                     fontFamily: FONT.bold,
//                     fontSize: heightPercentageToDP(2),
//                   }}>
//                   {item.name}
//                 </Text>
//                 <Text
//                   style={{
//                     color:
//                       THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
//                     fontFamily: FONT.regular,
//                     fontSize: heightPercentageToDP(2),
//                   }}>
//                   {item.symbol.toUpperCase()}
//                 </Text>
//               </View>

//               {/** FIGURES */}

//               <View>
//                 <Text
//                   style={{
//                     textAlign: 'right',
//                     fontSize: heightPercentageToDP(2),
//                     color:
//                       THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
//                     fontFamily: FONT.medium,
//                   }}>
//                   $ {item.current_price.toFixed(2)}
//                 </Text>

//                 <View
//                   style={{
//                     flexDirection: 'row',
//                     alignItems: 'center',
//                     justifyContent: 'flex-end',
//                   }}>
//                   {item.price_change_percentage_7d_in_currency != 0 && (
//                     <AntDesign
//                       name={
//                         item.price_change_percentage_7d_in_currency < 0
//                           ? 'caretdown'
//                           : 'caretup'
//                       }
//                       size={heightPercentageToDP(1.5)}
//                       color={priceColor}
//                       style={{alignSelf: 'center', marginRight: 5}}
//                     />
//                   )}

//                   <Text
//                     style={{
//                       marginLeft: 5,
//                       color: priceColor,
//                       fontFamily: FONT.regular,
//                       lineHeight: 15,
//                       padding: 2,
//                       fontSize: heightPercentageToDP(1.5),
//                       textAlignVertical: 'center',
//                       textAlign: 'center',
//                     }}>
//                     {item.price_change_percentage_7d_in_currency.toFixed(2)}%
//                   </Text>
//                 </View>
//               </View>
//             </TouchableOpacity>
//           );
//         }}
//         ListFooterComponent={
//           <View
//             style={{
//               marginBottom: 10,
//               paddingBottom: heightPercentageToDP(10),
//             }}></View>
//         }
//       />
//     </View>
//   );
// };

// export default TopLooser;

// const styles = StyleSheet.create({});
