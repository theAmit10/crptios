import React, {memo, useEffect, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import HeaderTop from '../component/profile/HeaderTop';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import moment from 'moment';
import {LineChart} from 'react-native-chart-kit';
import {COLORS, FONT} from '../../constants';
import axios from 'axios';
import Loading from '../component/Loading';
import Toast from 'react-native-toast-message';
import fetchSingleChartMarketData from '../api/singChartMarketData';

const ChartDetails = ({containerStyles, chartPrices}) => {
  const THEME = useSelector(state => state.theme);
  const [selectedTime, setSelectedTime] = useState();
  const [x, setx] = useState(null);
  const [y, sety] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchSingleChartMarketData(chartPrices, '1m');
      if (data) {
        // const xValues = data.map(item => item[0]);
        // const yValues = data.map(item => item[1]);

        // console.log('Response y:', yValues[0]);

        // setProgressBar(false);
        // setx(xValues);
        // sety(yValues);
        sety(data);
      }
    };

    setSelectedTime('1m');
    fetchData();
  }, []);

  // for getting single market details
  const getMarketChartData = async timeframe => {
    console.log('#################################');
    console.log('Fetching Single Data ::: From Market :: timeframe');

    const intervalString = getIntervalString(timeframe);
    console.log('TIME :: ' + intervalString);

    const apiUrl = `https://api.binance.com/api/v3/klines?symbol=${chartPrices}&interval=${intervalString}`;

    try {
      const response = await axios.get(apiUrl);
      console.log('REQUEST STARTED');
      //   console.log('Response:', response.data);

      const da = response.data;

      const xValues = da.map(item => item[0]);
      const yValues = da.map(item => item[1]);

      console.log('Response y:', yValues[0]);

      setx(xValues);
      sety(yValues);

      console.log('REQUEST STOPPED');
    } catch (error) {
      if (error.response) {
        Toast.show({
          type: 'error',
          text1: error.response,
        });
        console.log('Error:', error.response);
      } else {
        Toast.show({
          type: 'error',
          text1: error.message,
        });
        console.log('Error:', error.message);
      }
    }
  };

  function getIntervalString(timeframe) {
    switch (timeframe) {
      case '1m':
        return '1m'; // 1 minute interval for 1 hour chart
      case '15m':
        return '15m'; // 1 hour interval for 1 day chart
      case '30m':
        return '30m'; // 1 day interval for 1 week chart
      case '1h':
        return '1h'; // 1 day interval for 1 month chart
      case '1d':
        return '1d'; // 1 month interval for 1 year chart
      case '1w':
        return '1w'; // 1 month interval for 5 years chart
      case '1M':
        return '1M'; // 1 month interval for 5 years chart
      default:
        // throw new Error('Invalid timeframe');
        return '1d';
    }
  }

  // handling chart data
  const oneMinute = () => {
    sety(null);
    setSelectedTime('1m');
    getMarketChartData('1m');
  };

  const fifteenMinute = () => {
    sety(null);
    setSelectedTime('15m');
    getMarketChartData('15m');
  };

  const halfHour = () => {
    sety(null);
    setSelectedTime('30m');
    getMarketChartData('30m');
  };

  const oneHour = () => {
    sety(null);
    setSelectedTime('1h');
    getMarketChartData('1h');
  };

  const oneDay = () => {
    sety(null);
    setSelectedTime('1d');
    getMarketChartData('1d');
  };

  const oneWeek = () => {
    sety(null);
    setSelectedTime('1w');
    getMarketChartData('1w');
  };

  const oneMonth = () => {
    sety(null);
    setSelectedTime('1M');
    getMarketChartData('1M');
  };

  if (true) {
    let startUnixTimeStamp = moment().subtract(7, 'day').unix();

    // let realTimeChartData = chartPrices.map(value => value);

    return (
      <SafeAreaView
        style={{
          backgroundColor:
            THEME.data === 'LIGHT' ? COLORS.lightGray : COLORS.purple,
          ...styles.container,
        }}>
        <Image
          source={require('../../assets/image/bitcoin_image.jpg')}
          style={styles.centerImage}
        />

        {y ? (
          <>
            <View style={styles.chart}>
              <LineChart
                data={{
                  datasets: [
                    {
                      data: y,
                    },
                  ],
                }}
                width={Dimensions.get('window').width}
                height={heightPercentageToDP(30)}
                yAxisLabel="$"
                yAxisSuffix="k"
                animateTogether
                isAnimated={true}
                yAxisInterval={1}
                chartConfig={{
                  backgroundGradientFrom:
                    THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.lightGray,
                  backgroundGradientTo:
                    THEME.data === 'DARK' ? COLORS.purple : COLORS.card,
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
              />
            </View>

            <View style={styles.containerBottom}>
              <TouchableOpacity onPress={oneMinute}>
                <Text
                  style={{
                    color:
                      THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                    backgroundColor:
                      THEME.data === 'DARK' ? COLORS.purple : COLORS.white,
                    borderColor:
                      selectedTime == '1m'
                        ? COLORS.green
                        : THEME.data === 'DARK'
                        ? COLORS.purpleDark
                        : COLORS.lightGray,
                    ...styles.bottomContainerContent,
                  }}>
                  1m
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={fifteenMinute}>
                <Text
                  style={{
                    color:
                      THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                    backgroundColor:
                      THEME.data === 'DARK' ? COLORS.purple : COLORS.white,
                    borderColor:
                      selectedTime == '15m'
                        ? COLORS.green
                        : THEME.data === 'DARK'
                        ? COLORS.purpleDark
                        : COLORS.lightGray,
                    ...styles.bottomContainerContent,
                  }}>
                  15m
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={halfHour}>
                <Text
                  style={{
                    color:
                      THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                    backgroundColor:
                      THEME.data === 'DARK' ? COLORS.purple : COLORS.white,
                    borderColor:
                      selectedTime == '30m'
                        ? COLORS.green
                        : THEME.data === 'DARK'
                        ? COLORS.purpleDark
                        : COLORS.lightGray,
                    ...styles.bottomContainerContent,
                  }}>
                  30m
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={oneHour}>
                <Text
                  style={{
                    color:
                      THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                    backgroundColor:
                      THEME.data === 'DARK' ? COLORS.purple : COLORS.white,
                    borderColor:
                      selectedTime == '1h'
                        ? COLORS.green
                        : THEME.data === 'DARK'
                        ? COLORS.purpleDark
                        : COLORS.lightGray,
                    ...styles.bottomContainerContent,
                  }}>
                  1h
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={oneDay}>
                <Text
                  style={{
                    color:
                      THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                    backgroundColor:
                      THEME.data === 'DARK' ? COLORS.purple : COLORS.white,
                    borderColor:
                      selectedTime == '1d'
                        ? COLORS.green
                        : THEME.data === 'DARK'
                        ? COLORS.purpleDark
                        : COLORS.lightGray,
                    ...styles.bottomContainerContent,
                  }}>
                  1d
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={oneWeek}>
                <Text
                  style={{
                    color:
                      THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                    backgroundColor:
                      THEME.data === 'DARK' ? COLORS.purple : COLORS.white,
                    borderColor:
                      selectedTime == '1w'
                        ? COLORS.green
                        : THEME.data === 'DARK'
                        ? COLORS.purpleDark
                        : COLORS.lightGray,
                    ...styles.bottomContainerContent,
                  }}>
                  1w
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={oneMonth}>
                <Text
                  style={{
                    color:
                      THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                    backgroundColor:
                      THEME.data === 'DARK' ? COLORS.purple : COLORS.white,
                    borderColor:
                      selectedTime == '1M'
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
          </>
        ) : (
          <View>
            <Loading />
          </View>
        )}
      </SafeAreaView>
    );
  } else {
    return <View style={styles.container}></View>;
  }
};

const AssetDetails = ({route}) => {
  const {itemId} = route.params;
  const THEME = useSelector(state => state.theme);
  const MomoComponent = memo(ChartDetails);
  const [orderBookData, setOrderBookData] = useState(null);
  const [assetData, setAssetData] = useState([]);

  useEffect(() => {
    getSingleMarketData();
  }, []);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     getSingleMarketData();

  //     // fetchBalance()
  //   }, 3000); // 1000 milliseconds = 1 second

  //   // Clear the interval on component unmount to avoid memory leaks
  //   return () => clearInterval(interval);
  // }, [orderBookData, assetData]); // The empty dependency array [] ensures this useEffect runs only once on mount

  // for getting single market details
  const getSingleMarketData = async () => {
    console.log('Fetching Single Data ::: From Market');
    // const apiUrl = `https://api.binance.com/api/v1/ticker/24hr?symbol=BNBUSDT`;
    const apiUrl = `https://api.binance.com/api/v1/ticker/24hr?symbol=${itemId.s}`;

    try {
      const response = await axios.get(apiUrl);
      console.log('REQUEST STARTED');
      console.log('Response:', response.data);

      setOrderBookData(response.data);
      setAssetData(response.data);

      console.log('REQUEST STOPPED');
    } catch (error) {
      if (error.response) {
        console.error('Error:', error.response);
      } else {
        console.error('Error:', error.message);
      }
    }
  };

  const submitBuy = () => {
    Toast.show({
      type: 'info',
      text1: 'Verification Required',
      text2: 'Document verification required ',
    });
  };

  const submitSell = () => {
    Toast.show({
      type: 'info',
      text1: 'Verification Required',
      text2: 'Document verification required ',
    });
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor:
          THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.lightGray,
      }}>
      <HeaderTop value={itemId.s} />

      {/** Order Book Flat list */}

      {orderBookData ? (
        <FlatList
          data={orderBookData}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{}}
          ListHeaderComponent={
            <View>
              <MomoComponent
                containerStyles={{
                  marginTop: heightPercentageToDP(2),
                }}
                chartPrices={itemId.s}></MomoComponent>
            </View>
          }
          renderItem={({item, index}) => {
            return (
              <View style={{marginHorizontal: heightPercentageToDP(1)}}>
                {/* Bid and Ask Container */}

                <View style={styles.bidAndAskContainer}>
                  <View style={styles.bidContainer}>
                    <Text
                      style={{
                        fontFamily: FONT.regular,
                        fontSize: heightPercentageToDP(1.5),
                        color:
                          THEME.data === 'DARK'
                            ? COLORS.white
                            : COLORS.purpleDark,
                      }}>
                      {item[1]}
                    </Text>
                    <Text
                      style={{
                        fontFamily: FONT.regular,
                        fontSize: heightPercentageToDP(1.5),
                        color: COLORS.green,
                      }}>
                      {item[0]}
                    </Text>
                  </View>

                  <View style={styles.AskContainer}>
                    <Text
                      style={{
                        fontFamily: FONT.regular,
                        fontSize: heightPercentageToDP(1.5),
                        color: COLORS.red,
                      }}>
                      {item[1]}
                    </Text>
                    <Text
                      style={{
                        fontFamily: FONT.regular,
                        fontSize: heightPercentageToDP(1.5),
                        color:
                          THEME.data === 'DARK'
                            ? COLORS.white
                            : COLORS.purpleDark,
                      }}>
                      {item[0]}
                    </Text>
                  </View>
                </View>
              </View>
            );
          }}
          ListFooterComponent={
            assetData && (
              <View
                style={{
                  backgroundColor:
                    THEME.data === 'DARK' ? COLORS.purpleDark : COLORS.white,
                }}>
                <Text
                  style={{
                    color:
                      THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                    fontFamily: FONT.bold,
                    fontSize: heightPercentageToDP(2.5),
                    alignSelf: 'flex-start',
                    marginStart: heightPercentageToDP(2),
                    marginTop: heightPercentageToDP(2),
                  }}>
                  Stats
                </Text>

                <View
                  style={{
                    backgroundColor:
                      THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.lightGray,
                    ...styles.statContainer,
                  }}>
                  {/** content */}
                  <View
                    style={{
                      ...styles.statContainerContent,
                    }}>
                    <Text
                      style={{
                        color:
                          THEME.data === 'DARK'
                            ? COLORS.white
                            : COLORS.purpleDark,
                        ...styles.statContainerContentTitle,
                      }}>
                      Close Price
                    </Text>
                    <Text
                      style={{
                        color:
                          THEME.data === 'DARK'
                            ? COLORS.white
                            : COLORS.purpleDark,
                        ...styles.statContainerContentTitle,
                      }}
                      numberOfLines={1}>
                      {Number.parseFloat(assetData.prevClosePrice).toFixed(2)}
                    </Text>
                  </View>

                  <View
                    style={{
                      ...styles.statContainerContent,
                    }}>
                    <Text
                      style={{
                        color:
                          THEME.data === 'DARK'
                            ? COLORS.white
                            : COLORS.purpleDark,
                        ...styles.statContainerContentTitle,
                      }}>
                      Open Price
                    </Text>
                    <Text
                      style={{
                        color:
                          THEME.data === 'DARK'
                            ? COLORS.white
                            : COLORS.purpleDark,
                        ...styles.statContainerContentTitle,
                      }}
                      numberOfLines={1}>
                      {Number.parseFloat(assetData.openPrice).toFixed(2)}
                    </Text>
                  </View>

                  <View
                    style={{
                      ...styles.statContainerContent,
                    }}>
                    <Text
                      style={{
                        color:
                          THEME.data === 'DARK'
                            ? COLORS.white
                            : COLORS.purpleDark,
                        ...styles.statContainerContentTitle,
                      }}>
                      High Price
                    </Text>
                    <Text
                      style={{
                        color:
                          THEME.data === 'DARK'
                            ? COLORS.white
                            : COLORS.purpleDark,
                        ...styles.statContainerContentTitle,
                      }}
                      numberOfLines={1}>
                      {Number.parseFloat(assetData.highPrice).toFixed(2)}
                    </Text>
                  </View>

                  <View
                    style={{
                      ...styles.statContainerContent,
                    }}>
                    <Text
                      style={{
                        color:
                          THEME.data === 'DARK'
                            ? COLORS.white
                            : COLORS.purpleDark,
                        ...styles.statContainerContentTitle,
                      }}>
                      Low Price
                    </Text>
                    <Text
                      style={{
                        color:
                          THEME.data === 'DARK'
                            ? COLORS.white
                            : COLORS.purpleDark,
                        ...styles.statContainerContentTitle,
                      }}
                      numberOfLines={1}>
                      {Number.parseFloat(assetData.lowPrice).toFixed(2)}
                    </Text>
                  </View>

                  <View
                    style={{
                      ...styles.statContainerContent,
                    }}>
                    <Text
                      style={{
                        color:
                          THEME.data === 'DARK'
                            ? COLORS.white
                            : COLORS.purpleDark,
                        ...styles.statContainerContentTitle,
                      }}>
                      Current Price
                    </Text>
                    <Text
                      style={{
                        color:
                          THEME.data === 'DARK'
                            ? COLORS.white
                            : COLORS.purpleDark,
                        ...styles.statContainerContentTitle,
                      }}
                      numberOfLines={1}>
                      {itemId.c}
                    </Text>
                  </View>

                  <View
                    style={{
                      ...styles.statContainerContent,
                    }}>
                    <Text
                      style={{
                        color:
                          THEME.data === 'DARK'
                            ? COLORS.white
                            : COLORS.purpleDark,
                        ...styles.statContainerContentTitle,
                      }}>
                      Volume
                    </Text>
                    <Text
                      style={{
                        color:
                          THEME.data === 'DARK'
                            ? COLORS.white
                            : COLORS.purpleDark,
                        ...styles.statContainerContentTitle,
                      }}
                      numberOfLines={1}>
                      {Number.parseFloat(assetData.volume).toFixed(2)}
                    </Text>
                  </View>
                </View>

                {/** Crypto Buy container */}

                {/** BUY AND SELL CONTAINER */}
                <View
                  style={{
                    backgroundColor:
                      THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.lightGray,
                    ...styles.bottomContainer,
                  }}>
                 
                  <TouchableOpacity
                  onPress={submitBuy}
                    style={{
                      flex: 1,
                      backgroundColor: COLORS.green,
                      marginVertical: heightPercentageToDP(2),
                      borderRadius: heightPercentageToDP(2),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontFamily: FONT.semibold,
                        color: COLORS.white,
                        height: heightPercentageToDP(2),
                      }}>
                      Buy
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                  onPress={submitSell}
                    style={{
                      flex: 1,
                      backgroundColor: COLORS.red,
                      marginVertical: heightPercentageToDP(2),
                      borderRadius: heightPercentageToDP(2),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontFamily: FONT.semibold,
                        color: COLORS.white,
                        height: heightPercentageToDP(2),
                      }}>
                      Sell
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )
          }
        />
      ) : (
        <View
          style={{
            height: heightPercentageToDP(100),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Loading />
        </View>
      )}
    </SafeAreaView>
  );
};

export default AssetDetails;

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
  },

  centerImage: {
    position: 'absolute',
    width: '100%',
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
    paddingHorizontal: heightPercentageToDP(0.5),
  },
  bottomContainerContent: {
    fontFamily: FONT.medium,
    fontSize: heightPercentageToDP(1.6),
    paddingBottom: heightPercentageToDP(0.5),
    paddingTop: heightPercentageToDP(0.5),
    paddingHorizontal: heightPercentageToDP(1),
    borderWidth: 2,
    borderRadius: heightPercentageToDP(1),
    flex: 1,
    overflow: 'hidden'
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
  statContainer: {
    margin: heightPercentageToDP(2),
    borderRadius: heightPercentageToDP(1),
  },
  statContent: {
    flex: 1,
  },
  statContainerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: heightPercentageToDP(1.5),
  },
  statContainerContentTitle: {
    fontFamily: FONT.medium,
    fontSize: heightPercentageToDP(2),
  },
  bottomContainer: {
    height: heightPercentageToDP(15),
    alignItems: 'stretch',
    flexDirection: 'row',
    marginHorizontal: heightPercentageToDP(2),
    marginBottom: heightPercentageToDP(5),

    justifyContent: 'space-evenly',
    padding: heightPercentageToDP(2),
    gap: heightPercentageToDP(2),
    borderRadius: heightPercentageToDP(2),
  },
  buy: {
    backgroundColor: COLORS.green,
    height: heightPercentageToDP(7),
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: FONT.semibold,
    color: COLORS.white,
    borderRadius: heightPercentageToDP(1),
    borderWidth: 2,
    borderColor: COLORS.green,
    fontSize: heightPercentageToDP(2),
  },
  sell: {
    backgroundColor: COLORS.red,
    height: heightPercentageToDP(7),
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: FONT.semibold,
    color: COLORS.white,
    borderRadius: heightPercentageToDP(1),
    borderWidth: 2,
    borderColor: COLORS.red,
    fontSize: heightPercentageToDP(2),
  },
  bidAndAskContainer: {
    flexDirection: 'row',
    gap: heightPercentageToDP(1),
  },
  bidContainer: {
    flex: 1,

    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  AskContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topView: {
    height: heightPercentageToDP(0.8),
    width: widthPercentageToDP(25),
    backgroundColor: COLORS.white,
    margin: heightPercentageToDP(2),
    alignSelf: 'center',
    borderRadius: heightPercentageToDP(2),
  },
  modelContent: {
    margin: heightPercentageToDP(2),
  },
  modelParentTitle: {
    fontFamily: FONT.extrabold,
    fontSize: 15,
    textAlignVertical: 'center',
    margin: heightPercentageToDP(2),
  },
  modeltitle: {
    color: COLORS.green,
    fontFamily: FONT.regular,
    marginTop: heightPercentageToDP(2),
    marginHorizontal: heightPercentageToDP(2),
  },
  modelSubtitle: {
    marginHorizontal: heightPercentageToDP(2),
    marginBottom: heightPercentageToDP(2),
    padding: heightPercentageToDP(2),
    borderRadius: heightPercentageToDP(1),
  },
  copybtn: {
    color: COLORS.white,
    fontFamily: FONT.semibold,
    fontSize: heightPercentageToDP(2),
    backgroundColor: COLORS.green,
    margin: heightPercentageToDP(2),
    padding: heightPercentageToDP(2),
    borderRadius: heightPercentageToDP(2),
    textAlign: 'center',
  },
});

//  check

// import React, {useEffect, useRef, useState} from 'react';
// import {useDispatch, useSelector} from 'react-redux';
// import HeaderTop from '../component/profile/HeaderTop';
// import {
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   TouchableOpacity,
//   Dimensions,
//   FlatList,
//   TextInput,
// } from 'react-native';
// import {
//   heightPercentageToDP,
//   widthPercentageToDP,
// } from 'react-native-responsive-screen';
// import {LineChart} from 'react-native-chart-kit';
// import {COLORS, FONT} from '../../constants';
// import {useNavigation} from '@react-navigation/native';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import {getAssetDetails} from '../../stores/actions/assetdetailaction';
// import Loading from '../component/Loading';
// import Toast from 'react-native-toast-message';
// import URLHelper from '../api/URLhelper/URLHelper';

// const AssetDetails = ({route}) => {
//   const {itemId} = route.params;
//   const THEME = useSelector(state => state.theme);
//   const [buyPreference, setBuyPreferences] = useState('At Market');
//   const refBuyPreference = useRef(null);
//   const [buyPrice, setBuyPrice] = useState(itemId.c);
//   const [receiveAmount, setReceiveAmount] = useState(null);
//   const [totalAmount, setTotalAmount] = useState(buyPrice * receiveAmount);

//   const ACCESS_TOKEN = useSelector(state => state.userAccessToken);

//   const setBuyAssetPreference = () => {
//     if (buyPreference === 'limit') {
//       setBuyPreferences('At Market');
//     } else {
//       setBuyPreferences('limit');
//     }
//   };

//   const dispatch = useDispatch();

//   const [selectedTime, setSelectedTime] = useState();

//   const navigation = useNavigation();

//   // useEffect(() => {
//   //   const interval = setInterval(() => {
//   //     console.log('Getting Price ...');
//   //     dispatch(assetPriceDetails(itemId));
//   //   }, 3000);

//   //   return () => clearInterval(interval);
//   // }, []);

//   const {x, y, loading, assetDetailsData} = useSelector(
//     state => state.assetdetails,
//   );

//   console.log('ASSERT Loading State ::::: ' + loading);
//   console.log('ASSERT assetDetailsData ::::: ' + assetDetailsData);
//   console.log('ASSERT DATA Y LENGTH ::::: ' + y.length);

//   useEffect(() => {
//     setSelectedTime('1m');
//     dispatch(getAssetDetails(itemId.s, '1m'));
//     // dispatch(assetPriceDetails(itemId));
//   }, [buyPreference]);

//   // handling chart data
//   const oneMinute = () => {
//     dispatch({
//       type: 'clearAssetData',
//     });
//     setSelectedTime('1m');
//     dispatch(getAssetDetails(itemId.s, '1m'));
//   };

//   const fifteenMinute = () => {
//     dispatch({
//       type: 'clearAssetData',
//     });
//     setSelectedTime('15m');
//     dispatch(getAssetDetails(itemId.s, '15m'));
//   };

//   const halfHour = () => {
//     dispatch({
//       type: 'clearAssetData',
//     });
//     setSelectedTime('30m');
//     dispatch(getAssetDetails(itemId.s, '30m'));
//   };

//   const oneHour = () => {
//     dispatch({
//       type: 'clearAssetData',
//     });
//     setSelectedTime('1h');
//     dispatch(getAssetDetails(itemId.s, '1h'));
//   };

//   const oneDay = () => {
//     dispatch({
//       type: 'clearAssetData',
//     });
//     setSelectedTime('1d');
//     dispatch(getAssetDetails(itemId.s, '1d'));
//   };

//   const oneWeek = () => {
//     dispatch({
//       type: 'clearAssetData',
//     });
//     setSelectedTime('1w');
//     dispatch(getAssetDetails(itemId.s, '1w'));
//     // getMarketChartData('1w');
//   };

//   const oneMonth = () => {
//     dispatch({
//       type: 'clearAssetData',
//     });
//     setSelectedTime('1M');
//     dispatch(getAssetDetails(itemId.s, '1M'));
//     // getMarketChartData('1M');
//   };

//   const buyCrypto = () => {
//     Toast.show({
//       type: 'info',
//       text1: "Let's Buy Crypto",
//     });

//     // const getTotalAmount = (value) => {
//     //     const totatlVal = pric * receiveAmount
//     // }

//     // for uploading Profile content
//     const handleUpdateProfile = async () => {
//       if (!firstNameVal) {
//         Toast.show({
//           type: 'error',
//           text1: 'Enter your first name',
//         });
//       } else if (!secondNameVal) {
//         Toast.show({
//           type: 'error',
//           text1: 'Enter your second name',
//         });
//       } else {
//         setProgressBar(true);

//         try {
//           const bearerToken =
//             'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiMGE5ZTY1YTM2ZWQ2NDNlOWYzZDRhOGNlZTAwMDQ3Y2U1ZTE1ZDQyYWRjNzVmZTQ0NjBjMTBjNjFjOTVhOWY3NzA4NmRmYTYyOWQ3N2JlZTciLCJpYXQiOjE2OTgwNjIzMTkuNzQ2OTcxLCJuYmYiOjE2OTgwNjIzMTkuNzQ2OTc1LCJleHAiOjE3Mjk2ODQ3MTkuNzQ2MTAzLCJzdWIiOiIxMCIsInNjb3BlcyI6W119.TkRGB7JiajYr_zVD30uiT30Xe1XOKFdTR5Tdhp9w8V7gsXS1nVPWDhKzg5g4H0aZwgAs_ROmrrk32PcsQXQF4mkdAZDzxJAZJOjhsAUpzHXnmF_o4ls-YejbqV1P1cvpLIJNYm5TUV2c4H2huC4QKqD3B6Cb_p8t49G0UdB8Hl7xd39A4TqWxsbTBi_GqrX6Hm33Tmf7VvRwYEiOMpKN91lVwSRWJISMMV9q0ndKvbMerw5DtHKdAa4DWlalBOmkvRY5qJzAmYBV9-5bczKFJ1IfKtHV7072q08Ie1J7IVcXoLwSmjxtodd55PN0YCE8mCbY65qLCtD0MVTYHhQMODVpIkFz9av37veldCqcaATSzh_bkD4M1TyzVfzQ9y5f-9GW4n1DFOQ9UTGIe0NQxL33qbEyJVvsDbt4Zm_moF_MrxFPS6ZpRcuy7DYTWIgF1rMDBsAKnmHdySClsXFQFnueiVwZ3ceAf9kNCf9u1mkNR1-FTqcvm6ZQwELe5P4Nz9Y8oRMvvIDA6egK7wZi5w2iiycoTkK8m_H7yNZ5I585_a1ebL9Qx46FHd3ujNi1nIELocn7u89Y0MN_RwgyGWJ4JuP2IZatB7wrU9Be6K3mCdNmbLbZlbnN4lC2FqSFflg94jhh7VGUrFqcggMxkYr-BaY0NR8PzULK_3wHta4';

//           const formData = new FormData();
//           formData.append('first_name', firstNameVal);
//           formData.append('last_name', secondNameVal);
//           formData.append('phone', '987654312');
//           formData.append('country', 'India');
//           formData.append('gender', 'Male');

//           const response = await axios.post(URLHelper.BUY_CRYPTO, formData, {
//             headers: {
//               userapisecret: 'h0vWu6MkInNlWHJVfIXmHbIbC66cQvlbSUQI09Whbp',
//               Authorization: `Bearer ${ACCESS_TOKEN.data}`,
//               'Content-Type': 'multipart/form-data',
//             },
//           });

//           console.log('Profile updated successfully:', response.data);
//           // console.warn('Profile updated successfully:');
//           Toast.show({
//             type: 'error',
//             text1: 'Profile updated successfully',
//           });
//           setProgressBar(false);
//           navigation.goBack();
//         } catch (error) {
//           Toast.show({
//             type: 'error',
//             text1: 'Something went wrong',
//           });
//           console.log(error);
//         }
//       }
//     };
//   };
//   return (
//     <SafeAreaView
//       style={{
//         backgroundColor:
//           THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.lightGray,
//       }}>
//       <HeaderTop value={itemId.s} />

//       {/** Order Book Flat list */}

//       {assetDetailsData ? (
//         <FlatList
//           data={assetDetailsData}
//           keyExtractor={(item, index) => index.toString()}
//           contentContainerStyle={{}}
//           ListHeaderComponent={
//             <>
//               <SafeAreaView
//                 style={{
//                   backgroundColor:
//                     THEME.data === 'LIGHT' ? COLORS.lightGray : COLORS.purple,
//                   ...styles.container,
//                 }}>
//                 <Image
//                   source={require('../../assets/image/bitcoin_image.jpg')}
//                   style={styles.centerImage}
//                 />

//                 {y.length > 0 ? (
//                   <>
//                     <View style={styles.chart}>
//                       <LineChart
//                         data={{
//                           datasets: [
//                             {
//                               data: y,
//                             },
//                           ],
//                         }}
//                         width={Dimensions.get('window').width}
//                         height={heightPercentageToDP(30)}
//                         yAxisLabel="$"
//                         yAxisSuffix="k"
//                         animateTogether
//                         isAnimated={true}
//                         yAxisInterval={1}
//                         chartConfig={{
//                           backgroundGradientFrom:
//                             THEME.data === 'DARK'
//                               ? COLORS.skyBlue
//                               : COLORS.lightGray,
//                           backgroundGradientTo:
//                             THEME.data === 'DARK' ? COLORS.purple : COLORS.card,
//                           decimalPlaces: 2,

//                           color: (opacity = 1) => `rgba(255, 0, 0, 1)`, // Set opacity to 1 (fully opaque)
//                           labelColor: (opacity = 0) => `rgba(255, 255, 255, 0)`, // Set opacity to 0 (fully transparent)
//                           style: {
//                             borderRadius: 2,
//                           },
//                         }}
//                         bezier
//                         style={{
//                           marginTop: heightPercentageToDP(10),
//                           borderRadius: 16,
//                           paddingRight: 0,
//                         }}
//                         withShadow
//                         withHorizontalLines={false}
//                         withDots={false}
//                         withInnerLines={false}
//                         withOuterLines={false}
//                         withVerticalLabels={false} // Remove vertical labels
//                         withHorizontalLabels={false} // Remove horizontal labels
//                         withVerticalLines={false}
//                       />
//                     </View>

//                     <View style={styles.containerBottom}>
//                       <TouchableOpacity onPress={oneMinute}>
//                         <Text
//                           style={{
//                             color:
//                               THEME.data === 'DARK'
//                                 ? COLORS.white
//                                 : COLORS.purpleDark,
//                             backgroundColor:
//                               THEME.data === 'DARK'
//                                 ? COLORS.purple
//                                 : COLORS.white,
//                             borderColor:
//                               selectedTime == '1m'
//                                 ? COLORS.green
//                                 : THEME.data === 'DARK'
//                                 ? COLORS.purpleDark
//                                 : COLORS.lightGray,
//                             ...styles.bottomContainerContent,
//                           }}>
//                           1m
//                         </Text>
//                       </TouchableOpacity>
//                       <TouchableOpacity onPress={fifteenMinute}>
//                         <Text
//                           style={{
//                             color:
//                               THEME.data === 'DARK'
//                                 ? COLORS.white
//                                 : COLORS.purpleDark,
//                             backgroundColor:
//                               THEME.data === 'DARK'
//                                 ? COLORS.purple
//                                 : COLORS.white,
//                             borderColor:
//                               selectedTime == '15m'
//                                 ? COLORS.green
//                                 : THEME.data === 'DARK'
//                                 ? COLORS.purpleDark
//                                 : COLORS.lightGray,
//                             ...styles.bottomContainerContent,
//                           }}>
//                           15m
//                         </Text>
//                       </TouchableOpacity>
//                       <TouchableOpacity onPress={halfHour}>
//                         <Text
//                           style={{
//                             color:
//                               THEME.data === 'DARK'
//                                 ? COLORS.white
//                                 : COLORS.purpleDark,
//                             backgroundColor:
//                               THEME.data === 'DARK'
//                                 ? COLORS.purple
//                                 : COLORS.white,
//                             borderColor:
//                               selectedTime == '30m'
//                                 ? COLORS.green
//                                 : THEME.data === 'DARK'
//                                 ? COLORS.purpleDark
//                                 : COLORS.lightGray,
//                             ...styles.bottomContainerContent,
//                           }}>
//                           30m
//                         </Text>
//                       </TouchableOpacity>
//                       <TouchableOpacity onPress={oneHour}>
//                         <Text
//                           style={{
//                             color:
//                               THEME.data === 'DARK'
//                                 ? COLORS.white
//                                 : COLORS.purpleDark,
//                             backgroundColor:
//                               THEME.data === 'DARK'
//                                 ? COLORS.purple
//                                 : COLORS.white,
//                             borderColor:
//                               selectedTime == '1h'
//                                 ? COLORS.green
//                                 : THEME.data === 'DARK'
//                                 ? COLORS.purpleDark
//                                 : COLORS.lightGray,
//                             ...styles.bottomContainerContent,
//                           }}>
//                           1h
//                         </Text>
//                       </TouchableOpacity>
//                       <TouchableOpacity onPress={oneDay}>
//                         <Text
//                           style={{
//                             color:
//                               THEME.data === 'DARK'
//                                 ? COLORS.white
//                                 : COLORS.purpleDark,
//                             backgroundColor:
//                               THEME.data === 'DARK'
//                                 ? COLORS.purple
//                                 : COLORS.white,
//                             borderColor:
//                               selectedTime == '1d'
//                                 ? COLORS.green
//                                 : THEME.data === 'DARK'
//                                 ? COLORS.purpleDark
//                                 : COLORS.lightGray,
//                             ...styles.bottomContainerContent,
//                           }}>
//                           1d
//                         </Text>
//                       </TouchableOpacity>
//                       <TouchableOpacity onPress={oneWeek}>
//                         <Text
//                           style={{
//                             color:
//                               THEME.data === 'DARK'
//                                 ? COLORS.white
//                                 : COLORS.purpleDark,
//                             backgroundColor:
//                               THEME.data === 'DARK'
//                                 ? COLORS.purple
//                                 : COLORS.white,
//                             borderColor:
//                               selectedTime == '1w'
//                                 ? COLORS.green
//                                 : THEME.data === 'DARK'
//                                 ? COLORS.purpleDark
//                                 : COLORS.lightGray,
//                             ...styles.bottomContainerContent,
//                           }}>
//                           1w
//                         </Text>
//                       </TouchableOpacity>

//                       <TouchableOpacity onPress={oneMonth}>
//                         <Text
//                           style={{
//                             color:
//                               THEME.data === 'DARK'
//                                 ? COLORS.white
//                                 : COLORS.purpleDark,
//                             backgroundColor:
//                               THEME.data === 'DARK'
//                                 ? COLORS.purple
//                                 : COLORS.white,
//                             borderColor:
//                               selectedTime == '1M'
//                                 ? COLORS.green
//                                 : THEME.data === 'DARK'
//                                 ? COLORS.purpleDark
//                                 : COLORS.lightGray,
//                             ...styles.bottomContainerContent,
//                           }}>
//                           1M
//                         </Text>
//                       </TouchableOpacity>
//                     </View>
//                   </>
//                 ) : (
//                   <View>
//                     <Loading />
//                   </View>
//                 )}
//               </SafeAreaView>
//             </>
//           }
//           renderItem={({item, index}) => {
//             return (
//               <View style={{marginHorizontal: heightPercentageToDP(1)}}>
//                 {/* Bid and Ask Container */}

//                 <View style={styles.bidAndAskContainer}>
//                   <View style={styles.bidContainer}>
//                     <Text
//                       style={{
//                         fontFamily: FONT.regular,
//                         fontSize: heightPercentageToDP(1.5),
//                         color:
//                           THEME.data === 'DARK'
//                             ? COLORS.white
//                             : COLORS.purpleDark,
//                       }}>
//                       {item[1]}
//                     </Text>
//                     <Text
//                       style={{
//                         fontFamily: FONT.regular,
//                         fontSize: heightPercentageToDP(1.5),
//                         color: COLORS.green,
//                       }}>
//                       {item[0]}
//                     </Text>
//                   </View>

//                   <View style={styles.AskContainer}>
//                     <Text
//                       style={{
//                         fontFamily: FONT.regular,
//                         fontSize: heightPercentageToDP(1.5),
//                         color: COLORS.red,
//                       }}>
//                       {item[1]}
//                     </Text>
//                     <Text
//                       style={{
//                         fontFamily: FONT.regular,
//                         fontSize: heightPercentageToDP(1.5),
//                         color:
//                           THEME.data === 'DARK'
//                             ? COLORS.white
//                             : COLORS.purpleDark,
//                       }}>
//                       {item[0]}
//                     </Text>
//                   </View>
//                 </View>
//               </View>
//             );
//           }}
//           ListFooterComponent={
//             assetDetailsData && (
//               <View
//                 style={{
//                   backgroundColor:
//                     THEME.data === 'DARK' ? COLORS.purpleDark : COLORS.white,
//                 }}>
//                 <Text
//                   style={{
//                     color:
//                       THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
//                     fontFamily: FONT.bold,
//                     fontSize: heightPercentageToDP(2.5),
//                     alignSelf: 'flex-start',
//                     marginStart: heightPercentageToDP(2),
//                     marginTop: heightPercentageToDP(2),
//                   }}>
//                   Stats
//                 </Text>

//                 <View
//                   style={{
//                     backgroundColor:
//                       THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.lightGray,
//                     ...styles.statContainer,
//                   }}>
//                   {/** content */}
//                   <View
//                     style={{
//                       ...styles.statContainerContent,
//                     }}>
//                     <Text
//                       style={{
//                         color:
//                           THEME.data === 'DARK'
//                             ? COLORS.white
//                             : COLORS.purpleDark,
//                         ...styles.statContainerContentTitle,
//                       }}>
//                       Close Price
//                     </Text>
//                     <Text
//                       style={{
//                         color:
//                           THEME.data === 'DARK'
//                             ? COLORS.white
//                             : COLORS.purpleDark,
//                         ...styles.statContainerContentTitle,
//                       }}
//                       numberOfLines={1}>
//                       {Number.parseFloat(
//                         assetDetailsData.prevClosePrice,
//                       ).toFixed(2)}
//                     </Text>
//                   </View>

//                   <View
//                     style={{
//                       ...styles.statContainerContent,
//                     }}>
//                     <Text
//                       style={{
//                         color:
//                           THEME.data === 'DARK'
//                             ? COLORS.white
//                             : COLORS.purpleDark,
//                         ...styles.statContainerContentTitle,
//                       }}>
//                       Open Price
//                     </Text>
//                     <Text
//                       style={{
//                         color:
//                           THEME.data === 'DARK'
//                             ? COLORS.white
//                             : COLORS.purpleDark,
//                         ...styles.statContainerContentTitle,
//                       }}
//                       numberOfLines={1}>
//                       {Number.parseFloat(assetDetailsData.openPrice).toFixed(2)}
//                     </Text>
//                   </View>

//                   <View
//                     style={{
//                       ...styles.statContainerContent,
//                     }}>
//                     <Text
//                       style={{
//                         color:
//                           THEME.data === 'DARK'
//                             ? COLORS.white
//                             : COLORS.purpleDark,
//                         ...styles.statContainerContentTitle,
//                       }}>
//                       24h High Price
//                     </Text>
//                     <Text
//                       style={{
//                         color:
//                           THEME.data === 'DARK'
//                             ? COLORS.white
//                             : COLORS.purpleDark,
//                         ...styles.statContainerContentTitle,
//                       }}
//                       numberOfLines={1}>
//                       {Number.parseFloat(assetDetailsData.highPrice).toFixed(2)}
//                     </Text>
//                   </View>

//                   <View
//                     style={{
//                       ...styles.statContainerContent,
//                     }}>
//                     <Text
//                       style={{
//                         color:
//                           THEME.data === 'DARK'
//                             ? COLORS.white
//                             : COLORS.purpleDark,
//                         ...styles.statContainerContentTitle,
//                       }}>
//                       24h Low Price
//                     </Text>
//                     <Text
//                       style={{
//                         color:
//                           THEME.data === 'DARK'
//                             ? COLORS.white
//                             : COLORS.purpleDark,
//                         ...styles.statContainerContentTitle,
//                       }}
//                       numberOfLines={1}>
//                       {Number.parseFloat(assetDetailsData.lowPrice).toFixed(2)}
//                     </Text>
//                   </View>

//                   <View
//                     style={{
//                       ...styles.statContainerContent,
//                     }}>
//                     <Text
//                       style={{
//                         color:
//                           THEME.data === 'DARK'
//                             ? COLORS.white
//                             : COLORS.purpleDark,
//                         ...styles.statContainerContentTitle,
//                       }}>
//                       Current Price
//                     </Text>
//                     <Text
//                       style={{
//                         color:
//                           THEME.data === 'DARK'
//                             ? COLORS.white
//                             : COLORS.purpleDark,
//                         ...styles.statContainerContentTitle,
//                       }}
//                       numberOfLines={1}>
//                       {itemId.c}
//                     </Text>
//                   </View>

//                   <View
//                     style={{
//                       ...styles.statContainerContent,
//                     }}>
//                     <Text
//                       style={{
//                         color:
//                           THEME.data === 'DARK'
//                             ? COLORS.white
//                             : COLORS.purpleDark,
//                         ...styles.statContainerContentTitle,
//                       }}>
//                       24h Volume
//                     </Text>
//                     <Text
//                       style={{
//                         color:
//                           THEME.data === 'DARK'
//                             ? COLORS.white
//                             : COLORS.purpleDark,
//                         ...styles.statContainerContentTitle,
//                       }}
//                       numberOfLines={1}>
//                       {Number.parseFloat(assetDetailsData.volume).toFixed(2)}
//                     </Text>
//                   </View>
//                 </View>

//                 {/** Crypto Buy container */}

//                 <View>
//                   {/** for Buy Preferences */}
//                   <TouchableOpacity
//                     activeOpacity={0.1}
//                     ref={refBuyPreference}
//                     onPress={setBuyAssetPreference}
//                     style={{
//                       flexDirection: 'row',
//                       backgroundColor:
//                         THEME.data === 'DARK'
//                           ? COLORS.skyBlue
//                           : COLORS.lightGray,
//                       margin: heightPercentageToDP(2),
//                       padding: heightPercentageToDP(2),
//                       borderRadius: heightPercentageToDP(2),
//                       justifyContent: 'space-between',
//                     }}>
//                     <View>
//                       <Text
//                         style={{
//                           fontFamily: FONT.regular,
//                           fontSize: heightPercentageToDP(2),
//                           color:
//                             THEME.data === 'DARK'
//                               ? COLORS.white
//                               : COLORS.purpleDark,
//                         }}>
//                         {buyPreference}
//                       </Text>
//                     </View>
//                     <View>
//                       <AntDesign
//                         name={'caretdown'}
//                         size={12}
//                         color={
//                           THEME.data === 'DARK'
//                             ? COLORS.white
//                             : COLORS.purpleDark
//                         }
//                       />
//                     </View>
//                   </TouchableOpacity>

//                   {/** for Price  */}

//                   <View
//                     style={{
//                       backgroundColor:
//                         THEME.data === 'DARK'
//                           ? COLORS.skyBlue
//                           : COLORS.lightGray,
//                       margin: heightPercentageToDP(2),

//                       borderRadius: heightPercentageToDP(2),
//                       justifyContent: 'space-between',
//                       alignItems: 'center',
//                     }}>
//                     <View>
//                       <Text
//                         style={{
//                           fontFamily: FONT.regular,
//                           fontSize: heightPercentageToDP(2),
//                           color:
//                             THEME.data === 'DARK'
//                               ? COLORS.white
//                               : COLORS.purpleDark,
//                         }}>
//                         Price
//                       </Text>
//                     </View>
//                     <TextInput
//                       inputMode="decimal"
//                       cursorColor={
//                         THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark
//                       }
//                       placeholderTextColor={
//                         THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark
//                       }
//                       onChangeText={setBuyPrice}
//                       placeholder="Total"
//                       value={buyPrice}
//                       style={{
//                         color:
//                           THEME.data === 'DARK'
//                             ? COLORS.white
//                             : COLORS.purpleDark,
//                         backgroundColor:
//                           THEME.data === 'DARK'
//                             ? COLORS.purpleDark
//                             : COLORS.white,
//                         borderColor:
//                           THEME.data === 'DARK'
//                             ? COLORS.skyBlue
//                             : COLORS.lightGray,
//                         width: '95%',
//                         fontFamily: FONT.regular,
//                         padding: heightPercentageToDP(1),
//                         fontSize: heightPercentageToDP(2),
//                         borderRadius: heightPercentageToDP(1),
//                         margin: heightPercentageToDP(1),
//                         textAlign: 'center',
//                       }}></TextInput>

//                     <TextInput
//                       inputMode="decimal"
//                       placeholder="Amount"
//                       cursorColor={
//                         THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark
//                       }
//                       placeholderTextColor={
//                         THEME.data === 'DARK' ? COLORS.white : COLORS.gray2
//                       }
//                       onChangeText={setReceiveAmount}
//                       value={receiveAmount}
//                       style={{
//                         color:
//                           THEME.data === 'DARK'
//                             ? COLORS.white
//                             : COLORS.purpleDark,
//                         backgroundColor:
//                           THEME.data === 'DARK'
//                             ? COLORS.purpleDark
//                             : COLORS.white,
//                         borderColor:
//                           THEME.data === 'DARK'
//                             ? COLORS.skyBlue
//                             : COLORS.lightGray,
//                         width: '95%',
//                         fontFamily: FONT.regular,
//                         padding: heightPercentageToDP(1),
//                         fontSize: heightPercentageToDP(2),

//                         borderRadius: heightPercentageToDP(1),
//                         margin: heightPercentageToDP(1),
//                         textAlign: 'center',
//                       }}></TextInput>
//                   </View>

//                   {/** for Total  */}

//                   <View
//                     style={{
//                       backgroundColor:
//                         THEME.data === 'DARK'
//                           ? COLORS.skyBlue
//                           : COLORS.lightGray,
//                       margin: heightPercentageToDP(2),

//                       borderRadius: heightPercentageToDP(2),
//                       justifyContent: 'space-between',
//                       alignItems: 'center',
//                     }}>
//                     <View>
//                       <Text
//                         style={{
//                           fontFamily: FONT.regular,
//                           fontSize: heightPercentageToDP(2),
//                           color:
//                             THEME.data === 'DARK'
//                               ? COLORS.white
//                               : COLORS.purpleDark,
//                         }}>
//                         Total
//                       </Text>
//                     </View>
//                     <TextInput
//                       inputMode="decimal"
//                       placeholder="(USDT)"
//                       cursorColor={
//                         THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark
//                       }
//                       placeholderTextColor={
//                         THEME.data === 'DARK' ? COLORS.white : COLORS.gra
//                       }
//                       value={totalAmount}
//                       style={{
//                         color:
//                           THEME.data === 'DARK'
//                             ? COLORS.white
//                             : COLORS.purpleDark,
//                         backgroundColor:
//                           THEME.data === 'DARK'
//                             ? COLORS.purpleDark
//                             : COLORS.white,
//                         borderColor:
//                           THEME.data === 'DARK'
//                             ? COLORS.skyBlue
//                             : COLORS.lightGray,
//                         width: '95%',
//                         fontFamily: FONT.regular,
//                         padding: heightPercentageToDP(1),
//                         fontSize: heightPercentageToDP(2),
//                         borderRadius: heightPercentageToDP(1),
//                         margin: heightPercentageToDP(1),
//                         textAlign: 'center',
//                       }}></TextInput>
//                   </View>

//                   {/** for Price Bottom Current Details  */}

//                   <View
//                     style={{
//                       backgroundColor:
//                         THEME.data === 'DARK'
//                           ? COLORS.skyBlue
//                           : COLORS.lightGray,
//                       margin: heightPercentageToDP(2),
//                       borderRadius: heightPercentageToDP(2),
//                       justifyContent: 'space-between',
//                       padding: heightPercentageToDP(1),
//                       alignItems: 'center',
//                     }}>
//                     {/** Available balance */}
//                     <View
//                       style={{
//                         flexDirection: 'row',
//                         justifyContent: 'space-between',
//                         alignSelf: 'stretch',
//                         paddingHorizontal: heightPercentageToDP(2),
//                       }}>
//                       <View>
//                         <Text
//                           style={{
//                             fontFamily: FONT.regular,
//                             fontSize: heightPercentageToDP(2),
//                             color:
//                               THEME.data === 'DARK'
//                                 ? COLORS.white
//                                 : COLORS.gray,
//                           }}>
//                           Available Balance
//                         </Text>
//                       </View>

//                       <View>
//                         <Text
//                           style={{
//                             fontFamily: FONT.regular,
//                             fontSize: heightPercentageToDP(2),
//                             color:
//                               THEME.data === 'DARK'
//                                 ? COLORS.white
//                                 : COLORS.purpleDark,
//                           }}>
//                           2.01 USDT
//                         </Text>
//                       </View>
//                     </View>

//                     {/** Max Buy */}
//                     <View
//                       style={{
//                         flexDirection: 'row',
//                         justifyContent: 'space-between',
//                         alignSelf: 'stretch',
//                         paddingHorizontal: heightPercentageToDP(2),
//                       }}>
//                       <View>
//                         <Text
//                           style={{
//                             fontFamily: FONT.regular,
//                             fontSize: heightPercentageToDP(2),
//                             color:
//                               THEME.data === 'DARK'
//                                 ? COLORS.white
//                                 : COLORS.gray,
//                           }}>
//                           Max Buy
//                         </Text>
//                       </View>

//                       <View>
//                         <Text
//                           style={{
//                             fontFamily: FONT.regular,
//                             fontSize: heightPercentageToDP(2),
//                             color:
//                               THEME.data === 'DARK'
//                                 ? COLORS.white
//                                 : COLORS.purpleDark,
//                           }}>
//                           0.008 BTC
//                         </Text>
//                       </View>
//                     </View>

//                     {/** Estimated Fee */}
//                     <View
//                       style={{
//                         flexDirection: 'row',
//                         justifyContent: 'space-between',
//                         alignSelf: 'stretch',
//                         paddingHorizontal: heightPercentageToDP(2),
//                       }}>
//                       <View>
//                         <Text
//                           style={{
//                             fontFamily: FONT.regular,
//                             fontSize: heightPercentageToDP(2),
//                             color:
//                               THEME.data === 'DARK'
//                                 ? COLORS.white
//                                 : COLORS.gray,
//                           }}>
//                           Est. Fee
//                         </Text>
//                       </View>

//                       <View>
//                         <Text
//                           style={{
//                             fontFamily: FONT.regular,
//                             fontSize: heightPercentageToDP(2),
//                             color:
//                               THEME.data === 'DARK'
//                                 ? COLORS.white
//                                 : COLORS.purpleDark,
//                           }}>
//                           0.002 BTC
//                         </Text>
//                       </View>
//                     </View>
//                   </View>
//                 </View>

//                 {/** BUY AND SELL CONTAINER */}
//                 <TouchableOpacity
//                   style={{
//                     backgroundColor:
//                       THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.lightGray,
//                     ...styles.bottomContainer,
//                   }}
//                   onPress={buyCrypto}>
//                   <Text style={styles.buy}>Buy</Text>
//                   {/**  <Text style={styles.sell}>Sell</Text> */}
//                 </TouchableOpacity>
//               </View>
//             )
//           }
//         />
//       ) : (
//         <View
//           style={{
//             height: heightPercentageToDP(90),
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}>
//           <Loading />
//         </View>
//       )}
//     </SafeAreaView>
//   );
// };

// export default AssetDetails;

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
//   },

//   centerImage: {
//     position: 'absolute',
//     width: '100%',
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
//     paddingHorizontal: heightPercentageToDP(0.5),
//   },
//   bottomContainerContent: {
//     fontFamily: FONT.medium,
//     fontSize: heightPercentageToDP(1.6),
//     paddingBottom: heightPercentageToDP(0.5),
//     paddingTop: heightPercentageToDP(0.5),
//     paddingHorizontal: heightPercentageToDP(1),
//     borderWidth: 2,
//     borderRadius: heightPercentageToDP(1),
//     flex: 1,
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
//   statContainer: {
//     margin: heightPercentageToDP(2),
//     borderRadius: heightPercentageToDP(1),
//   },
//   statContent: {
//     flex: 1,
//   },
//   statContainerContent: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     padding: heightPercentageToDP(1.5),
//   },
//   statContainerContentTitle: {
//     fontFamily: FONT.medium,
//     fontSize: heightPercentageToDP(2),
//   },
//   bottomContainer: {
//     height: heightPercentageToDP(15),
//     alignItems: 'stretch',
//     flexDirection: 'row',
//     marginHorizontal: heightPercentageToDP(2),
//     marginBottom: heightPercentageToDP(5),

//     justifyContent: 'space-evenly',
//     padding: heightPercentageToDP(2),
//     gap: heightPercentageToDP(2),
//     borderRadius: heightPercentageToDP(2),
//   },
//   buy: {
//     backgroundColor: COLORS.green,
//     height: heightPercentageToDP(7),
//     flex: 1,
//     textAlign: 'center',
//     textAlignVertical: 'center',
//     fontFamily: FONT.semibold,
//     color: COLORS.white,
//     borderRadius: heightPercentageToDP(1),
//     borderWidth: 2,
//     borderColor: COLORS.green,
//     fontSize: heightPercentageToDP(2),
//   },
//   sell: {
//     backgroundColor: COLORS.red,
//     height: heightPercentageToDP(6),
//     flex: 1,
//     textAlign: 'center',
//     textAlignVertical: 'center',
//     fontFamily: FONT.semibold,
//     fontSize: heightPercentageToDP(2),
//     color: COLORS.white,
//     borderRadius: heightPercentageToDP(1),
//     borderWidth: 2,
//     borderColor: COLORS.red,
//   },
//   bidAndAskContainer: {
//     flexDirection: 'row',
//     gap: heightPercentageToDP(1),
//   },
//   bidContainer: {
//     flex: 1,

//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   AskContainer: {
//     flex: 1,

//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   topView: {
//     height: heightPercentageToDP(0.8),
//     width: widthPercentageToDP(25),
//     backgroundColor: COLORS.white,
//     margin: heightPercentageToDP(2),
//     alignSelf: 'center',
//     borderRadius: heightPercentageToDP(2),
//   },
//   modelContent: {
//     margin: heightPercentageToDP(2),
//   },
//   modelParentTitle: {
//     fontFamily: FONT.extrabold,
//     fontSize: 15,
//     textAlignVertical: 'center',
//     margin: heightPercentageToDP(2),
//   },
//   modeltitle: {
//     color: COLORS.green,
//     fontFamily: FONT.regular,
//     marginTop: heightPercentageToDP(2),
//     marginHorizontal: heightPercentageToDP(2),
//   },
//   modelSubtitle: {
//     marginHorizontal: heightPercentageToDP(2),
//     marginBottom: heightPercentageToDP(2),
//     padding: heightPercentageToDP(2),
//     borderRadius: heightPercentageToDP(1),
//   },
//   copybtn: {
//     color: COLORS.white,
//     fontFamily: FONT.semibold,
//     fontSize: heightPercentageToDP(2),
//     backgroundColor: COLORS.green,
//     margin: heightPercentageToDP(2),
//     padding: heightPercentageToDP(2),
//     borderRadius: heightPercentageToDP(2),
//     textAlign: 'center',
//   },
// });
