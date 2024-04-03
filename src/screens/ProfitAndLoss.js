import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Image,
} from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { COLORS, FONT } from '../../constants';
import HeaderTop from '../component/profile/HeaderTop';
import PLAssetAllocation from '../component/profitAndLoss/PLAssetAllocation';
import { useDispatch, useSelector } from 'react-redux';
import { LineChart, BarChart } from 'react-native-chart-kit';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Helper from '../../utils/Helper';
import { getMyProfit } from '../../stores/actions/profitaction';
import Loading from '../component/Loading';
import LinearGradient from 'react-native-linear-gradient';
import Fontisto from 'react-native-vector-icons/Fontisto';

const ProfitAndLossChart = ({ containerStyles, chartPrices }) => {
  const allprofit = chartPrices;
  const THEME = useSelector(state => state.theme);
  const [selectedRange, setSelectedRange] = useState('allprevious');
  const [selectedTime, setSelectedTime] = useState('onemonth');

  // const filterData = () => {
  //   console.log('Started Filtering ... ');
  //   const currentDate = new Date();
  //   const filteredData = chartPrices.inr_wallet_history.filter(item => {
  //     const itemDate = new Date(item.date);
  //     switch (selectedRange) {
  //       case 'oneday':
  //         return itemDate.toDateString() === currentDate.toDateString();
  //       case 'oneweek':
  //         const oneWeekAgo = new Date(currentDate);
  //         oneWeekAgo.setDate(currentDate.getDate() - 7);
  //         return itemDate >= oneWeekAgo;
  //       case 'onemonth':
  //         const oneMonthAgo = new Date(currentDate);
  //         oneMonthAgo.setMonth(currentDate.getMonth() - 1);
  //         return itemDate >= oneMonthAgo;
  //       case 'oneyear':
  //         const oneYearAgo = new Date(currentDate);
  //         oneYearAgo.setFullYear(currentDate.getFullYear() - 1);
  //         return itemDate >= oneYearAgo;
  //       case 'allprevious':
  //         return true;
  //       default:
  //         return true;
  //     }
  //   });

  //   // Handle special case for oneday with no data
  //   if (selectedRange === 'oneday' && filteredData.length === 0) {
  //     return [
  //       {
  //         amount: '0',
  //         date: currentDate, // Adjust this according to your date format
  //       },
  //     ];
  //   }

  //   // Handle special case for oneweek with no data
  //   if (selectedRange === 'oneweek' && filteredData?.length === 0) {
  //     return [
  //       {
  //         amount: '0',
  //         date: currentDate, // Adjust this according to your date format
  //       },
  //     ];
  //   }

  //   return filteredData;
  // };

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
    filterData();
    console.log('FILter DATA : ' + filterData().length);
  };


  const memoizedFilteredData = useMemo(() => {
    return filterData();
  }, [filterData()]);

  console.log("memoizedFilteredData :: " + memoizedFilteredData.length)


  if (chartPrices) {
    // const data = {

    //   datasets: [
    //     {
    //       data: chartPrices.inr_wallet_history?.map(item =>
    //         parseFloat(item?.amount),
    //       ),
    //     },
    //   ],
    // };

    try {
      const data = {
        labels: filterData().map((item, index) => index + 1),
        datasets: [
          {
            // data: filterData().map(item => parseFloat(item?.amount)),
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
            source={require('../../assets/image/bitcoin_image.jpg')}
            style={styles.centerImage}
          />
          {/** TOP CONTAINER */}
          <View style={styles.topContainer}>
            <View style={styles.topContainerLeft}>
              <Text
                style={{
                  color:
                    THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                  ...styles.topContainerLeftTitle,
                }}>
                Profit & Loss
              </Text>
            </View>
            <View style={styles.topContainerRight}>
              <TouchableOpacity onPress={oneDay}>
                <Text
                  style={{
                    backgroundColor:
                      THEME.data === 'DARK' ? COLORS.purple : COLORS.white,
                    color:
                      THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
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
                    backgroundColor:
                      THEME.data === 'DARK' ? COLORS.purple : COLORS.white,
                    color:
                      THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
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
                    backgroundColor:
                      THEME.data === 'DARK' ? COLORS.purple : COLORS.white,
                    color:
                      THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
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
            </View>
          </View>

          {/** chart section */}
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
                    THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.gray2,
                  backgroundGradientTo:
                    THEME.data === 'DARK' ? COLORS.purple : COLORS.white,
                  decimalPlaces: 2,

                  // color: (opacity = 1) => `rgba(255, 0, 0, 1)`, // Set opacity to 1 (fully opaque)
                  color: (opacity = 1) => `rgba(0, 255, 0, 1)`, // Set opacity to 1 (fully opaque)
                  labelColor: (opacity = 0) => `rgba(255, 255, 255, 0)`, // Set opacity to 0 (fully transparent)
                  style: {
                    borderRadius: 2,
                  },
                }}
                bezier
                style={{
                  marginTop: heightPercentageToDP(10),
                  borderRadius: 4,
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


                <Text style={{ fontFamily: FONT.bold }}>No Graph Available</Text>
                <Fontisto
                  name="heartbeat-alt"
                  size={heightPercentageToDP(4)}
                  color={COLORS.green}
                  style={{ alignSelf: 'center' }}
                />
              </LinearGradient>)
            }


          </View>
        </SafeAreaView>
      );
    } catch (error) {
      console.log(error);
    }
  } else {
    return <View style={styles.container}></View>;
  }
};

const ProfitAndLoss = () => {
  const THEME = useSelector(state => state.theme);
  const ACCESS_TOKEN = useSelector(state => state.userAccessToken);
  const dispatch = useDispatch();
  const { loading, inrwallet, allprofit } = useSelector(
    state => state.profitData,
  );

  useEffect(() => {
    dispatch(getMyProfit(ACCESS_TOKEN.data));
  }, []);



  const chartConfig = {
    backgroundGradientFrom:
      THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.lightGray,
    backgroundGradientTo:
      THEME.data === 'DARK' ? COLORS.purple : COLORS.lightGray,

    color: (opacity = 1) =>
      THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,

    strokeWidth: 4, // optional, default 3
    barPercentage: 0.4,
    padding: heightPercentageToDP(1),
    decimalPlaces: 2,
    useShadowColorFromDataset: false, // optional
    propsForDots: {
      r: '2',
      strokeWidth: '1',
      stroke: COLORS.green,
      color: 'green',
    },
    style: {
      borderRadius: heightPercentageToDP(2),
    },
  };

  // For Daily Profit Data
  const barGraphDailyProfitData = allprofit.daily_invested_plan_profit.map(
    dataPoint => dataPoint.total.toString(),
  );

  const daily_investment_data = {
    labels: allprofit.daily_invested_plan_profit.map(dataPoint =>
      dataPoint.day.toString(),
    ),
    datasets: [
      {
        data: barGraphDailyProfitData,

        color: (opacity = 1) =>
          THEME.data === 'DARK' ? COLORS.green : COLORS.purpleDark,
        strokeWidth: 2, // optional
      },
    ],
  };

  // For Total Profit Data
  const barGraphTotalProfitData = allprofit.inr_wallet_history.map(dataPoint =>
    dataPoint.amount.toString(),
  );

  
  const total_balance_data = {
    datasets: [
      {
        data: barGraphTotalProfitData,
        color: (opacity = 1) =>
          THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
        strokeWidth: 2, 
      },
    ],
  };

  const formatAmount = amount => {
    if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(0)} m`;
    } else if (amount >= 1000) {
      return `${(amount / 1000).toFixed(0)} k`;
    } else {
      return amount;
    }
  };

  

  const formatAmountForDailyProfit = amount => {
    
    if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(0)} m`;
    } else if (amount >= 1000) {
      return `${(amount / 1000).toFixed(0)} k`;
    } else {
      return amount;
    }
  };


  // <ScrollView horizontal showsHorizontalScrollIndicator={false}>
  //                   <BarChart
  //                     data={daily_investment_data}
  //                     width={widthPercentageToDP(100)}
  //                     height={heightPercentageToDP(30)}
  //                     chartConfig={chartConfig}

  //                     verticalLabelRotation={0}
  //                     withInnerLines={false}

  //                   />
  //                 </ScrollView>


  return (
    <View
      style={{
        backgroundColor:
          THEME.data === 'LIGHT' ? COLORS.white : COLORS.purpleDark,
        ...styles.mainContainerParent,
      }}>
      <HeaderTop value={'Profit & Loss'} />
      {allprofit ? (
        <ScrollView>
          {/** Top container <PLTopContainer value={allprofit} /> */}
          <View
            style={{
              backgroundColor:
                THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.lightGray,
              ...styles.PLcontainer,
            }}>
            <Image
              source={require('../../assets/image/bitcoin_image.jpg')}
              style={styles.PLcenterImage}
            />
            <View>
              <Text
                style={{
                  color:
                    THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                  ...styles.PLtotalBal,
                }}>
                Total Balance
              </Text>
              <Text
                style={{
                  color:
                    THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                  ...styles.PLtotalBalAmount,
                }}>
                {Helper.INR_SYMBOL +
                  Number.parseFloat(allprofit?.inr_wallet_balance).toFixed(2)}
              </Text>
            </View>

            <View style={styles.PLtotalValContainer}>
              {/**
           <MaterialCommunityIcons name="bitcoin" size={20} color="orange" />          
          */}

              <Text
                style={{
                  color:
                    THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                  ...styles.PLtotalValText,
                }}>
                {Number.parseFloat(allprofit.usdt_wallet_balance).toFixed(2)}
              </Text>
              <Text
                style={{
                  color:
                    THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                  ...styles.PLtotalValText,
                }}>
                USDT
              </Text>
            </View>

            <View style={styles.PLcontainerBottom}>
              <TouchableOpacity>
                <View
                  style={{
                    backgroundColor:
                      THEME.data === 'DARK' ? COLORS.purple : COLORS.white,
                    ...styles.PLbottomContainerLeft,
                  }}>
                  <Text
                    style={{
                      color:
                        THEME.data === 'DARK'
                          ? COLORS.white
                          : COLORS.purpleDark,
                      ...styles.PLbottomContainerContent,
                    }}>
                    YESTERDAY’S PROFIT
                  </Text>
                  <Text
                    style={{
                      color:
                        THEME.data === 'DARK'
                          ? COLORS.white
                          : COLORS.purpleDark,
                      ...styles.PLbottomContainerLoss,
                    }}
                    numberOfLines={1}>
                    {Number.parseFloat(allprofit.yesterday_profit).toFixed(2)}
                    <Text style={{ fontSize: heightPercentageToDP(1.5) }}>
                      {' ' + 'USDT'}
                    </Text>
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View
                  style={{
                    backgroundColor:
                      THEME.data === 'DARK' ? COLORS.purple : COLORS.white,
                    ...styles.PLbottomContainerRight,
                  }}>
                  <Text
                    style={{
                      color:
                        THEME.data === 'DARK'
                          ? COLORS.white
                          : COLORS.purpleDark,
                      ...styles.PLbottomContainerContent,
                    }}>
                    TODAY’S PROFIT
                  </Text>
                  <Text
                    style={{
                      color:
                        THEME.data === 'DARK'
                          ? COLORS.white
                          : COLORS.purpleDark,
                      ...styles.PLbottomContainerProfit,
                    }}
                    numberOfLines={1}>
                    {Number.parseFloat(allprofit.todays_profit).toFixed(2)}
                    <Text style={{ fontSize: heightPercentageToDP(1.5) }}>
                      {' ' + 'USDT'}
                    </Text>
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View>
            {
              <ProfitAndLossChart
                containerStyles={{
                  borderRadius: heightPercentageToDP(2),
                }}
                chartPrices={allprofit}
              />
            }
          </View>

          {/** Third container */}
          {
            allprofit?.invested_plan_lists.length !== 0 && (<>

              <PLAssetAllocation item={allprofit} />

              <View
                style={{
                  backgroundColor:
                    THEME.data === 'LIGHT' ? COLORS.lightGray : COLORS.skyBlue,
                  width: widthPercentageToDP(100),
                  marginTop: heightPercentageToDP(2)
                }}>
                <View>
                  <Text
                    style={{
                      fontFamily: FONT.bold,
                      fontSize: heightPercentageToDP(2),
                      marginHorizontal: heightPercentageToDP(2),
                      color:
                        THEME.data === 'DARK'
                          ? COLORS.lightGray
                          : COLORS.purpleDark,
                      marginVertical: heightPercentageToDP(2),
                    }}>
                    Daily Profit
                  </Text>


                  <ScrollView horizontal style={{ flexGrow: 1 }} showsHorizontalScrollIndicator={false}>
                    <View style={{ width: 600 }}>
                      <BarChart
                        data={daily_investment_data}
                        width={600}
                        height={200}
                        withInnerLines={false}
                        chartConfig={{
                        
                          backgroundGradientFrom:
                            THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.lightGray,
                          backgroundGradientTo:
                            THEME.data === 'DARK' ? COLORS.purple : COLORS.lightGray,

                          color: (opacity = 1) =>
                            THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                          decimalPlaces: 0,
                          
                          style: {
                            borderRadius: 16,
                          },
                          barPercentage: 0.4,
                          formatYLabel: (value) =>  formatAmountForDailyProfit(value),
                          

                        }}
                      />
                    </View>
                  </ScrollView>

                </View>
              </View>

            </>)
          }



          <View
            style={{
              backgroundColor:
                THEME.data === 'LIGHT' ? COLORS.lightGray : COLORS.skyBlue,

              borderRadius: heightPercentageToDP(2),
              marginTop: heightPercentageToDP(2)
            }}>
            <View>
              <Text
                style={{
                  fontFamily: FONT.bold,
                  fontSize: heightPercentageToDP(2),
                  paddingHorizontal: heightPercentageToDP(2),
                  marginTop: heightPercentageToDP(2),
                  color:
                    THEME.data === 'DARK'
                      ? COLORS.lightGray
                      : COLORS.purpleDark,
                }}>
                Total Balance
              </Text>

              <Text
                style={{
                  fontFamily: FONT.bold,
                  fontSize: heightPercentageToDP(2),
                  paddingHorizontal: heightPercentageToDP(2),
                  color: THEME.data === 'DARK' ? COLORS.green : COLORS.green,
                  marginBottom: heightPercentageToDP(2),
                }}>
                {Helper.INR_SYMBOL +
                  ' ' +
                  Number.parseFloat(allprofit?.inr_wallet_balance).toFixed(2)}
              </Text>

              {
                barGraphTotalProfitData.length !== 0 ? (
                 
                <ScrollView horizontal style={{ flexGrow: 1 }} showsHorizontalScrollIndicator={false}>
                    <View style={{ width: 600 }}>
                      <BarChart
                        data={total_balance_data}
                        width={600}
                        height={200}
                        withInnerLines={false}
                        chartConfig={{
                        
                          backgroundGradientFrom:
                            THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.lightGray,
                          backgroundGradientTo:
                            THEME.data === 'DARK' ? COLORS.purple : COLORS.lightGray,

                          color: (opacity = 1) =>
                            THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                          decimalPlaces: 0,
                          
                          style: {
                            borderRadius: 16,
                          },
                          barPercentage: 0.4,
                          formatYLabel: (value) =>  formatAmount(value),

                        }}
                      />
                    </View>
                  </ScrollView>
                
                ) : (
                  <LinearGradient
                    colors={[
                      THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.gray2,
                      THEME.data === 'DARK' ? COLORS.purpleDark : COLORS.lightWhite,
                    ]}
                    style={{
                      width: widthPercentageToDP(100), height: heightPercentageToDP(30),
                      borderRadius: heightPercentageToDP(2),
                      justifyContent: 'center', alignItems: 'center'
                    }}>

                    <Text style={{ fontFamily: FONT.bold }}>No Graph Available</Text>
                    <Fontisto
                      name="heartbeat-alt"
                      size={heightPercentageToDP(4)}
                      color={COLORS.green}
                      style={{ alignSelf: 'center' }}
                    />
                  </LinearGradient>
                )
              }


            </View>
          </View>
        </ScrollView>
      ) : (
        <Loading />
      )}
    </View>
  );
};

// export default ProfitAndLoss;

const styles = StyleSheet.create({
  mainContainerParent: {
    flex: 1,
  },
  PLcontainer: {
    display: 'flex',
    position: 'relative',
    width: '100%',
    height: heightPercentageToDP(25),
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: heightPercentageToDP(3),
  },

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
  topContainer: {
    height: heightPercentageToDP(5),
    flexDirection: 'row',
  },
  topContainerLeft: {
    flex: 1,
    padding: heightPercentageToDP(1),
  },
  topContainerRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  topContainerLeftTitle: {
    fontFamily: FONT.extrabold,
    alignSelf: 'flex-start',
    fontSize: heightPercentageToDP(2.5),
  },
  PLcontainer: {
    display: 'flex',
    position: 'relative',
    width: '100%',
    height: heightPercentageToDP(25),
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: heightPercentageToDP(3),
  },
  PLtotalBal: {
    fontFamily: FONT.medium,
    fontSize: heightPercentageToDP(2),
    margin: heightPercentageToDP(2),
    alignSelf: 'center',
  },

  PLtotalBalAmount: {
    fontFamily: FONT.medium,
    fontSize: heightPercentageToDP(3),
    alignSelf: 'center',
  },
  PLtotalValContainer: {
    fontFamily: FONT.regular,
    fontSize: heightPercentageToDP(1.6),
    flexDirection: 'row',
    gap: heightPercentageToDP(1),
  },
  totalValText: {
    fontFamily: FONT.regular,
    fontSize: heightPercentageToDP(1.6),

    textAlignVertical: 'center',
  },
  PLtotalVal: {
    fontFamily: FONT.regular,
    fontSize: heightPercentageToDP(1.6),
  },

  PLcenterImage: {
    position: 'absolute',
    height: '100%',
    resizeMode: 'cover',
    opacity: 0.1,
  },
  PLcontainerBottom: {
    flex: 1,
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(100),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  PLbottomContainerLeft: {
    flex: 1,
    width: widthPercentageToDP(40),
    height: heightPercentageToDP(100),
    margin: heightPercentageToDP(1),
    borderRadius: heightPercentageToDP(1),
    padding: heightPercentageToDP(2),
    alignItems: 'center',
  },
  PLbottomContainerRight: {
    flex: 1,
    width: widthPercentageToDP(40),
    height: heightPercentageToDP(100),
    margin: heightPercentageToDP(1),
    borderRadius: heightPercentageToDP(1),
    padding: heightPercentageToDP(2),
    alignItems: 'center',
  },
  PLbottomContainerContent: {
    fontFamily: FONT.medium,
    fontSize: heightPercentageToDP(1.5),
  },
  PLbottomContainerLoss: {
    flex: 1,
    color: COLORS.green,
    fontFamily: FONT.medium,
    fontSize: heightPercentageToDP(1.8),
  },
  PLbottomContainerProfit: {
    flex: 1,
    color: COLORS.green,
    fontFamily: FONT.medium,
    fontSize: heightPercentageToDP(1.8),
  },
});

export default ProfitAndLoss;
