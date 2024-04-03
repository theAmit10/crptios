import {StatusBar} from 'react-native';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {COLORS, FONT} from '../../constants';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import HeaderTop from '../component/profile/HeaderTop';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import { CheckBox } from '@rneui/themed';
import React, {useEffect, useState} from 'react';
import {PieChart} from 'react-native-gifted-charts';
import {useDispatch, useSelector} from 'react-redux';
import {fetchCoinMarket} from '../../stores/coinMarketSlice';
import {getMyWallet} from '../../stores/actions/walletAction';
import Loading from '../component/Loading';
import Helper from '../../utils/Helper';

// ...
const data = [{value: 50}, {value: 50}];

const Wallet = () => {
  const navigation = useNavigation();
  const ACCESS_TOKEN = useSelector(state => state.userAccessToken);
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxToggle = () => {
    setIsChecked(!isChecked);
  };

  const THEME = useSelector(state => state.theme);
  console.log('THEME : ' + THEME.data);

  const dispatch = useDispatch();

  const {walletdata, allwallet} = useSelector(state => state.wallet);

  console.log('MINE WASU WAllET :: ');
  console.log(walletdata?.data.total);
  console.log('Allwallet Length :: ' + allwallet?.length);

  const isFocused = useIsFocused()

  useEffect(() => {
    dispatch(fetchCoinMarket());
    dispatch(getMyWallet(ACCESS_TOKEN.data));
  }, [isFocused]);

  return (
    <SafeAreaView
      style={{
        backgroundColor:
          THEME.data === 'LIGHT' ? COLORS.white : COLORS.purpleDark,
        ...styles.container,
      }}>
      <StatusBar
        hidden={false}
        barStyle={THEME.data === 'DARK' ? 'light-content' : 'dark-content'}
      />
      <HeaderTop value={'Wallet'} />

      <View
        style={{
          flex: 1,
        }}>
        {allwallet.length > 0 ? (
          <FlatList
            data={allwallet}
            keyExtractor={item => item.id}
            contentContainerStyle={{
              paddingHorizontal: 10,
            }}
            ListHeaderComponent={
              // TOP VIEW
              <View>
                <View
                  style={{
                    backgroundColor:
                      THEME.data === 'LIGHT'
                        ? COLORS.lightGray
                        : COLORS.skyBlue,
                    ...styles.topContainer,
                  }}>
                  <View
                    style={{
                      position: 'relative',
                      height: heightPercentageToDP(24),
                      width: heightPercentageToDP(24),
                    }}>
                    <PieChart
                      radius={heightPercentageToDP(12)}
                      innerRadius={heightPercentageToDP(10)}
                      innerCircleColor={
                        THEME.data === 'LIGHT'
                          ? COLORS.lightGray
                          : COLORS.skyBlue
                      }
                      data={data}
                      donut
                      showGradient
                      initialAngle={5}
                      strokeWidth={8}
                      strokeColor={
                        THEME.data === 'LIGHT'
                          ? COLORS.lightGray
                          : COLORS.skyBlue
                      }
                      showText></PieChart>

                    <View
                      style={{
                        height: heightPercentageToDP(16),
                        width: heightPercentageToDP(16),
                        position: 'absolute',
                        justifyContent: 'center',
                        alignSelf: 'center',
                        top: '18%',
                      }}>
                      <Text
                        style={{
                          flex: 1,
                          color:
                            THEME.data === 'LIGHT'
                              ? COLORS.purpleDark
                              : COLORS.white,
                          fontFamily: FONT.extrabold,
                          fontSize: heightPercentageToDP(2),
                          alignSelf: 'center',
                          textAlign: 'center',
                          textAlignVertical: 'bottom',
                        }}>
                        {isChecked
                          ? Helper.INR_SYMBOL + ' *****'
                          : Helper.INR_SYMBOL +
                            Number.parseFloat(allwallet[0].balance).toFixed(3)}
                      </Text>
                      <Text
                        style={{
                          flex: 1,

                          color:
                            THEME.data === 'LIGHT'
                              ? COLORS.purpleDark
                              : COLORS.white,
                          fontFamily: FONT.regular,
                          fontSize: heightPercentageToDP(1.6),
                          alignSelf: 'center',
                          textAlign: 'center',
                          textAlignVertical: 'top',
                        }}>
                        {isChecked
                          ? allwallet[1].coin_type + ':' + ' *****'
                          : allwallet[1].coin_type +
                            ':' +
                            Number.parseFloat(allwallet[1].balance).toFixed(3)}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.topContainerBottom}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('WithdrawScreen')}>
                      <View style={styles.topContainerBottomContent}>
                        <View
                          style={{
                            backgroundColor:
                              THEME.data === 'LIGHT'
                                ? COLORS.white
                                : COLORS.purpleDark,
                            alignSelf: 'center',
                          }}
                          className="p-3 rounded-md">
                          <AntDesign
                            name="creditcard"
                            size={heightPercentageToDP(3)}
                            color={
                              THEME.data === 'DARK'
                                ? COLORS.white
                                : COLORS.purpleDark
                            }
                            style={styles.centerImage}
                          />
                        </View>
                        <Text
                          style={{
                            color:
                              THEME.data === 'DARK'
                                ? COLORS.white
                                : COLORS.purpleDark,
                            fontFamily: FONT.regular,
                            fontSize: heightPercentageToDP(1.5),
                            alignSelf: 'center',
                          }}>
                          Withdraw
                        </Text>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => navigation.navigate('DepositScreen')}>
                      <View style={styles.topContainerBottomContent}>
                        <View
                          style={{
                            backgroundColor:
                              THEME.data === 'LIGHT'
                                ? COLORS.white
                                : COLORS.purpleDark,
                            alignSelf: 'center',
                          }}
                          className="bg-blue-100 p-3 rounded-md">
                          <AntDesign
                            name="wallet"
                            size={heightPercentageToDP(3)}
                            color={
                              THEME.data === 'DARK'
                                ? COLORS.white
                                : COLORS.purpleDark
                            }
                            style={styles.centerImage}
                          />
                        </View>
                        <Text
                          style={{
                            color:
                              THEME.data === 'DARK'
                                ? COLORS.white
                                : COLORS.purpleDark,
                            fontFamily: FONT.regular,
                            fontSize: heightPercentageToDP(1.5),
                            alignSelf: 'center',
                          }}>
                          Deposit
                        </Text>
                      </View>
                    </TouchableOpacity>

                    {/** Transfer Container */}

                    <TouchableOpacity
                      onPress={() => navigation.navigate('Trade')}>
                      <View style={styles.topContainerBottomContent}>
                        <View
                          style={{
                            backgroundColor:
                              THEME.data === 'LIGHT'
                                ? COLORS.white
                                : COLORS.purpleDark,
                            alignSelf: 'center',
                          }}
                          className="bg-blue-100 p-3 rounded-md">
                          <Octicons
                            name="arrow-switch"
                            size={heightPercentageToDP(3)}
                            color={
                              THEME.data === 'DARK'
                                ? COLORS.white
                                : COLORS.purpleDark
                            }
                            style={styles.centerImage}
                          />
                        </View>
                        <Text
                          style={{
                            color:
                              THEME.data === 'DARK'
                                ? COLORS.white
                                : COLORS.purpleDark,
                            fontFamily: FONT.regular,
                            fontSize: heightPercentageToDP(1.5),
                            alignSelf: 'center',
                          }}>
                          Tranfer
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    padding: 10,
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      color:
                        THEME.data === 'DARK'
                          ? COLORS.white
                          : COLORS.purpleDark,
                      fontFamily: FONT.extrabold,
                      fontSize: heightPercentageToDP(2.5),
                      alignSelf: 'center',
                    }}>
                    Wallet Balance
                  </Text>

                  <CheckBox
                    title="Hide Balance"
                    fontFamily={FONT.extrabold}
                    checked={isChecked}
                    onPress={handleCheckboxToggle}
                    containerStyle={{
                      backgroundColor:
                        THEME.data === 'LIGHT' ? COLORS.light : COLORS.skyBlue,
                        borderRadius: heightPercentageToDP(1)
                    }}
                    textStyle={{
                      color:
                        THEME.data === 'DARK'
                          ? COLORS.white
                          : COLORS.purpleDark,
                    }}
                    checkedColor={COLORS.purpleDark}
                    uncheckedColor={COLORS.purpleDark}
                  />
                </View>
              </View>
            }
            renderItem={({item}) => {
              let priceColor =
                item.price_change_percentage_7d_in_currency == 0
                  ? COLORS.gray
                  : item.price_change_percentage_7d_in_currency > 0
                  ? COLORS.green
                  : COLORS.red;

              return (
                <TouchableOpacity
                  style={{
                    height: heightPercentageToDP(10),
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor:
                      THEME.data === 'LIGHT'
                        ? COLORS.lightGray
                        : COLORS.skyBlue,
                    marginVertical: heightPercentageToDP(1),
                    borderRadius: heightPercentageToDP(1),
                    padding: heightPercentageToDP(1),
                  }}
                  // on press
                >
                  {/** LOGO */}
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
                        padding: 6,
                      }}
                      className="rounded-full ">
                      <Image
                        source={require('../../assets/image/logo.png')}
                        style={{
                          height: 20,
                          width: 20,
                          resizeMode: 'cover',
                        }}
                      />
                    </View>
                  </View>

                  {/** NAME */}

                  <View
                    style={{
                      flex: 1,
                    }}>
                    <Text
                      style={{
                        color:
                          THEME.data === 'DARK'
                            ? COLORS.white
                            : COLORS.purpleDark,
                        fontFamily: FONT.bold,
                        fontSize: heightPercentageToDP(2),
                      }}>
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        color:
                          THEME.data === 'DARK'
                            ? COLORS.white
                            : COLORS.purpleDark,
                        fontFamily: FONT.regular,
                        fontSize: heightPercentageToDP(2),
                      }}>
                      {item.coin_type.toUpperCase()}
                    </Text>
                  </View>

                  {/** FIGURES */}

                  <View>
                    <Text
                      style={{
                        textAlign: 'right',

                        color:
                          THEME.data === 'DARK'
                            ? COLORS.white
                            : COLORS.purpleDark,
                        fontFamily: FONT.bold,
                      }}>
                      {item.coin_type === 'INR'
                        ? Helper.INR_SYMBOL +
                          Number.parseFloat(item.balance).toFixed(2)
                        : Number.parseFloat(item.balance).toFixed(4)}
                    </Text>

                    {/**
                       * 
                       *  <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                      }}>
                      {item.price_change_percentage_7d_in_currency != 0 && (
                        <AntDesign
                          name={
                            item.price_change_percentage_7d_in_currency < 0
                              ? 'caretdown'
                              : 'caretup'
                          }
                          size={12}
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
                        }}>
                        {item.price_change_percentage_7d_in_currency.toFixed(2)}%
                      </Text>
                    </View>
                       * 
                       */}
                  </View>
                </TouchableOpacity>
              );
            }}
            ListFooterComponent={<View style={{marginBottom: 10}}></View>}
          />
        ) : (
          <Loading />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    alignItems: 'stretch',
  },

  topContainer: {
    display: 'flex',
    position: 'relative',

    height: heightPercentageToDP(35),
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: heightPercentageToDP(3),
    paddingTop: heightPercentageToDP(2),
    marginHorizontal: heightPercentageToDP(-2),
    borderBottomEndRadius: heightPercentageToDP(1),
  },
  topContainerCircle: {
    width: widthPercentageToDP(40),
    height: heightPercentageToDP(30),
    resizeMode: 'contain',
  },
  topContainerBottom: {
    flexDirection: 'row',
    gap: heightPercentageToDP(1),
  },
  topContainerBottomContent: {
    margin: heightPercentageToDP(2),
    width: widthPercentageToDP(15),
  },

  totalVal: {
    position: 'absolute',
    fontFamily: FONT.regular,
    fontSize: heightPercentageToDP(1.6),
    top: '60%',
  },
});

export default Wallet;
