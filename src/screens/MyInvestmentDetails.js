import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { COLORS, FONT } from '../../constants';
import HeaderTop from '../component/profile/HeaderTop';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import { BarChart, LineChart } from 'react-native-chart-kit';
import Toast from 'react-native-toast-message';

const PointerLabelComponent = ({ dataValue, pointerConfig, children }) => {
  const { radius, pointerStripHeight } = pointerConfig;

  return (
    <View
      style={{
        position: 'absolute',
        top: -pointerStripHeight,
        alignItems: 'center',
      }}>
      <View
        style={{
          borderRadius: radius,
          backgroundColor: COLORS.primary,
          width: radius * 2,
          height: radius * 2,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {children}
      </View>
      <View
        style={{
          width: 1,
          height: pointerStripHeight,
          backgroundColor: COLORS.secondary,
        }}
      />
      <View
        style={{
          backgroundColor: COLORS.primary,
          padding: 10,
          borderRadius: 5,
        }}>
        <Text style={{ color: COLORS.white, fontSize: 16 }}>${dataValue}</Text>
      </View>
    </View>
  );
};

const MyInvestmentDetails = ({ route }) => {
  const THEME = useSelector(state => state.theme);
  const ACCESS_TOKEN = useSelector(state => state.userAccessToken);
  const navigation = useNavigation();
  const [selectedData, setSelectedData] = useState(null);

  const { data } = route.params;
  console.log("Investment Created AT :: "+data.created_at);

  const daysDifference = getDateCountFromDateToCurrent(data.created_at);
  console.log("Days difference:", daysDifference);

 
  const convertTime = timeString => {
    const time = moment(timeString, 'YYYY-MM-DDTHH:mm:ss.SSSSSSZ');
    const formattedTime = time.format('MMM DD, YYYY hh:mm a');
    return formattedTime;
  };

 // Prepare data for the Line Chart
  // const chartData = {
  //   labels: profitData.map(dataPoint => dataPoint.days.toString()), // Array to hold the X-axis labels (days)
  //   datasets: [
  //     {
  //       data: profitData.map(dataPoint =>
  //         parseFloat(dataPoint.profitperdayinpercent),
  //       ), // Array to hold the data points (profitperdayinpercent)
  //     },
  //   ],
  // };

  function getDateCountFromDateToCurrent(givenDateString) {
    // Parse the given date string into a Date object
    const givenDate = new Date(givenDateString);
    // Get the current date
    const currentDate = new Date();
    // Calculate the difference in milliseconds
    const differenceInMs = currentDate - givenDate;
  
    // Convert milliseconds to days
    const differenceInDays = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));


    // console.log("Given Date :: "+givenDateString)
    // console.log("Current Date :: "+currentDate.toString())
    // console.log(" Date differenceInDays :: "+differenceInDays)
  
    return differenceInDays;
  }


  const profitDataOrg = data.profitperdays_in_percent.map(
    ({ profitperdayinpercent }) => parseFloat(profitperdayinpercent),
  );

  const barGraphData = data.profitperdays_in_percent.map(
    ({ profitperdayinpercent }) =>
      parseFloat((data.amount * profitperdayinpercent) / 100),
  );

  // labels: ["January", "February", "March", "April", "May", "June"],
  const mine_data = {
    labels: data.profitperdays_in_percent.map(
      dataPoint => dataPoint.days.toString() + ' day',
    ),
    datasets: [
      {
        data: profitDataOrg?.slice(0,getDateCountFromDateToCurrent(data.created_at) === 0 ? 1 : getDateCountFromDateToCurrent(data.created_at)),
        color: (opacity = 1) => 'rgba(0,255, 0, 1)', // optional
        strokeWidth: 2, // optional
      },
    ],
  };

  

  // const totalProfitVal = () => {
  //   const val = data.profitperdays_in_percent.map(
  //   ({profitperdayinpercent}) => {
  //     console.log('Total Profit : ')
  //     profitVal += parseFloat((data.amount * profitperdayinpercent) / 100);
  //     setProfit(profitVal)

  //   },
  // );
  //   return val;
  // }

  const totalProfitVal = data.profitperdays_in_percent.map(
    ({ profitperdayinpercent }) => {
      parseFloat((data.amount * profitperdayinpercent) / 100);
    },
  );

  console.log('TOTAL PROFIT :: ' + totalProfitVal);

  const barGraph_data = {
    labels: data.profitperdays_in_percent.map(
      dataPoint => dataPoint.days.toString(),
    ),
    datasets: [
      {
        data: barGraphData?.slice(0,getDateCountFromDateToCurrent(data.created_at) === 0 ? 1 : getDateCountFromDateToCurrent(data.created_at)),
        color: (opacity = 1) =>
          THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
        strokeWidth: 2, // optional
      },
    ],
  };



 

  const getDataValue = index => {
    return data.profitperdays_in_percent[index].profitperdayinpercent;
  };

  const handleDataPointClick = ({ index }) => {
    const dataValue = getDataValue(index);
    setSelectedData(dataValue);
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

  const chartConfig = {
    backgroundGradientFrom:
      THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.lightGray,
    backgroundGradientTo:
      THEME.data === 'DARK' ? COLORS.purple : COLORS.lightGray,

    color: (opacity = 1) =>
      THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
    propsForDots: {
      r: '2',
      strokeWidth: '1',
      stroke: COLORS.skyBlue,
      color: 'green',
    },

    style: {
      borderRadius: heightPercentageToDP(2),
    },
  };

  if (data) {
    console.log('DATA EXISTS');
    // console.log('DATA EXISTS mine :: ' + data.profitperdays_in_percent[0].days);

    // const totalProfitVal = data.profitperdays_in_percent.map(
    //   ({ profitperdayinpercent }) => {
    //     parseFloat((data.amount * profitperdayinpercent) / 100);
    //   },
    // );

    

    // console.log('TOTAL PROFIT :: ' + barGraphData);

    // // Using reduce to add all numbers in the list
    // const sum = barGraphData.reduce(
    //   (accumulator, currentValue) => accumulator + currentValue,
    //   0,
    // );

    // console.log('Sum of all numbers:', sum); // Output: Sum of all numbers: 15
  }

  // Using reduce to add all numbers in the list
  const AveragetTotalProfit = barGraphData?.slice(0,getDateCountFromDateToCurrent(data.created_at) === 0 ? 1 : getDateCountFromDateToCurrent(data.created_at)).reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0,
  );

  console.log('Sum of all numbers:', AveragetTotalProfit); // Output: Sum of all numbers: 15

  const calenderData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  };

  const barGraphChartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForBackgroundLines: {
      strokeWidth: 1,
      stroke: '#efefef',
    },
    propsForLabels: {
      color: 'black', // Change labels color to black
    },
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor:
          THEME.data === 'LIGHT' ? COLORS.white : COLORS.purpleDark,
        ...styles.container,
      }}>
      <HeaderTop value={'Plan Details'} />

      <ScrollView>
        {data && (
          <View>
            <LinearGradient
              colors={[
                THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.gray2,
                THEME.data === 'DARK' ? COLORS.purpleDark : COLORS.lightWhite,
              ]}
              style={{
                ...styles.containerContent,
              }}>
              <View
                style={{
                  ...styles.containerTop,
                }}>
                <View>
                  <LinearGradient
                    colors={[
                      THEME.data === 'DARK' ? COLORS.purple : COLORS.gray2,
                      THEME.data === 'DARK' ? COLORS.purpleDark : COLORS.white,
                    ]}
                    className="rounded-md ">
                    <Image
                      source={require('../../assets/image/logo.png')}
                      style={{
                        height: heightPercentageToDP(5),
                        width: heightPercentageToDP(5),
                      }}
                      resizeMode="contain"
                    />
                  </LinearGradient>
                </View>
                <View>
                  <Text
                    style={{
                      color:
                        THEME.data === 'DARK'
                          ? COLORS.white
                          : COLORS.purpleDark,
                      fontFamily: FONT.bold,
                      fontSize: heightPercentageToDP(2.5),
                    }}
                    numberOfLines={1}>
                    {data.title}
                  </Text>
                </View>
              </View>

              {/** Plan About Container */}
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color:
                        THEME.data === 'DARK'
                          ? COLORS.white
                          : COLORS.purpleDark,
                      fontFamily: FONT.bold,
                      fontSize: heightPercentageToDP(1.5),

                      letterSpacing: 4,
                    }}>
                    INVESTED AMOUNT
                  </Text>
                  <Text
                    style={{
                      color:
                        THEME.data === 'DARK'
                          ? COLORS.white
                          : COLORS.purpleDark,
                      fontFamily: FONT.extrabold,
                      fontSize: heightPercentageToDP(2),
                    }}
                    numberOfLines={1}>
                    {data.amount}
                  </Text>

                  <Text
                    style={{
                      color:
                        THEME.data === 'DARK'
                          ? COLORS.white
                          : COLORS.purpleDark,
                      fontFamily: FONT.bold,
                      fontSize: heightPercentageToDP(1.5),
                      letterSpacing: 4,
                    }}>
                    PLAN EXPIRE ON
                  </Text>
                  <Text
                    style={{
                      color:
                        THEME.data === 'DARK'
                          ? COLORS.white
                          : COLORS.purpleDark,
                      fontFamily: FONT.extrabold,
                      fontSize: heightPercentageToDP(2),
                    }}
                    numberOfLines={1}>
                    {convertTime(data.expired_on)}
                  </Text>
                </View>
              </View>
            </LinearGradient>

            <LinearGradient
              colors={[
                THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.gray2,
                THEME.data === 'DARK' ? COLORS.purpleDark : COLORS.lightWhite,
              ]}
              style={{
                ...styles.containerDuration,
              }}>
              <View>
                {/** total duration of program */}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color:
                        THEME.data === 'DARK'
                          ? COLORS.white
                          : COLORS.purpleDark,
                      fontFamily: FONT.extrabold,
                      fontSize: heightPercentageToDP(3),
                    }}
                    numberOfLines={1}>
                    {data.noofmonths}
                  </Text>
                  <Text
                    style={{
                      color:
                        THEME.data === 'DARK'
                          ? COLORS.white
                          : COLORS.purpleDark,
                      fontFamily: FONT.bold,
                      fontSize: heightPercentageToDP(1.5),

                      letterSpacing: 4,
                      textAlignVertical: 'center',
                    }}>
                    Month Program
                  </Text>
                </View>

                {/** no of days left */}

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    gap: heightPercentageToDP(2),
                  }}>
                  <Text
                    style={{
                      color:
                        THEME.data === 'DARK'
                          ? COLORS.white
                          : COLORS.purpleDark,
                      fontFamily: FONT.extrabold,
                      fontSize: heightPercentageToDP(3),
                    }}
                    numberOfLines={1}>
                    {data.noofdaysleft}
                  </Text>
                  <Text
                    style={{
                      color:
                        THEME.data === 'DARK'
                          ? COLORS.white
                          : COLORS.purpleDark,
                      fontFamily: FONT.bold,
                      fontSize: heightPercentageToDP(1.5),

                      letterSpacing: 4,
                      textAlignVertical: 'center',
                    }}>
                    Days Left
                  </Text>
                </View>
              </View>
            </LinearGradient>

            <LinearGradient
              colors={[
                THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.gray2,
                THEME.data === 'DARK' ? COLORS.purpleDark : COLORS.lightWhite,
              ]}
              style={{
                marginHorizontal: heightPercentageToDP(2),
                borderRadius: heightPercentageToDP(1),
                padding: heightPercentageToDP(1),
              }}>
              <View>
                {/** total duration of program */}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color:
                        THEME.data === 'DARK'
                          ? COLORS.white
                          : COLORS.purpleDark,
                      fontFamily: FONT.extrabold,
                      fontSize: heightPercentageToDP(1.5),

                      letterSpacing: 4,
                      textAlignVertical: 'center',
                    }}>
                    Daily Profit
                  </Text>
                </View>
              </View>
            </LinearGradient>
            {/** for chart  */}


            {data && (
              <LinearGradient
                colors={[
                  THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.gray2,
                  THEME.data === 'DARK' ? COLORS.purpleDark : COLORS.lightWhite,
                ]}
                style={{
                  margin: heightPercentageToDP(2),
                  borderRadius: heightPercentageToDP(2),
                }}>
                <View
                  style={{
                    padding: heightPercentageToDP(1),
                    borderRadius: heightPercentageToDP(2),
                  }}>
                  <LineChart
                    data={mine_data}
                    width={widthPercentageToDP(90)}
                    height={heightPercentageToDP(25)}
                    chartConfig={chartConfig}
                    bezier
                    pointerLabelComponent
                    onDataPointClick={handleDataPointClick}
                    isAnimated={true}
                    animateTogether
                    pressEnabled={true}
                    withHorizontalLines={false}
                    withVerticalLines={false}
                    withVerticalLabels={false}
                    showStripOnPress={true}
                    showTextOnPress={true}
                    disableScroll={true}
                    dataPointsHeight={6}
                    dataPointsWidth={6}
                    dataPointsHeight2={6}
                    yAxisSuffix=" %"
                    dataPointsWidth2={6}>
                    {selectedData && (
                      <PointerLabelComponent
                        dataValue={() => (
                          <View
                            style={{
                            position: 'absolute',
                              width: widthPercentageToDP(40),
                            }}>
                            <Text
                              style={{
                                color: COLORS.purpleDark,
                              }}>{`$${selectedData}`}</Text>
                          </View>
                        )}
                        pointerConfig={{
                          radius: 5,
                          pointerStripHeight: 120,
                        }}
                      />
                    )}
                  </LineChart>
                </View>
              </LinearGradient>
            )}

            <LinearGradient
              colors={[
                THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.gray2,
                THEME.data === 'DARK' ? COLORS.purpleDark : COLORS.lightWhite,
              ]}
              style={{
                marginHorizontal: heightPercentageToDP(2),
                borderRadius: heightPercentageToDP(1),
                padding: heightPercentageToDP(1),
              }}>
              <View>
                {/** total duration of program */}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}>

                  {
                    /**
                     * 
                     * <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <BarChart
                    data={barGraph_data}
                    width={widthPercentageToDP(90)}
                    height={heightPercentageToDP(30)}
                    chartConfig={chartConfig}
                    showXAxisLabel={false}
                    withInnerLines={false}
                    withVerticalLabels={false}
                    
                  />
                  </ScrollView>
                     */
                  }

                  <ScrollView horizontal style={{ flexGrow: 1 }} showsHorizontalScrollIndicator={false}>
                    <View style={{ width: 600 }}>
                      <BarChart
                        data={barGraph_data}
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
            </LinearGradient>

            <LinearGradient
              colors={[
                THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.gray2,
                THEME.data === 'DARK' ? COLORS.purpleDark : COLORS.lightWhite,
              ]}
              style={{
                margin: heightPercentageToDP(2),
                marginBottom: heightPercentageToDP(4),
                borderRadius: heightPercentageToDP(1),
                padding: heightPercentageToDP(1),
              }}>
              <View>
                {/** total duration of program */}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      color:
                        THEME.data === 'DARK'
                          ? COLORS.white
                          : COLORS.purpleDark,
                      fontFamily: FONT.extrabold,
                      fontSize: heightPercentageToDP(2),

                      letterSpacing: 4,
                      textAlignVertical: 'center',
                    }}>
                    Investment
                  </Text>

                  <Text
                    style={{
                      color:
                        THEME.data === 'DARK'
                          ? COLORS.white
                          : COLORS.purpleDark,
                      fontFamily: FONT.extrabold,
                      fontSize: heightPercentageToDP(2),

                      textAlignVertical: 'center',
                    }}>
                    {data.amount}
                  </Text>
                </View>

                {/** Invested Amount */}

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      color:
                        THEME.data === 'DARK'
                          ? COLORS.white
                          : COLORS.purpleDark,
                      fontFamily: FONT.extrabold,
                      fontSize: heightPercentageToDP(2),

                      letterSpacing: 4,
                      textAlignVertical: 'center',
                    }}>
                    Profit
                  </Text>

                  <Text
                    style={{
                      color:
                        THEME.data === 'DARK'
                          ? COLORS.white
                          : COLORS.purpleDark,
                      fontFamily: FONT.extrabold,
                      fontSize: heightPercentageToDP(2),

                      textAlignVertical: 'center',
                    }}>
                    {AveragetTotalProfit}
                  </Text>
                </View>

                {/** Total Amount */}

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      color:
                        THEME.data === 'DARK'
                          ? COLORS.white
                          : COLORS.purpleDark,
                      fontFamily: FONT.extrabold,
                      fontSize: heightPercentageToDP(2),

                      letterSpacing: 4,
                      textAlignVertical: 'center',
                    }}>
                    Total
                  </Text>

                  <Text
                    style={{
                      color:
                        THEME.data === 'DARK'
                          ? COLORS.white
                          : COLORS.purpleDark,
                      fontFamily: FONT.extrabold,
                      fontSize: heightPercentageToDP(2),

                      textAlignVertical: 'center',
                    }}>
                    {data.amount + AveragetTotalProfit}
                  </Text>
                </View>
              </View>
            </LinearGradient>
          </View>
        )}

        {/** Input Container */}
      </ScrollView>
    </SafeAreaView>
  );
};

// import {
//   Dimensions,
//   Image,
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import React, {useEffect, useState} from 'react';
// import {useSelector} from 'react-redux';
// import {useNavigation} from '@react-navigation/native';
// import {COLORS, FONT} from '../../constants';
// import HeaderTop from '../component/profile/HeaderTop';
// import InvestmentItem from '../component/investment/InvestmentItem';
// import {
//   heightPercentageToDP,
//   widthPercentageToDP,
// } from 'react-native-responsive-screen';
// import * as Progress from 'react-native-progress';
// import Toast from 'react-native-simple-toast';
// import URLHelper from '../api/URLhelper/URLHelper';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import LinearGradient from 'react-native-linear-gradient';
// import moment from 'moment';
// import {LineChart} from 'react-native-chart-kit';

// const MyInvestmentDetails = ({route}) => {
//   const THEME = useSelector(state => state.theme);
//   const ACCESS_TOKEN = useSelector(state => state.userAccessToken);
//   const navigation = useNavigation();

//   const {data} = route.params;
//   console.log(data.maxinvestment);

//   const [accountIdVal, setAccountId] = useState(1);
//   const [packageVal, setPackageVal] = useState(1);
//   const [investmentAmountVal, setInsvestmentAmount] = useState(0);
//   const [showProgressBar, setProgressBar] = useState(false);
//   const [chart_dataVal, setChartdata] = useState(null);

//   const chart_data = [26117, 26138, 26181, 26128, 26159, 26181, 26128, 26117];

//   useEffect(() => {
//     getUserid();
//     console.log('Account id :: ' + accountIdVal);
//   }, []);

//   const MakeInvest = async () => {
//     if (!investmentAmountVal) {
//       Toast.show('Enter Amount');
//     } else if (
//       investmentAmountVal >= Number(data.mininvestment) &&
//       investmentAmountVal <= Number(data.maxinvestment)
//     ) {
//       console.log(
//         'Else : ' + accountIdVal + ' | ' + investmentAmountVal + ' | ',
//       );
//       setProgressBar(true);

//       const apiUrl = URLHelper.MAKE_INVESTMENT;
//       const bearerToken =
//         'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiMGE5ZTY1YTM2ZWQ2NDNlOWYzZDRhOGNlZTAwMDQ3Y2U1ZTE1ZDQyYWRjNzVmZTQ0NjBjMTBjNjFjOTVhOWY3NzA4NmRmYTYyOWQ3N2JlZTciLCJpYXQiOjE2OTgwNjIzMTkuNzQ2OTcxLCJuYmYiOjE2OTgwNjIzMTkuNzQ2OTc1LCJleHAiOjE3Mjk2ODQ3MTkuNzQ2MTAzLCJzdWIiOiIxMCIsInNjb3BlcyI6W119.TkRGB7JiajYr_zVD30uiT30Xe1XOKFdTR5Tdhp9w8V7gsXS1nVPWDhKzg5g4H0aZwgAs_ROmrrk32PcsQXQF4mkdAZDzxJAZJOjhsAUpzHXnmF_o4ls-YejbqV1P1cvpLIJNYm5TUV2c4H2huC4QKqD3B6Cb_p8t49G0UdB8Hl7xd39A4TqWxsbTBi_GqrX6Hm33Tmf7VvRwYEiOMpKN91lVwSRWJISMMV9q0ndKvbMerw5DtHKdAa4DWlalBOmkvRY5qJzAmYBV9-5bczKFJ1IfKtHV7072q08Ie1J7IVcXoLwSmjxtodd55PN0YCE8mCbY65qLCtD0MVTYHhQMODVpIkFz9av37veldCqcaATSzh_bkD4M1TyzVfzQ9y5f-9GW4n1DFOQ9UTGIe0NQxL33qbEyJVvsDbt4Zm_moF_MrxFPS6ZpRcuy7DYTWIgF1rMDBsAKnmHdySClsXFQFnueiVwZ3ceAf9kNCf9u1mkNR1-FTqcvm6ZQwELe5P4Nz9Y8oRMvvIDA6egK7wZi5w2iiycoTkK8m_H7yNZ5I585_a1ebL9Qx46FHd3ujNi1nIELocn7u89Y0MN_RwgyGWJ4JuP2IZatB7wrU9Be6K3mCdNmbLbZlbnN4lC2FqSFflg94jhh7VGUrFqcggMxkYr-BaY0NR8PzULK_3wHta4';

//       const headers = {
//         userapisecret: URLHelper.USER_SECRET_KEY,
//         Authorization: `Bearer ${bearerToken}`,
//         'Content-Type': 'multipart/form-data',
//       };
//       const formData = new FormData();
//       formData.append('account_id', accountIdVal);
//       formData.append('plan_id', packageVal);
//       formData.append('amount', investmentAmountVal);

//       try {
//         const response = await axios.post(apiUrl, formData, {headers});
//         console.log('REGISTERING STARTED');
//         console.log('Response:', response.data);

//         console.log('REGISTERING STOP');
//         Toast.show('Payment Success');
//         setProgressBar(false);
//         navigation.goBack();
//       } catch (error) {
//         setProgressBar(false);
//         if (error.response) {
//           console.error('Error:', error.response.data);
//         } else {
//           console.error('Error:', error.message);
//         }
//       }
//     } else {
//       Toast.show(
//         ' min Investment Amount must be Greater than ' +
//           data.mininvestment +
//           ' and Less than ' +
//           data.maxinvestment,
//       );
//     }
//   };

//   const getUserid = async () => {
//     try {
//       let jsonValue = await AsyncStorage.getItem('userId');
//       // setCode(jsonValue);
//       setAccountId(jsonValue);
//       console.log('Encrypted CODE is :: ' + jsonValue);
//       return jsonValue !== null ? JSON.parse(jsonValue) : null;
//     } catch (error) {
//       console.log('error' + error);
//     }
//   };

//   const convertTime = timeString => {
//     const time = moment(timeString, 'YYYY-MM-DDTHH:mm:ss.SSSSSSZ');
//     const formattedTime = time.format('MMM DD, YYYY hh:mm a');
//     return formattedTime;
//   };

//   // // Prepare data for the Line Chart
//   // const chartData = {
//   //   labels: profitData.map(dataPoint => dataPoint.days.toString()), // Array to hold the X-axis labels (days)
//   //   datasets: [
//   //     {
//   //       data: profitData.map(dataPoint =>
//   //         parseFloat(dataPoint.profitperdayinpercent),
//   //       ), // Array to hold the data points (profitperdayinpercent)
//   //     },
//   //   ],
//   // };

//   const profitDataOrg = data.profitperdays_in_percent.map(
//     ({profitperdayinpercent}) => parseFloat(profitperdayinpercent),
//   );

//   const abcd = [
//     {
//       days: 1,
//       profitperdayinpercent: '1',
//     },
//     {
//       days: 2,
//       profitperdayinpercent: '2',
//     },
//     {
//       days: 3,
//       profitperdayinpercent: '1',
//     },
//     {
//       days: 4,
//       profitperdayinpercent: '2',
//     },
//     {
//       days: 5,
//       profitperdayinpercent: '1',
//     },
//     {
//       days: 6,
//       profitperdayinpercent: '2',
//     },
//     {
//       days: 7,
//       profitperdayinpercent: '1',
//     },
//     {
//       days: 8,
//       profitperdayinpercent: '2',
//     },
//   ];

//   // labels: ["January", "February", "March", "April", "May", "June"],
//   const mine_data = {
//     labels: data.profitperdays_in_percent.map(
//       dataPoint => dataPoint.days.toString() + ' day',
//     ),
//     datasets: [
//       {
//         data: profitDataOrg,
//         color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
//         strokeWidth: 2, // optional
//       },
//     ],
//   };

//   const chartConfig = {
//     backgroundGradientFrom: '#1E2923',
//     backgroundGradientFromOpacity: 0,
//     backgroundGradientTo: '#08130D',
//     backgroundGradientToOpacity: 0.5,

//     color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
//     strokeWidth: 2, // optional, default 3
//     barPercentage: 0.5,
//     useShadowColorFromDataset: false, // optional
//     propsForDots: {
//       r: '2',
//       strokeWidth: '1',
//       stroke: COLORS.skyBlue,
//       color: 'green',
//     },
//   };

//   if (data) {
//     console.log('DATA EXISTS :: ');

//     console.log('DATA EXISTS mine :: ' + data.profitperdays_in_percent[0].days);
//   }

//   return (
//     <SafeAreaView
//       style={{
//         backgroundColor:
//           THEME.data === 'LIGHT' ? COLORS.white : COLORS.purpleDark,
//         ...styles.container,
//       }}>
//       <HeaderTop value={'Plan Details'} />

//       <ScrollView>
//         {data && (
//           <View>
//             <LinearGradient
//               colors={[
//                 THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.gray2,
//                 THEME.data === 'DARK' ? COLORS.purpleDark : COLORS.lightWhite,
//               ]}
//               style={{
//                 ...styles.containerContent,
//               }}>
//               <View
//                 style={{
//                   ...styles.containerTop,
//                 }}>
//                 <View>
//                   <LinearGradient
//                     colors={[
//                       THEME.data === 'DARK' ? COLORS.purple : COLORS.gray2,
//                       THEME.data === 'DARK' ? COLORS.purpleDark : COLORS.white,
//                     ]}
//                     className="rounded-md ">
//                     <Image
//                       source={require('../../assets/image/logo.png')}
//                       style={{
//                         height: heightPercentageToDP(5),
//                         width: heightPercentageToDP(5),
//                       }}
//                       resizeMode="contain"
//                     />
//                   </LinearGradient>
//                 </View>
//                 <View>
//                   <Text
//                     style={{
//                       color:
//                         THEME.data === 'DARK'
//                           ? COLORS.white
//                           : COLORS.purpleDark,
//                       fontFamily: FONT.bold,
//                       fontSize: heightPercentageToDP(2.5),
//                     }}
//                     numberOfLines={1}>
//                     {data.title}
//                   </Text>
//                 </View>
//               </View>

//               {/** Plan About Container */}
//               <View style={{flex: 1}}>
//                 <View
//                   style={{
//                     flex: 1,
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                   }}>
//                   <Text
//                     style={{
//                       color:
//                         THEME.data === 'DARK'
//                           ? COLORS.white
//                           : COLORS.purpleDark,
//                       fontFamily: FONT.bold,
//                       fontSize: heightPercentageToDP(1.5),

//                       letterSpacing: 4,
//                     }}>
//                     INVESTED AMOUNT
//                   </Text>
//                   <Text
//                     style={{
//                       color:
//                         THEME.data === 'DARK'
//                           ? COLORS.white
//                           : COLORS.purpleDark,
//                       fontFamily: FONT.extrabold,
//                       fontSize: heightPercentageToDP(2),
//                     }}
//                     numberOfLines={1}>
//                     {data.amount}
//                   </Text>

//                   <Text
//                     style={{
//                       color:
//                         THEME.data === 'DARK'
//                           ? COLORS.white
//                           : COLORS.purpleDark,
//                       fontFamily: FONT.bold,
//                       fontSize: heightPercentageToDP(1.5),
//                       letterSpacing: 4,
//                     }}>
//                     PLAN EXPIRE ON
//                   </Text>
//                   <Text
//                     style={{
//                       color:
//                         THEME.data === 'DARK'
//                           ? COLORS.white
//                           : COLORS.purpleDark,
//                       fontFamily: FONT.extrabold,
//                       fontSize: heightPercentageToDP(2),
//                     }}
//                     numberOfLines={1}>
//                     {convertTime(data.expired_on)}
//                   </Text>
//                 </View>
//               </View>
//             </LinearGradient>

//             <LinearGradient
//               colors={[
//                 THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.gray2,
//                 THEME.data === 'DARK' ? COLORS.purpleDark : COLORS.lightWhite,
//               ]}
//               style={{
//                 ...styles.containerDuration,
//               }}>
//               <View>
//                 {/** total duration of program */}
//                 <View
//                   style={{
//                     flexDirection: 'row',
//                     justifyContent: 'center',
//                   }}>
//                   <Text
//                     style={{
//                       color:
//                         THEME.data === 'DARK'
//                           ? COLORS.white
//                           : COLORS.purpleDark,
//                       fontFamily: FONT.extrabold,
//                       fontSize: heightPercentageToDP(3),
//                     }}
//                     numberOfLines={1}>
//                     {data.noofmonths}
//                   </Text>
//                   <Text
//                     style={{
//                       color:
//                         THEME.data === 'DARK'
//                           ? COLORS.white
//                           : COLORS.purpleDark,
//                       fontFamily: FONT.bold,
//                       fontSize: heightPercentageToDP(1.5),

//                       letterSpacing: 4,
//                       textAlignVertical: 'center',
//                     }}>
//                     Month Program
//                   </Text>
//                 </View>

//                 {/** no of days left */}

//                 <View
//                   style={{
//                     flexDirection: 'row',
//                     justifyContent: 'center',
//                     gap: heightPercentageToDP(2),
//                   }}>
//                   <Text
//                     style={{
//                       color:
//                         THEME.data === 'DARK'
//                           ? COLORS.white
//                           : COLORS.purpleDark,
//                       fontFamily: FONT.extrabold,
//                       fontSize: heightPercentageToDP(3),
//                     }}
//                     numberOfLines={1}>
//                     {data.noofdaysleft}
//                   </Text>
//                   <Text
//                     style={{
//                       color:
//                         THEME.data === 'DARK'
//                           ? COLORS.white
//                           : COLORS.purpleDark,
//                       fontFamily: FONT.bold,
//                       fontSize: heightPercentageToDP(1.5),

//                       letterSpacing: 4,
//                       textAlignVertical: 'center',
//                     }}>
//                     Days Left
//                   </Text>
//                 </View>
//               </View>
//             </LinearGradient>

//             <LinearGradient
//               colors={[
//                 THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.gray2,
//                 THEME.data === 'DARK' ? COLORS.purpleDark : COLORS.lightWhite,
//               ]}
//               style={{
//                 ...styles.containerDuration,
//               }}>
//               <View>
//                 {/** total duration of program */}
//                 <View
//                   style={{
//                     flexDirection: 'row',
//                     justifyContent: 'center',
//                   }}>
//                   <Text
//                     style={{
//                       color:
//                         THEME.data === 'DARK'
//                           ? COLORS.white
//                           : COLORS.purpleDark,
//                       fontFamily: FONT.bold,
//                       fontSize: heightPercentageToDP(1.5),

//                       letterSpacing: 4,
//                       textAlignVertical: 'center',
//                     }}>
//                     Daily Profit
//                   </Text>
//                 </View>
//               </View>
//             </LinearGradient>
//             {/** for chart  */}

//             {profitDataOrg && (
//               <View style={{padding: heightPercentageToDP(2)}}>
//                 <LineChart
//                   data={mine_data}
//                   width={widthPercentageToDP(100)}
//                   height={heightPercentageToDP(25)}
//                   chartConfig={chartConfig}
//                   bezier
//                   pointerLabelComponent
//                   onDataPointClick={() => {
//                     console.log('Clicked');

//                     pointerConfig = {
//                       radius: 5,
//                       pointerStripHeight: 120,
//                       pointerLabelComponent: () => {
//                         return (
//                           <View
//                             style={{
//                               position: 'relative',
//                               width: widthPercentageToDP(40),
//                             }}>
//                             <Text style={{color: COLORS.purpleDark}}>
//                               $15,360.34
//                             </Text>
//                           </View>
//                         );
//                       },
//                     };
//                   }}
//                   isAnimated={true}
//                   animateTogether
//                   pressEnabled={true}
//                   showStripOnPress={true}
//                   showTextOnPress={true}
//                   disableScroll={true}
//                   dataPointsHeight={6}
//                   dataPointsWidth={6}
//                   dataPointsHeight2={6}
//                   dataPointsWidth2={6}

//                 />
//               </View>
//             )}
//           </View>
//         )}

//         {/** Input Container */}
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

export default MyInvestmentDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    width: widthPercentageToDP(100),
    padding: heightPercentageToDP(2),
    alignItems: 'stretch',
    gap: heightPercentageToDP(1),
  },

  title: {
    fontFamily: FONT.bold,
    fontSize: heightPercentageToDP(3),
  },
  titleDescription: {
    fontFamily: FONT.regular,
    fontSize: heightPercentageToDP(2),
  },
  subtitle: {
    fontFamily: FONT.medium,
    fontSize: heightPercentageToDP(1.5),
    margin: 5,
  },
  userNameInput: {
    fontFamily: FONT.regular,
    fontSize: heightPercentageToDP(2),
    borderWidth: 1,
    borderRadius: 5,
    paddingStart: 10,
  },
  containerContent: {
    height: heightPercentageToDP(20),
    margin: heightPercentageToDP(2),
    borderRadius: heightPercentageToDP(2),
    padding: heightPercentageToDP(1),
  },
  containerTop: {
    height: heightPercentageToDP(6),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: heightPercentageToDP(2),
  },
  containerDuration: {
    margin: heightPercentageToDP(2),
    borderRadius: heightPercentageToDP(1),
    padding: heightPercentageToDP(1),
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

// withVerticalLabels={false} // Remove vertical labels
// withHorizontalLabels={false} // Remove horizontal labels
// withVerticalLines={false}

// data={{
//   datasets: [
//     {
//       data: profitDataOrg,
//     },
//   ],
// }}

// <LineChart
//                   data={mine_data}
//                   options={options}

//                   width={widthPercentageToDP(90)}
//                   height={heightPercentageToDP(30)}
//                   yAxisLabel="$"
//                   yAxisSuffix="k"
//                   yAxisInterval={1}
//                   chartConfig={{
// backgroundGradientFrom:
//   THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.lightGray,
// backgroundGradientTo:
//   THEME.data === 'DARK' ? COLORS.purple : COLORS.lightGray,
// decimalPlaces: 2,

// color: (opacity = 1) => `rgba(255, 0, 0, 1)`, // Set opacity to 1 (fully opaque)
// labelColor: (opacity = 0) => `rgba(255, 255, 255, 0)`, // Set opacity to 0 (fully transparent)
//                     style: {
//                       borderRadius: 2,
//                     },
//                   }}
//                   bezier
//                   style={{
//                     borderRadius: 16,
//                     paddingRight: 0,
//                   }}
//                   withShadow
//                   withHorizontalLines={false}
//                   withInnerLines={false}
//                   withOuterLines={false}

//                 />
