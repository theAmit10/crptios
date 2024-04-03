import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONT} from '../../../constants';
import HeaderTop from '../../component/profile/HeaderTop';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import Chart from '../../component/home/Chart';
import URLHelper from '../../api/URLhelper/URLHelper';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import {
  getINRtoUSDTCurrencyDetails,
  getUSDTtoINRCurrencyDetails,
} from '../../../stores/actions/tradeaction';
import Loading from '../../component/Loading';
import {useNavigation} from '@react-navigation/native';
import {getMyProfit} from '../../../stores/actions/profitaction';

const KnowYourCrypto = () => {
  const THEME = useSelector(state => state.theme);
  const ACCESS_TOKEN = useSelector(state => state.userAccessToken);
  const {allprofit} = useSelector(state => state.profitData);

  const navigation = useNavigation();

  const dispatch = useDispatch();

  const [minLineAbout, setMinLineAbout] = useState(1);

  const [aboutCoin, setAboutCoin] = useState(null);
  const [aboutCoinListing, setAboutCoinListing] = useState(null);

  const {currDetailsINRtoUSDt, currDetailsUSDTtoINR} = useSelector(
    state => state.tradeDetails,
  );

  // Fetch data when the component mounts
  useEffect(() => {
    dispatch(getMyProfit(ACCESS_TOKEN.data));

    getDetailAboutCoin();
    console.log('Hey from EFFECt');
  }, []);

  useEffect(() => {
    dispatch(getINRtoUSDTCurrencyDetails(ACCESS_TOKEN.data));
    // dispatch(getUSDTtoINRCurrencyDetails(ACCESS_TOKEN.data));
    addDetailsToView();
  }, [aboutCoin, setAboutCoinListing]);

  const toggleTheme = () => {
    const newTheme = THEME.data === 'DARK' ? 'LIGHT' : 'DARK';
    dispatch(changeTheme(newTheme));
  };

  const getDetailAboutCoin = async () => {
    const apiUrl = URLHelper.ABOUT_CRYPTO;

    const headers = {
      userapisecret: 'h0vWu6MkInNlWHJVfIXmHbIbC66cQvlbSUQI09Whbp',
      Authorization: `Bearer ${ACCESS_TOKEN.data}`,
    };

    try {
      const response = await axios.get(apiUrl, {headers});
      console.log('REQUEST STARTED');
      // console.log('Response About Crypto:', response.data.feature_list);
      console.log('Response About Crypto:', response.data);
      setAboutCoin(response.data);
      // setAboutCoin(response.data.feature_list);

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

  console.log('About Coin Length :: ' + aboutCoin?.length);
  console.log(currDetailsINRtoUSDt?.length, currDetailsUSDTtoINR?.length);

  const addDetailsToView = () => {
    if (aboutCoin) {
      console.log(aboutCoin.landing_description);
      console.log(aboutCoin.feature_list.length);
      setAboutCoinListing(aboutCoin.feature_list);
    }
  };

  const showMoreData = () => {
    const val = minLineAbout + 1;
    setMinLineAbout(val);
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor:
          THEME.data === 'DARK' ? COLORS.purpleDark : COLORS.white,
        ...styles.mainCointer,
      }}>
      <HeaderTop value={'KnowYourCrypto'} />

      {aboutCoin ? (
        <ScrollView>
          {/** Content Container */}

          <View>
            {allprofit && (
              <View>
                <Chart
                  containerStyles={{
                    marginTop: heightPercentageToDP(2),
                  }}
                  chartData={allprofit}
                />
              </View>
            )}
          </View>

          {/** Middle Container
        <View
            style={{
              ...styles.middleContent,
            }}>
            <View style={{flex: 1}}>
              <Text
                style={{
                  color: THEME.data === 'DARK' ? COLORS.white : COLORS.gray2,
                  ...styles.subtitle,
                  flex: 1,
                }}>
                Price
              </Text>
              <Text
                style={{
                  color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                  ...styles.title,
                }}
                numberOfLines={1}>
                $34,126
              </Text>
            </View>
            <View style={{flex: 1}}>
              <Text
                style={{
                  color: THEME.data === 'DARK' ? COLORS.white : COLORS.gray2,
                  ...styles.subtitle,
                  flex: 1,
                }}>
                24h Change
              </Text>
              <Text
                style={{
                  color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                  ...styles.title,
                }}
                numberOfLines={1}>
                1.11%
              </Text>
            </View>
            <View style={{flex: 1}}>
              <Text
                style={{
                  color: THEME.data === 'DARK' ? COLORS.white : COLORS.gray2,
                  ...styles.subtitle,
                  flex: 1,
                }}>
                24h Volume
              </Text>
              <Text
                style={{
                  color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                  ...styles.title,
                }}
                numberOfLines={1}>
                $64,126
              </Text>
            </View>
            <View style={{flex: 1}}>
              <Text
                style={{
                  color: THEME.data === 'DARK' ? COLORS.white : COLORS.gray2,
                  ...styles.subtitle,
                  flex: 1,
                }}>
                Market Cap
              </Text>
              <Text
                style={{
                  color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                  ...styles.title,
                }}
                numberOfLines={1}>
                $34,126
              </Text>
            </View>
          </View>
        
        */}

          {/** About Coin Container */}

          <View
            style={{
              backgroundColor:
                THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.lightGray,
              ...styles.aboutCoinContainer,
            }}>
            <Text
              style={{
                color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                fontFamily: FONT.bold,
                fontSize: heightPercentageToDP(2.5),
                marginVertical: heightPercentageToDP(1),
              }}>
              About Coin
            </Text>

            <View
              style={{
                backgroundColor:
                  THEME.data === 'DARK' ? COLORS.purple : COLORS.white,
                borderColor:
                  THEME.data === 'DARK' ? COLORS.purple : COLORS.white,
                ...styles.aboutContentTopData,
              }}>
              <View style={styles.aboutLeft}>
                <MaterialCommunityIcons
                  name="bitcoin"
                  size={heightPercentageToDP(4)}
                  color="orange"
                  style={{alignSelf: 'center', opacity: 0.9}}
                />
              </View>
              <View style={styles.aboutMiddle}>
                <Text
                  style={{
                    color:
                      THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                    ...styles.aboutMiddleTitle,
                  }}>
                  Digital Cash
                </Text>
                <Text
                  style={{
                    color:
                      THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                    ...styles.subtitle,
                  }}
                  numberOfLines={1}>
                  1 USDT ={' '}
                  {Number.parseFloat(currDetailsINRtoUSDt?.rate).toFixed(0) +
                    ' ' +
                    currDetailsINRtoUSDt?.exchange_fee_UNIT}
                </Text>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('Trade')}>
                <Text
                  style={{
                    color: COLORS.white,
                    fontFamily: FONT.regular,
                    fontSize: heightPercentageToDP(2),
                    backgroundColor: COLORS.green,
                    margin: heightPercentageToDP(2),
                    padding: heightPercentageToDP(1),
                    borderRadius: heightPercentageToDP(1),
                    textAlign: 'center',
                    overflow: "hidden"
                  }}>
                  Trade
                </Text>
              </TouchableOpacity>
            </View>

            <Text
              style={{
                color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                ...styles.subtitle,
              }}
              numberOfLines={minLineAbout}
              className="mt-2 mb-2">
              {aboutCoin.landing_description}
            </Text>

            <TouchableOpacity
              onPress={showMoreData}
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={styles.showmore}>Show more</Text>
              <AntDesign
                name="down"
                size={heightPercentageToDP(2)}
                color={COLORS.green}
                style={{alignSelf: 'center', opacity: 0.9}}
              />
            </TouchableOpacity>
          </View>

          {/** news and events */}

          <Text
            style={{
              color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
              fontFamily: FONT.bold,
              fontSize: heightPercentageToDP(2.5),
              margin: heightPercentageToDP(2),
            }}>
            News & Events About USDT
          </Text>

          {/** new data */}

          {aboutCoinListing &&
            aboutCoinListing.map((item, index) => (
              <View
                key={index}
                style={{
                  backgroundColor:
                    THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.lightGray,
                  borderColor:
                    THEME.data === 'DARK' ? COLORS.purple : COLORS.white,
                  ...styles.newsContainer,
                }}>
                <View
                  style={{
                    ...styles.newsLeft,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <MaterialCommunityIcons
                    name="newspaper-variant-multiple"
                    size={heightPercentageToDP(5)}
                    color={
                      THEME.data === 'LIGHT' ? COLORS.skyBlue : COLORS.lightGray
                    }
                    style={{alignSelf: 'center', opacity: 0.9}}
                  />
                </View>
                <View style={styles.newsRight}>
                  <Text
                    style={{
                      color:
                        THEME.data === 'DARK'
                          ? COLORS.white
                          : COLORS.purpleDark,
                      ...styles.subtitle,
                    }}
                    className="mt-2 mb-2"
                    numberOfLines={3}>
                    {item.description}
                    <Text style={styles.showmore}> Show more</Text>
                  </Text>
                </View>
              </View>
            ))}

          {/** 
               * <View
            style={{
              backgroundColor:
                THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.lightGray,
              borderColor: THEME.data === 'DARK' ? COLORS.purple : COLORS.white,
              ...styles.newsContainer,
            }}>
            <View style={styles.newsLeft}></View>
            <View style={styles.newsRight}>
              <Text
                style={{
                  color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                  ...styles.subtitle,
                }}
                className="mt-2 mb-2"
                numberOfLines={3}>
                It is an altcoin that was forked from the Bitcoin from the Bitcoin
                Protocol. It is also a
                <Text style={styles.showmore}> Show more</Text>
              </Text>
            </View>
          </View>
               * 
               */}
        </ScrollView>
      ) : (
        <Loading />
      )}
    </SafeAreaView>
  );
};

export default KnowYourCrypto;

const styles = StyleSheet.create({
  mainCointer: {
    flex: 1,
  },
  middleContent: {
    margin: heightPercentageToDP(2),
    padding: heightPercentageToDP(1),
    borderRadius: heightPercentageToDP(2),
    flexDirection: 'row',
    gap: heightPercentageToDP(2),
  },

  aboutCoinContainer: {
    margin: heightPercentageToDP(2),
    padding: heightPercentageToDP(1),
    borderRadius: heightPercentageToDP(2),
  },
  aboutContentTopData: {
    height: heightPercentageToDP(10),
    flexDirection: 'row',

    borderRadius: heightPercentageToDP(2),

    borderWidth: 1,
  },
  leftContainer: {
    width: widthPercentageToDP(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontFamily: FONT.regular,
    fontSize: heightPercentageToDP(2),
  },
  subtitle: {
    fontFamily: FONT.regular,
    fontSize: heightPercentageToDP(2),
  },
  tradeBtn: {
    color: COLORS.white,
    fontFamily: FONT.regular,
    fontSize: heightPercentageToDP(2),
    backgroundColor: COLORS.green,
    margin: heightPercentageToDP(2),
    padding: heightPercentageToDP(1),
    borderRadius: heightPercentageToDP(1),
    textAlign: 'center',
    
  },
  aboutContentTop: {
    height: heightPercentageToDP(8),
    backgroundColor: COLORS.purple,
    borderColor: COLORS.purpleDark,
    borderRadius: heightPercentageToDP(2),
    flexDirection: 'row',
  },
  aboutLeft: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  aboutMiddle: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  aboutRight: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  aboutMiddleTitle: {
    fontFamily: FONT.semibold,
    fontSize: heightPercentageToDP(2),
  },
  showmore: {
    color: COLORS.green,
    fontFamily: FONT.regular,
    fontSize: heightPercentageToDP(2),
    margin: heightPercentageToDP(2),
  },
  newsContainer: {
    height: heightPercentageToDP(15),
    margin: heightPercentageToDP(2),
    borderRadius: heightPercentageToDP(2),
    flexDirection: 'row',
  },
  newsRight: {
    flex: 3,

    borderRadius: heightPercentageToDP(2),
    margin: heightPercentageToDP(2),
  },
  newsLeft: {
    flex: 1,
    backgroundColor: 'lightgray',
    borderRadius: heightPercentageToDP(2),
    margin: heightPercentageToDP(2),
  },
  newsDescription: {
    fontFamily: FONT.regular,
    fontSize: heightPercentageToDP(2),
  },
});
