import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS, FONT} from '../../../constants';
import LinearGradient from 'react-native-linear-gradient';
import {stopFetchingDataFromWorker} from '../../../stores/websocketDataSlice';

const TopGainer = () => {
  const navigation = useNavigation();

  const THEME = useSelector(state => state.theme);
  const [positiveData, setPostiveData] = useState([]);
  const priceColor = COLORS.green;
  const tickerData = useSelector(state => state.websocket.tickerData);

  // const {allMarket} = useSelector(state => state.allMarket);
  // console.log('ALL ORG DATA :: ' + allMarket[0]?.s);
  // useEffect(() => {
  //   if (allMarket) {
  //     console.log('tickerData :: ' + allMarket[0]);
  //   }
  //   const positiveDatas = allMarket.filter(item => parseFloat(item.P) > 0);
  //   positiveDatas.sort((a, b) => parseFloat(b.P) - parseFloat(a.P));
  //   const top10PositiveData = positiveDatas.slice(0, 8);

  //   top10PositiveData.forEach(item => {
  //     item.c = parseFloat(item.c).toFixed(4);
  //     item.p = parseFloat(item.p).toFixed(3);
  //     item.P = parseFloat(item.P).toFixed(2);
  //   });

  //   setPostiveData(top10PositiveData);
  // }, []);

  useEffect(() => {
    if (tickerData) {
      console.log('tickerData :: ' + tickerData[0]);
    }
    const positiveDatas = tickerData.filter(item => parseFloat(item.P) > 0);
    positiveDatas.sort((a, b) => parseFloat(b.P) - parseFloat(a.P));
    const top10PositiveData = positiveDatas.slice(0, 8);

    top10PositiveData.forEach(item => {
      item.c = parseFloat(item.c).toFixed(4);
      item.p = parseFloat(item.p).toFixed(3);
      item.P = parseFloat(item.P).toFixed(2);
    });

    setPostiveData(top10PositiveData);
  }, [tickerData]);

  console.log('Positive length :: ' + positiveData.length);

  return (
    <View
      style={{
        backgroundColor:
          THEME.data === 'LIGHT' ? COLORS.white : COLORS.purpleDark,
        ...styles.container,
      }}>

        <ScrollView showsVerticalScrollIndicator={false}>
        {positiveData.length > 0 ? (
        positiveData.map((item, index) => (
          <TouchableOpacity
            activeOpacity={0.5}
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
              console.log('Pressed');
              stopFetchingDataFromWorker();

              console.log(index.toString());
              navigation.navigate('AssetDetails', {
                itemId: item,
                itemIndex: index.toString(),
              });
            }}>
            {/** LOGO */}

            {/** NAME */}

            <View
              style={{
                flex: 1,
              }}>
              <Text
                style={{
                  color:
                    THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                  fontFamily: FONT.extrabold,
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
                {Number.parseFloat(item.c).toFixed(2)}
                
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
                    name="caretup"
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
                  +{item.P}%
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

export default TopGainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: heightPercentageToDP(5)
  },
});

// import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// import React, {useEffect, useState} from 'react';
// import {useSelector} from 'react-redux';
// import {useNavigation} from '@react-navigation/native';

// import {heightPercentageToDP} from 'react-native-responsive-screen';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import {COLORS, FONT} from '../../../constants';
// import LinearGradient from 'react-native-linear-gradient';
// import {stopFetchingDataFromWorker} from '../../../stores/websocketDataSlice';

// const TopGainer = () => {
//   const navigation = useNavigation();

//   const THEME = useSelector(state => state.theme);
//   const [positiveData, setPostiveData] = useState([]);
//   const priceColor = COLORS.green;

//   const tickerData = useSelector(state => state.websocket.tickerData);

//   useEffect(() => {
//     if (tickerData) {
//       console.log('tickerData :: ' + tickerData[0]);
//     }
//     const positiveDatas = tickerData.filter(item => parseFloat(item.P) > 0);
//     positiveDatas.sort((a, b) => parseFloat(b.P) - parseFloat(a.P));
//     const top10PositiveData = positiveDatas.slice(0, 8);

//     top10PositiveData.forEach(item => {
//       item.c = parseFloat(item.c).toFixed(4);
//       item.p = parseFloat(item.p).toFixed(3);
//       item.P = parseFloat(item.P).toFixed(2);
//     });

//     setPostiveData(top10PositiveData);
//   }, [tickerData]);

//   console.log('Positive length :: ' + positiveData.length);

//   return (
//     <View
//       style={{
//         backgroundColor:
//           THEME.data === 'LIGHT' ? COLORS.white : COLORS.purpleDark,
//         ...styles.container,
//       }}>
//       {positiveData.map((item, index) => (
//         <TouchableOpacity
//           activeOpacity={0.5}
//           key={index.toString()}
//           style={{
//             height: heightPercentageToDP(10),
//             flexDirection: 'row',
//             alignItems: 'center',
//             justifyContent: 'center',
//             backgroundColor:
//               THEME.data === 'LIGHT' ? COLORS.lightGray : COLORS.skyBlue,
//             marginVertical: heightPercentageToDP(0.5),
//             borderRadius: heightPercentageToDP(1),
//             padding: heightPercentageToDP(1),
//             marginHorizontal: heightPercentageToDP(1),
//           }}
//           // on press
//           // onPress={() => setSelectedCoin(item)}
//           onPress={() => {
//             console.log('Pressed');
//             // stopFetchingDataFromWorker();

//             console.log(index.toString());
//             navigation.navigate('AssetDetails', {
//               itemId: item,
//               itemIndex: index.toString(),
//             });
//           }}>
//           {/** LOGO */}

//           {/**
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

//           {/** NAME */}

//           <View
//             style={{
//               flex: 1,
//             }}>
//             <Text
//               style={{
//                 color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
//                 fontFamily: FONT.extrabold,
//                 fontSize: heightPercentageToDP(2),
//               }}>
//               {item.s}
//             </Text>
//             <Text
//               style={{
//                 color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
//                 fontFamily: FONT.regular,
//                 fontSize: heightPercentageToDP(2),
//               }}>
//               {item.c}
//             </Text>
//           </View>

//           {/** FIGURES */}

//           <View>
//             <Text
//               style={{
//                 textAlign: 'right',
//                 fontSize: heightPercentageToDP(2),
//                 color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
//                 fontFamily: FONT.medium,
//               }}>
//               {item.p}
//             </Text>

//             <View
//               style={{
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 justifyContent: 'flex-end',
//               }}>
//               {item.minimum_buy_amount != 0 && (
//                 <AntDesign
//                   name="caretup"
//                   size={heightPercentageToDP(1.5)}
//                   color={priceColor}
//                   style={{alignSelf: 'center', marginRight: 5}}
//                 />
//               )}

//               <Text
//                 style={{
//                   marginLeft: 5,
//                   color: priceColor,
//                   fontFamily: FONT.regular,
//                   lineHeight: 15,
//                   padding: 2,
//                   fontSize: heightPercentageToDP(1.5),
//                   textAlignVertical: 'center',
//                   textAlign: 'center',
//                 }}>
//                 +{item.P}%
//               </Text>
//             </View>
//           </View>
//         </TouchableOpacity>
//       ))}

//       {positiveData.length > 0 ? (
//         <FlatList
//           showsVerticalScrollIndicator={false}
//           data={positiveData}
//           keyExtractor={(item, index) => index.toString()}
//           contentContainerStyle={{}}
//           renderItem={({item, index}) => {
//             return (
//               <TouchableOpacity
//                 activeOpacity={0.5}
//                 key={index.toString()}
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
//                   console.log('Pressed');
//                   // stopFetchingDataFromWorker();

//                   console.log(index.toString());
//                   navigation.navigate('AssetDetails', {
//                     itemId: item,
//                     itemIndex: index.toString(),
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
//                       fontFamily: FONT.extrabold,
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
//                         name="caretup"
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
//                       +{item.P}%
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

// export default TopGainer;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });
