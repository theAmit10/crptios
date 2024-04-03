import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, { memo, useMemo, useState } from 'react';
import { COLORS, FONT } from '../../../constants';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { LineChart } from 'react-native-chart-kit';
import { useDispatch, useSelector } from 'react-redux';
import Helper from '../../../utils/Helper';
import Loading from '../Loading';
import LinearGradient from 'react-native-linear-gradient';
import Fontisto from 'react-native-vector-icons/Fontisto';


const Chart = ({ chartData }) => {
  const allprofit = chartData;
  const THEME = useSelector(state => state.theme);
  console.log('MY INR :: ' + allprofit?.inr_wallet_balance);
  const [selectedRange, setSelectedRange] = useState('allprevious');
  const [selectedTime, setSelectedTime] = useState('all');

  const myFilter = () => {
    console.log("CHECKING START")
    const currentDate = new Date();
    let filterMine = []
    if (allprofit.inr_wallet_history.length !== 0) {
      console.log("FOUND IF  :: " + allprofit.inr_wallet_history.length)

      filterMine = allprofit?.inr_wallet_history?.filter(item => {
        const itemDate = new Date(item.date);

        switch (selectedRange) {
          case 'oneday':
            // const val = itemDate.toDateString() === currentDate.toDateString();
            return itemDate.toDateString() === currentDate.toDateString();
          case 'oneweek':
            const oneWeekAgo = new Date(currentDate);
            oneWeekAgo.setDate(currentDate.getDate() - 7);
            return itemDate >= oneWeekAgo;
          case 'onemonth':
            const oneMonthAgo = new Date(currentDate);
            oneMonthAgo.setMonth(currentDate.getMonth() - 1);
            return itemDate >= oneMonthAgo;
          case 'oneyear':
            const oneYearAgo = new Date(currentDate);
            oneYearAgo.setFullYear(currentDate.getFullYear() - 1);
            return itemDate >= oneYearAgo;
          case 'allprevious':
            return [];
          default:
            return [];
        }
      });

      // Handle special case for oneday with no data
      if (selectedRange === 'oneday' && filterMine.length === 0) {
        return [
          {
            amount: '0',
            date: currentDate, // Adjust this according to your date format
          },
        ];
      }

      // Handle special case for oneweek with no data
      if (selectedRange === 'oneweek' && filterMine.length === 0) {
        return [
          {
            amount: '0',
            date: currentDate, // Adjust this according to your date format
          },
        ];
      }


    } else {
      console.log("FOUND ELSE :: " + allprofit.inr_wallet_history.length)
    }

    console.log("CHECKING END")
    return filterMine;
  }


  const filterData = () => {
    console.log('Started Filtering ... ');
    const currentDate = new Date();
    console.log('LENGTH : ' + allprofit.inr_wallet_history.length)

    let filteredData = []

    if (allprofit.inr_wallet_history.length !== 0) {
      console.log('INSIDE FILter: ' + allprofit.inr_wallet_history.length)
      filteredData = allprofit?.inr_wallet_history.filter(item => {
        const itemDate = new Date(item.date);

        switch (selectedRange) {
          case 'oneday':
            // const val = itemDate.toDateString() === currentDate.toDateString();
            return itemDate.toDateString() === currentDate.toDateString();
          case 'oneweek':
            const oneWeekAgo = new Date(currentDate);
            oneWeekAgo.setDate(currentDate.getDate() - 7);
            return itemDate >= oneWeekAgo;
          case 'onemonth':
            const oneMonthAgo = new Date(currentDate);
            oneMonthAgo.setMonth(currentDate.getMonth() - 1);
            return itemDate >= oneMonthAgo;
          case 'oneyear':
            const oneYearAgo = new Date(currentDate);
            oneYearAgo.setFullYear(currentDate.getFullYear() - 1);
            return itemDate >= oneYearAgo;
          case 'allprevious':
            return true;
          default:
            return true;
        }
      });

      // Handle special case for oneday with no data
      if (selectedRange === 'oneday' && filteredData?.length === 0) {
        return [
          {
            amount: '0',
            date: currentDate, // Adjust this according to your date format
          },
        ];
      }

      // Handle special case for oneweek with no data
      if (selectedRange === 'oneweek' && filteredData?.length === 0) {
        return [
          {
            amount: '0',
            date: currentDate, // Adjust this according to your date format
          },
        ];
      }
    }


    console.log('LENGTH filteredData : ' + filteredData.length)
    return filteredData;
  };

  const allYear = () => {
    setSelectedRange('allprevious');
    setSelectedTime('all');
    myZone();
  };

  const oneYear = () => {
    setSelectedRange('oneyear');
    setSelectedTime('oneyear');
    myZone();
  };

  const oneDay = () => {
    setSelectedRange('oneday');
    setSelectedTime('oneday');
    myZone();
  };

  const oneWeek = () => {
    setSelectedRange('oneweek');
    setSelectedTime('oneweek');
    myZone();
  };

  const oneMonth = () => {
    setSelectedRange('onemonth');
    setSelectedTime('onemonth');
    myZone();
  };

  const myZone = () => {
    // filterData();
    console.log("Go : " + memoizedFilteredData)
  };

  // if (allprofit.inr_wallet_history.length === 0) {

  //   const mData = useMemo(() => {
  //     return myFilter();
  //   }, [myFilter()]);


  //   console.log("mData -> " + mData.length)


  //   return (
  //     <LinearGradient
  //       colors={[
  //         THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.gray2,
  //         THEME.data === 'DARK' ? COLORS.purpleDark : COLORS.lightWhite,
  //       ]}
  //       style={{
  //         height: heightPercentageToDP(30),
  //         margin: heightPercentageToDP(2),
  //         borderRadius: heightPercentageToDP(2),
  //       }}>
  //       <Text style={{ textAlign: 'center' }}>No Chart Found</Text>
  //       <Loading />
  //     </LinearGradient>
  //   );
  // }



  const memoizedFilteredData = useMemo(() => {
    return filterData();
  }, [filterData()]);

  console.log("memoizedFilteredData :: " + memoizedFilteredData.length)


  if (allprofit) {
    console.log("INSIDE FILTER")
    const data = {


      datasets: [
        {
          // data: memoizedFilteredData?.map(item => parseFloat(item?.amount)),
          data: memoizedFilteredData.length === 1 ? [0, memoizedFilteredData[0].amount] : memoizedFilteredData?.map(item => parseFloat(item?.amount))
        },
      ],
    };

    return (
      <SafeAreaView
        style={{
          backgroundColor:
            THEME.data === 'LIGHT' ? COLORS.lightGray : COLORS.skyBlue,
          ...styles.container,
        }}>
        <Image
          source={require('../../../assets/image/bitcoin_image.jpg')}
          style={styles.centerImage}
        />
        <View style={styles.containerTop}>
          <Text
            style={{
              color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
              ...styles.totalBal,
              textAlign: 'center',
            }}>
            Total Balance
          </Text>
          <Text
            style={{
              color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
              ...styles.totalBalAmount,
            }}>
            {Helper.INR_SYMBOL +
              Number.parseFloat(allprofit?.inr_wallet_balance).toFixed(2)}
          </Text>
        </View>
        
        <Text
          style={{
            color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
            backgroundColor:
              THEME.data === 'DARK' ? COLORS.purpleDark : COLORS.white,
            borderColor:
              THEME.data === 'DARK' ? COLORS.purpleDark : COLORS.lightGray,
            ...styles.totalVal,
            overflow: "hidden"
            
          }}>
          USDT: {Number.parseFloat(allprofit.usdt_wallet_balance).toFixed(2)}
        </Text>

       
        

        <View style={styles.chart}>
          {

            memoizedFilteredData.length != 0 ? (<LineChart
              data={data}
              width={Dimensions.get('window').width}
              height={heightPercentageToDP(30)}
              yAxisLabel="$"
              yAxisSuffix="k"
              yAxisInterval={1}
              chartConfig={{
                backgroundGradientFrom:
                  THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.lightGray,
                backgroundGradientTo:
                  THEME.data === 'DARK' ? COLORS.purple : COLORS.lightGray,
                decimalPlaces: 2,

                color: (opacity = 1) => `rgba(255, 0, 0, 1)`, // Set opacity to 1 (fully opaque)

                labelColor: (opacity = 0) => `rgba(255, 255, 255, 0)`, // Set opacity to 0 (fully transparent)
                style: {
                  borderRadius: 2,
                },
              }}
              bezier
              style={{
                marginTop: heightPercentageToDP(10),
                borderRadius: 16,
                paddingRight: 0,
              }}
              withShadow
              withHorizontalLines={false}
              withDots={false}
              withInnerLines={false}
              withOuterLines={false}
              withVerticalLabels={false} // Remove vertical labels
              withHorizontalLabels={false} // Remove horizontal labels
              withVerticalLines={false}
              fromZero={true}
            />) : (<LinearGradient
              colors={[
                THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.gray2,
                THEME.data === 'DARK' ? COLORS.purpleDark : COLORS.lightWhite,
              ]}
              style={{
                width: widthPercentageToDP(100), height: heightPercentageToDP(30),
                borderRadius: heightPercentageToDP(2),
                justifyContent: 'center', alignItems: 'center',

              }}>


              <Text style={{ fontFamily: FONT.bold, marginTop: heightPercentageToDP(10) }}>No Graph Available</Text>
              <Fontisto
                name="heartbeat-alt"
                size={heightPercentageToDP(4)}
                color={COLORS.green}
                style={{ alignSelf: 'center' }}
              />
            </LinearGradient>)
          }

        </View>

        <View style={styles.containerBottom}>
          <TouchableOpacity onPress={oneDay}>
            <Text
              style={{
                color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                backgroundColor:
                  THEME.data === 'DARK' ? COLORS.purple : COLORS.white,
                borderColor:
                  selectedTime == 'oneday'
                    ? COLORS.green
                    : THEME.data === 'DARK'
                      ? COLORS.purpleDark
                      : COLORS.lightGray,
                ...styles.bottomContainerContent,
              }}>
              1D
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={oneWeek}>
            <Text
              style={{
                color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                backgroundColor:
                  THEME.data === 'DARK' ? COLORS.purple : COLORS.white,
                borderColor:
                  selectedTime == 'oneweek'
                    ? COLORS.green
                    : THEME.data === 'DARK'
                      ? COLORS.purpleDark
                      : COLORS.lightGray,
                ...styles.bottomContainerContent,
              }}>
              1W
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={oneMonth}>
            <Text
              style={{
                color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                backgroundColor:
                  THEME.data === 'DARK' ? COLORS.purple : COLORS.white,
                borderColor:
                  selectedTime == 'onemonth'
                    ? COLORS.green
                    : THEME.data === 'DARK'
                      ? COLORS.purpleDark
                      : COLORS.lightGray,
                ...styles.bottomContainerContent,
              }}>
              1M
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={oneYear}>
            <Text
              style={{
                color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                backgroundColor:
                  THEME.data === 'DARK' ? COLORS.purple : COLORS.white,

                ...styles.bottomContainerContent,
                borderColor:
                  selectedTime == 'oneyear'
                    ? COLORS.green
                    : THEME.data === 'DARK'
                      ? COLORS.purpleDark
                      : COLORS.lightGray,
              }}>
              1Y
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={allYear}>
            <Text
              style={{
                color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                backgroundColor:
                  THEME.data === 'DARK' ? COLORS.purple : COLORS.white,
                borderColor:
                  selectedTime == 'all'
                    ? COLORS.green
                    : THEME.data === 'DARK'
                      ? COLORS.purpleDark
                      : COLORS.lightGray,
                ...styles.bottomContainerContent,
              }}>
              All
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <LinearGradient
        colors={[
          THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.gray2,
          THEME.data === 'DARK' ? COLORS.purpleDark : COLORS.lightWhite,
        ]}
        style={{
          height: heightPercentageToDP(30),
          margin: heightPercentageToDP(2),
          borderRadius: heightPercentageToDP(2),
        }}>
        <Loading />
      </LinearGradient>
    );
  }
};

export default memo(Chart);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginTop: heightPercentageToDP(2),
  },

  container: {
    display: 'flex',
    position: 'relative',
    width: '100%',
    height: heightPercentageToDP(40),
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: heightPercentageToDP(3),
  },
  totalBal: {
    fontFamily: FONT.medium,
    fontSize: heightPercentageToDP(2),
    margin: 10,
    marginTop: 10,
  },
  totalBalAmount: {
    fontFamily: FONT.medium,
    fontSize: heightPercentageToDP(3),
    textAlign: 'center'
  },
  totalVal: {
    fontFamily: FONT.regular,
    fontSize: heightPercentageToDP(1.6),
    paddingStart: 30,
    paddingBottom: 10,
    paddingTop: 10,
    paddingStart: 20,
    paddingEnd: 20,

    borderWidth: 2,

    borderRadius: 20,
  },

  centerImage: {
    position: 'absolute',
    left: -40,
    width: '50%',
    height: '100%',
    resizeMode: 'cover',
    opacity: 0.1,
  },
  containerBottom: {
    flexDirection: 'row',
    position: 'absolute',
    alignItems: 'center',
    bottom: heightPercentageToDP(1),
    justifyContent: 'space-evenly',
    gap: heightPercentageToDP(1),
  },
  bottomContainerContent: {
    fontFamily: FONT.medium,
    fontSize: heightPercentageToDP(1.6),
    paddingBottom: heightPercentageToDP(0.5),
    paddingTop: heightPercentageToDP(0.5),
    paddingHorizontal: heightPercentageToDP(2),
    borderWidth: 2,
    borderRadius: heightPercentageToDP(1),
    overflow: "hidden"
  },
  chart: {
    position: 'absolute',
    zIndex: -1,
    left: 0,
  },
  chartIndicatorStatus: {
    position: 'absolute',
    width: widthPercentageToDP(30),
    color: COLORS.purpleDark,
    fontFamily: FONT.semibold,
    fontSize: heightPercentageToDP(2),
    zIndex: 99,

    paddingBottom: 10,
    paddingTop: 10,
    paddingStart: 20,

    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.skyBlue,
    borderRadius: 20,
  },
});



// import {
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   TouchableOpacity,
//   Dimensions,
// } from 'react-native';
// import React, { memo, useEffect, useMemo, useState } from 'react';
// import { COLORS, FONT } from '../../../constants';
// import {
//   heightPercentageToDP,
//   widthPercentageToDP,
// } from 'react-native-responsive-screen';
// import { LineChart } from 'react-native-chart-kit';
// import { useDispatch, useSelector } from 'react-redux';

// import Helper from '../../../utils/Helper';
// import Loading from '../Loading';
// import LinearGradient from 'react-native-linear-gradient';
// import { all } from 'axios';

// const Chart = ({ chartData }) => {
//   console.log('MY :: ' + chartData?.inr_wallet_balance);
//   const allprofit = chartData;
//   console.log('MY INR :: ' + allprofit?.inr_wallet_balance);
//   const THEME = useSelector(state => state.theme);

//   const [selectedRange, setSelectedRange] = useState('allprevious');
//   const [selectedTime, setSelectedTime] = useState('all');

//   // const [mineData, setMineData] = useState(allprofit);

//   if (allprofit.inr_wallet_history.length === 0) {
//     return (
//       <View>
//         <Text>No chart found</Text>
//       </View>
//     );
//   }

//   const dispatch = useDispatch();

//   // useEffect(() => {
//   //   // dispatch(getMyProfit(ACCESS_TOKEN.data));

//   //   console.log("Started CHART")
//   //   console.log("GOO mineData :: "+mineData.inr_wallet_balance)

//   //   changeTimeFrame()



//   // }, []);


//   // const filterData = () => {
//   //   console.log('Started Filtering Chart... ');
//   //   try {


//   //     const currentDate = new Date();
//   //     let filteredData = []

//   //     console.log("FBD : " + allprofit?.inr_wallet_history.length)
//   //     // console.log("FBD filteredData : " + filteredData.length)

//   //     if (allprofit?.inr_wallet_history?.length != 0) {
//   //       console.log("FBD filteredData : " + filteredData.length)

//   //       filteredData = allprofit?.inr_wallet_history?.filter(item => {
//   //         const itemDate = new Date(item.date);

//   //         switch (selectedRange) {
//   //           case 'oneday':
//   //             return itemDate.toDateString() === currentDate.toDateString();
//   //           case 'oneweek':
//   //             const oneWeekAgo = new Date(currentDate);
//   //             oneWeekAgo.setDate(currentDate.getDate() - 7);
//   //             return itemDate >= oneWeekAgo;
//   //           case 'onemonth':
//   //             const oneMonthAgo = new Date(currentDate);
//   //             oneMonthAgo.setMonth(currentDate.getMonth() - 1);
//   //             return itemDate >= oneMonthAgo;
//   //           case 'oneyear':
//   //             const oneYearAgo = new Date(currentDate);
//   //             oneYearAgo.setFullYear(currentDate.getFullYear() - 1);
//   //             return itemDate >= oneYearAgo;
//   //           case 'allprevious':
//   //             return true;
//   //           default:
//   //             return true;
//   //         }
//   //       });

//   //     }



//   //     // Handle special case for oneday with no data
//   //     if (selectedRange === 'oneday' && filteredData?.length === 0) {
//   //       return [
//   //         {
//   //           amount: '0',
//   //           date: currentDate, // Adjust this according to your date format
//   //         },
//   //       ];
//   //     }

//   //     // Handle special case for oneweek with no data
//   //     if (selectedRange === 'oneweek' && filteredData?.length === 0) {
//   //       return [
//   //         {
//   //           amount: '0',
//   //           date: currentDate, // Adjust this according to your date format
//   //         },
//   //       ];
//   //     }



//   //     return filteredData;
//   //   } catch (error) {
//   //     console.log('filterdata error :: ' + error)
//   //     return [];
//   //   }
//   // };



//   const filterData = () => {
//     console.log('Started Filtering ... ');
//     const currentDate = new Date();
//     console.log('LENGTH : ' + allprofit.inr_wallet_history.length)

//     let filteredData = []

//     if (allprofit.inr_wallet_history.length != 0) {
//       console.log('INSIDE FILter: ' + allprofit.inr_wallet_history.length)
//       filteredData = allprofit?.inr_wallet_history.filter(item => {
//         const itemDate = new Date(item.date);

//         switch (selectedRange) {
//           case 'oneday':
//             // const val = itemDate.toDateString() === currentDate.toDateString();
//             return itemDate.toDateString() === currentDate.toDateString();
//           case 'oneweek':
//             const oneWeekAgo = new Date(currentDate);
//             oneWeekAgo.setDate(currentDate.getDate() - 7);
//             return itemDate >= oneWeekAgo;
//           case 'onemonth':
//             const oneMonthAgo = new Date(currentDate);
//             oneMonthAgo.setMonth(currentDate.getMonth() - 1);
//             return itemDate >= oneMonthAgo;
//           case 'oneyear':
//             const oneYearAgo = new Date(currentDate);
//             oneYearAgo.setFullYear(currentDate.getFullYear() - 1);
//             return itemDate >= oneYearAgo;
//           case 'allprevious':
//             return true;
//           default:
//             return true;
//         }
//       });

//       // Handle special case for oneday with no data
//       if (selectedRange === 'oneday' && filteredData?.length === 0) {
//         return [
//           {
//             amount: '0',
//             date: currentDate, // Adjust this according to your date format
//           },
//         ];
//       }

//       // Handle special case for oneweek with no data
//       if (selectedRange === 'oneweek' && filteredData?.length === 0) {
//         return [
//           {
//             amount: '0',
//             date: currentDate, // Adjust this according to your date format
//           },
//         ];
//       }
//     }


//     console.log('LENGTH filteredData : ' + filteredData.length)
//     return filteredData;
//   };

//   const allYear = () => {
//     setSelectedRange('allprevious');
//     setSelectedTime('all');
//     myZone();
//   };

//   const oneYear = () => {
//     setSelectedRange('oneyear');
//     setSelectedTime('oneyear');
//     myZone();
//   };

//   const oneDay = () => {
//     setSelectedRange('oneday');
//     setSelectedTime('oneday');
//     myZone();
//   };

//   const oneWeek = () => {
//     setSelectedRange('oneweek');
//     setSelectedTime('oneweek');
//     myZone();
//   };

//   const oneMonth = () => {
//     setSelectedRange('onemonth');
//     setSelectedTime('onemonth');
//     myZone();
//   };

//   const myZone = () => {
//     // filterData();
//     console.log("Go : " + memoizedFilteredData)
//   };

//   // changing one formate of an array to another formate
//   // const newArray = allprofit.inr_wallet_history.map(item => parseFloat(item.amount));
//   // console.log('Chart Data  :: ' + chartPrices);

//   // const filteredData = useMemo(() => {
//   //   // Your filtering logic here
//   //   // For example, let's say you're filtering out items with a specific condition
//   //   return data.filter(item => item.someCondition);
//   // }, [data]); // Dependency array - recompute when 'data' changes

//   const memoizedFilteredData = useMemo(() => {
//     return filterData();
//   }, [filterData()]);

//   // if (memoizedFilteredData.inr_wallet_history.length === 0) {
//   //   return (
//   //     <View>
//   //       <Text>No chart found</Text>
//   //     </View>
//   //   );
//   // }



//   if (memoizedFilteredData.length != 0) {
//     console.log("INSIDE FILTER")
//     const data = {
//       // labels: filterData()?.map((item, index) => index + 1),
//       datasets: [
//         {
//           data: memoizedFilteredData?.map(item => parseFloat(item?.amount)),
//         },
//       ],
//     };

//     // const data = {
//     //   // labels: filterData()?.map((item, index) => index + 1),
//     //   datasets: [
//     //     {
//     //       data: filterData()?.map(item => parseFloat(item?.amount)),
//     //     },
//     //   ],
//     // };




//     // const data = () => {
//     //   const datas = {
//     //     datasets: [
//     //       {
//     //         data: dataCD()
//     //       },
//     //     ],
//     //   };
//     //   return datas;
//     // }

//     // const dataCD = () => {
//     //   const datas = filterData()?.map(item => parseFloat(item?.amount))
//     //   return datas;
//     // }



//     // const data = {
//     //   labels: filterData()?.map((item, index) => index + 1),
//     //   datasets: [
//     //     {
//     //       data: filterData()?.map(item => parseFloat(item?.amount)),
//     //     },
//     //   ],
//     // };

//     // const data = {
//     //   labels: allprofit.inr_wallet_history?.map((item, index) => index + 1),
//     //   datasets: [
//     //     {
//     //       data: allprofit.inr_wallet_history?.map(item =>
//     //         parseFloat(item?.amount),
//     //       ),
//     //     },
//     //   ],
//     // };
//     return (
//       <SafeAreaView
//         style={{
//           backgroundColor:
//             THEME.data === 'LIGHT' ? COLORS.lightGray : COLORS.skyBlue,
//           ...styles.container,
//         }}>
//         <Image
//           source={require('../../../assets/image/bitcoin_image.jpg')}
//           style={styles.centerImage}
//         />
//         <View style={styles.containerTop}>
//           <Text
//             style={{
//               color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
//               ...styles.totalBal,
//               textAlign: 'center',
//             }}>
//             Total Balance
//           </Text>
//           <Text
//             style={{
//               color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
//               ...styles.totalBalAmount,
//             }}>
//             {Helper.INR_SYMBOL +
//               Number.parseFloat(allprofit?.inr_wallet_balance).toFixed(2)}
//           </Text>
//         </View>
//         <Text
//           style={{
//             color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
//             backgroundColor:
//               THEME.data === 'DARK' ? COLORS.purpleDark : COLORS.white,
//             borderColor:
//               THEME.data === 'DARK' ? COLORS.purpleDark : COLORS.lightGray,
//             ...styles.totalVal,
//           }}>
//           USDT: {Number.parseFloat(allprofit.usdt_wallet_balance).toFixed(2)}
//         </Text>

//         <View style={styles.chart}>
//           {

//             allprofit.inr_wallet_history != 0 ? (<LineChart
//               data={data}
//               width={Dimensions.get('window').width}
//               height={heightPercentageToDP(30)}
//               yAxisLabel="$"
//               yAxisSuffix="k"
//               yAxisInterval={1}
//               chartConfig={{
//                 backgroundGradientFrom:
//                   THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.lightGray,
//                 backgroundGradientTo:
//                   THEME.data === 'DARK' ? COLORS.purple : COLORS.lightGray,
//                 decimalPlaces: 2,

//                 color: (opacity = 1) => `rgba(255, 0, 0, 1)`, // Set opacity to 1 (fully opaque)

//                 labelColor: (opacity = 0) => `rgba(255, 255, 255, 0)`, // Set opacity to 0 (fully transparent)
//                 style: {
//                   borderRadius: 2,
//                 },
//               }}
//               bezier
//               style={{
//                 marginTop: heightPercentageToDP(10),
//                 borderRadius: 16,
//                 paddingRight: 0,
//               }}
//               withShadow
//               withHorizontalLines={false}
//               withDots={false}
//               withInnerLines={false}
//               withOuterLines={false}
//               withVerticalLabels={false} // Remove vertical labels
//               withHorizontalLabels={false} // Remove horizontal labels
//               withVerticalLines={false}
//               fromZero={true}
//             />) : (<View style={{ height: heightPercentageToDP(30), width: widthPercentageToDP(100) }}>
//               <Text style={{ flex: 1, justifyContent: 'center', textAlign: 'center', alignItems: 'center', textAlignVertical: 'center' }}>No Graph Availble</Text>
//             </View>)
//           }

//         </View>

//         <View style={styles.containerBottom}>
//           <TouchableOpacity onPress={oneDay}>
//             <Text
//               style={{
//                 color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
//                 backgroundColor:
//                   THEME.data === 'DARK' ? COLORS.purple : COLORS.white,
//                 borderColor:
//                   selectedTime == 'oneday'
//                     ? COLORS.green
//                     : THEME.data === 'DARK'
//                       ? COLORS.purpleDark
//                       : COLORS.lightGray,
//                 ...styles.bottomContainerContent,
//               }}>
//               1D
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={oneWeek}>
//             <Text
//               style={{
//                 color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
//                 backgroundColor:
//                   THEME.data === 'DARK' ? COLORS.purple : COLORS.white,
//                 borderColor:
//                   selectedTime == 'oneweek'
//                     ? COLORS.green
//                     : THEME.data === 'DARK'
//                       ? COLORS.purpleDark
//                       : COLORS.lightGray,
//                 ...styles.bottomContainerContent,
//               }}>
//               1W
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={oneMonth}>
//             <Text
//               style={{
//                 color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
//                 backgroundColor:
//                   THEME.data === 'DARK' ? COLORS.purple : COLORS.white,
//                 borderColor:
//                   selectedTime == 'onemonth'
//                     ? COLORS.green
//                     : THEME.data === 'DARK'
//                       ? COLORS.purpleDark
//                       : COLORS.lightGray,
//                 ...styles.bottomContainerContent,
//               }}>
//               1M
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={oneYear}>
//             <Text
//               style={{
//                 color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
//                 backgroundColor:
//                   THEME.data === 'DARK' ? COLORS.purple : COLORS.white,

//                 ...styles.bottomContainerContent,
//                 borderColor:
//                   selectedTime == 'oneyear'
//                     ? COLORS.green
//                     : THEME.data === 'DARK'
//                       ? COLORS.purpleDark
//                       : COLORS.lightGray,
//               }}>
//               1Y
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={allYear}>
//             <Text
//               style={{
//                 color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
//                 backgroundColor:
//                   THEME.data === 'DARK' ? COLORS.purple : COLORS.white,
//                 borderColor:
//                   selectedTime == 'all'
//                     ? COLORS.green
//                     : THEME.data === 'DARK'
//                       ? COLORS.purpleDark
//                       : COLORS.lightGray,
//                 ...styles.bottomContainerContent,
//               }}>
//               All
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </SafeAreaView>
//     );
//   } else {
//     return (
//       <LinearGradient
//         colors={[
//           THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.gray2,
//           THEME.data === 'DARK' ? COLORS.purpleDark : COLORS.lightWhite,
//         ]}
//         style={{
//           height: heightPercentageToDP(30),
//           margin: heightPercentageToDP(2),
//           borderRadius: heightPercentageToDP(2),
//         }}>
//         <Loading />
//       </LinearGradient>
//     );
//   }
// };

// export default memo(Chart);

// const styles = StyleSheet.create({
//   mainContainer: {
//     flex: 1,
//     marginTop: heightPercentageToDP(2),
//   },

//   container: {
//     display: 'flex',
//     position: 'relative',
//     width: '100%',
//     height: heightPercentageToDP(40),
//     flexDirection: 'column',
//     justifyContent: 'flex-start',
//     alignItems: 'center',
//     marginTop: heightPercentageToDP(3),
//   },
//   totalBal: {
//     fontFamily: FONT.medium,
//     fontSize: heightPercentageToDP(2),
//     margin: 10,
//     marginTop: 10,
//   },
//   totalBalAmount: {
//     fontFamily: FONT.medium,
//     fontSize: heightPercentageToDP(3),
//   },
//   totalVal: {
//     fontFamily: FONT.regular,
//     fontSize: heightPercentageToDP(1.6),
//     paddingStart: 30,
//     paddingBottom: 10,
//     paddingTop: 10,
//     paddingStart: 20,
//     paddingEnd: 20,

//     borderWidth: 2,

//     borderRadius: 20,
//   },

//   centerImage: {
//     position: 'absolute',
//     left: -40,
//     width: '50%',
//     height: '100%',
//     resizeMode: 'cover',
//     opacity: 0.1,
//   },
//   containerBottom: {
//     flexDirection: 'row',
//     position: 'absolute',
//     alignItems: 'center',
//     bottom: heightPercentageToDP(1),
//     justifyContent: 'space-evenly',
//     gap: heightPercentageToDP(1),
//   },
//   bottomContainerContent: {
//     fontFamily: FONT.medium,
//     fontSize: heightPercentageToDP(1.6),
//     paddingBottom: heightPercentageToDP(0.5),
//     paddingTop: heightPercentageToDP(0.5),
//     paddingHorizontal: heightPercentageToDP(2),
//     borderWidth: 2,
//     borderRadius: heightPercentageToDP(1),
//   },
//   chart: {
//     position: 'absolute',
//     zIndex: -1,
//     left: 0,
//   },
//   chartIndicatorStatus: {
//     position: 'absolute',
//     width: widthPercentageToDP(30),
//     color: COLORS.purpleDark,
//     fontFamily: FONT.semibold,
//     fontSize: heightPercentageToDP(2),
//     zIndex: 99,

//     paddingBottom: 10,
//     paddingTop: 10,
//     paddingStart: 20,

//     backgroundColor: COLORS.white,
//     borderWidth: 2,
//     borderColor: COLORS.skyBlue,
//     borderRadius: 20,
//   },
// });
