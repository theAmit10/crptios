import {StatusBar, TextInput} from 'react-native';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {COLORS, FONT} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import HeaderTop from '../component/profile/HeaderTop';
import AvailableBalance from '../component/Trade/AvailableBalance';
import ExchangeFee from '../component/Trade/ExchangeFee';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import * as Progress from 'react-native-progress';
import Toast from 'react-native-toast-message';
import {
  getCurrencyDetails,
  getINRtoUSDTCurrencyDetails,
  getUSDTtoINRCurrencyDetails,
} from '../../stores/actions/tradeaction';
import Loading from '../component/Loading';
import {getMyWallet} from '../../stores/actions/walletAction';
import URLHelper from '../api/URLhelper/URLHelper';
import axios from 'axios';
import Helper from '../../utils/Helper';

const Trade = props => {
  const THEME = useSelector(state => state.theme);
  const ACCESS_TOKEN = useSelector(state => state.userAccessToken);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // for Trade
  const [sendAmount, setSendAmount] = useState('');
  const [sendAsset, setSendAsset] = useState('INR');
  const [receiveAmount, setReceiveAmount] = useState('');
  const [receiveAsset, setReceiveAsset] = useState('USDT');
  const [currentExchangeMode, setCurrentExchangeMode] = useState('INRTOUSDT');
  const [showProgressBar, setProgressBar] = useState(false);

  const [exchangeFeeVal, setExchangeFee] = useState('');

  const swapHandler = () => {
    console.log(':: Swapping Value :: ');

    if (currentExchangeMode === 'INRTOUSDT') {
      setCurrentExchangeMode('USDTTOINR');
      setExchangeFee(currDetailsUSDTtoINR.exchange_fee + ' USDT');
    } else {
      setCurrentExchangeMode('INRTOUSDT');
      setExchangeFee(Helper.INR_SYMBOL + currDetailsINRtoUSDt.exchange_fee);
    }

    setReceiveAmount('');
    setSendAmount('');
    setSendAsset(receiveAsset);
    setReceiveAsset(sendAsset);

    // val={
    //   currentExchangeMode === 'INRTOUSDT'
    //     ? Helper.INR_SYMBOL + currDetailsINRtoUSDt.exchange_fee
    //     : currDetailsUSDTtoINR.exchange_fee + ' USDT'
    // }
  };

  const {currDetails, currDetailsINRtoUSDt, currDetailsUSDTtoINR} = useSelector(
    state => state.tradeDetails,
  );

  console.log("Currency Detaiils :: "+currDetails);
  const {allwallet} = useSelector(state => state.wallet);

  // console.log('STATE LOADING :: ' + loading);
  // console.log('STATE currDetails :: ' + currDetails);




  useEffect(() => {
    dispatch(getCurrencyDetails(ACCESS_TOKEN.data));
  },[currDetails])


  useEffect(() => {
    
    dispatch(getINRtoUSDTCurrencyDetails(ACCESS_TOKEN.data));
    dispatch(getUSDTtoINRCurrencyDetails(ACCESS_TOKEN.data));
    dispatch(getMyWallet(ACCESS_TOKEN.data));
  }, [dispatch,receiveAmount, sendAmount, exchangeFeeVal]);

  const convertINRtoUSDT = text => {
    console.log('VALUE :: ' + text);

    if (currentExchangeMode === 'INRTOUSDT') {
      const exgFee = parseFloat(currDetailsINRtoUSDt?.exchange_fee);
      const usdtRate = parseFloat(currDetailsINRtoUSDt?.rate).toFixed(2);

      console.log('EXG VAL :: ' + exgFee);
      console.log('usdtRate VAL :: ' + usdtRate);

      const inputNumber = parseFloat(text);
      // const val_after_exchanged = inputNumber - exgFee;
      const val_after_exchanged = inputNumber;

      const doubledValue = val_after_exchanged / usdtRate;
      setSendAmount(text);
      setReceiveAmount(isNaN(doubledValue) ? '0' : doubledValue.toFixed(2));
    } else {
      const exgFee = parseFloat(currDetailsUSDTtoINR?.exchange_fee);
      const INRexgFee = parseFloat(currDetailsINRtoUSDt?.rate).toFixed(2);
      const usdtRate = parseFloat(currDetailsUSDTtoINR?.rate).toFixed(2);
      console.log('EXG VAL :: ' + exgFee);
      console.log('usdtRate VAL :: ' + usdtRate);
      const inputNumber = parseFloat(text);
      const doubledValue = inputNumber * usdtRate;

      // const val_after_exchanged = (doubledValue - exgFee) * INRexgFee;
      const val_after_exchanged = doubledValue * INRexgFee;

      setSendAmount(text);

      setReceiveAmount(
        isNaN(doubledValue) ? '' : val_after_exchanged.toFixed(2),
      );
    }
  };

  const submitTrade = async () => {
    // const exgFee = parseFloat(currDetails?.exchange_fee);
    const account_balance = Number.parseFloat(allwallet[0]?.balance).toFixed(2);

    // const exgFee = parseFloat(currDetailsINRtoUSDt?.exchange_fee);

    const account_balance_usdt = Number.parseFloat(
      allwallet[1]?.balance,
    ).toFixed(2);

    if (currentExchangeMode === 'INRTOUSDT') {
      const exgFee = parseFloat(currDetailsINRtoUSDt?.exchange_fee);
      if (!sendAmount) {
        Toast.show({
          type: 'error',
          text1: 'Enter Investing Amount',
        });
      } else if (!sendAmount && !receiveAmount) {
        Toast.show({
          type: 'info',
          autoHide: 2000,
          text1: 'Invested Amount',
          text2: 'Enter amount',
        });
      } else if (
        Number.parseFloat(account_balance) < Number.parseFloat(exgFee)
      ) {
        Toast.show({
          type: 'info',
          autoHide: 2000,
          text1: 'Insufficient Balance',
        });
      } else if (
        Number.parseFloat(sendAmount) + exgFee >
        Number.parseFloat(account_balance)
      ) {
        console.log(sendAmount);
        console.log(account_balance);
        Toast.show({
          type: 'info',
          autoHide: 2000,
          text1: 'Insufficient Balance',
          text2: 'Invested Amount Must be less than ' + account_balance,
        });
      } else {
        console.log('Else : ' + sendAmount + ' | ' + receiveAmount + ' | ');

        setProgressBar(true);

        const apiUrl = URLHelper.BUY_TRADE;

        const headers = {
          userapisecret: URLHelper.USER_SECRET_KEY,
          Authorization: `Bearer ${ACCESS_TOKEN.data}`,
          'Content-Type': 'multipart/form-data',
        };
        const formData = new FormData();

        // INR == 1
        // USDT == 2

        if (currentExchangeMode === 'INRTOUSDT') {
          formData.append('trade_coin_id', 2);
          formData.append('base_coin_id', 1);
          console.log(
            'INR TO USDT' + sendAmount + ' | ' + receiveAmount + ' | 2,1',
          );
        } else {
          console.log(
            'INR TO USDT' + sendAmount + ' | ' + receiveAmount + ' | 1,2',
          );
          formData.append('trade_coin_id', 1);
          formData.append('base_coin_id', 2);
        }

        formData.append('amount', sendAmount);
        formData.append('receive', receiveAmount);

        try {
          const response = await axios.post(apiUrl, formData, {headers});
          console.log('REGISTERING STARTED');
          console.log('Response:', response.data);

          console.log('REGISTERING STOP');
          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: 'Successfully completed',
          });
          setProgressBar(false);
          setReceiveAmount('');
          setSendAmount('');
        } catch (error) {
          setProgressBar(false);
          Toast.show({
            type: 'error',
            text1: 'Something went wrong',
            text2: 'Please try again later',
          });
          if (error.response) {
            console.log('Error:', error.response.data);
          } else {
            console.log('Error:', error.message);
          }
        }
      }
    } else {
      const exgFee = parseFloat(currDetailsUSDTtoINR?.exchange_fee);
      if (!sendAmount && sendAmount.length == 0) {
        Toast.show({
          type: 'error',
          text1: 'Enter Investing Amount',
        });
      } else if (!sendAmount && !receiveAmount) {
        Toast.show({
          type: 'info',
          autoHide: 2000,
          text1: 'Invested Amount',
          text2: 'Enter amount',
        });
      } else if (sendAmount == 0) {
        Toast.show({
          type: 'info',
          autoHide: 2000,
          text1: 'Minimum investment 1 USDT',
        });
      } else if (
        Number.parseFloat(sendAmount) + exgFee >
        Number.parseFloat(account_balance_usdt)
      ) {
        Toast.show({
          text1: 'Insufficient Balance',
          text2: 'Invested Amount Must be less than ' + account_balance_usdt,
        });
      } else if (
        Number.parseFloat(account_balance_usdt) < Number.parseFloat(sendAmount)
      ) {
        Toast.show({
          type: 'error',
          autoHide: 2000,
          text1: 'Insufficient Balance',
          text2: 'Invested Amount Must be less than ' + account_balance_usdt,
        });
      } else {
        console.log('Else : ' + sendAmount + ' | ' + receiveAmount + ' | ');
        console.log(
          'Else : ' + sendAmount.length + ' | ' + receiveAmount.length + ' | ',
        );

        setProgressBar(true);
        const apiUrl = URLHelper.BUY_TRADE;

        const headers = {
          userapisecret: URLHelper.USER_SECRET_KEY,
          Authorization: `Bearer ${ACCESS_TOKEN.data}`,
          'Content-Type': 'multipart/form-data',
        };
        const formData = new FormData();

        // INR == 1
        // USDT == 2
        if (currentExchangeMode === 'INRTOUSDT') {
          formData.append('trade_coin_id', 1);
          formData.append('base_coin_id', 2);

          console.log(
            'Else : ' +
              sendAmount +
              ' | ' +
              receiveAmount +
              ' | 1(INR), 2(USDT) ',
          );
        } else {
          formData.append('trade_coin_id', 1);
          formData.append('base_coin_id', 2);
          console.log(
            'Else : ' +
              sendAmount +
              ' | ' +
              receiveAmount +
              ' |  a2(USDT), 1(INR) ',
          );
        }

        formData.append('amount', sendAmount);
        formData.append('receive', receiveAmount);

        try {
          const response = await axios.post(apiUrl, formData, {headers});
          console.log('REGISTERING STARTED');
          console.log('Response:', response.data);

          console.log('REGISTERING STOP');
          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: 'Successfully completed',
          });

          setProgressBar(false);
          setReceiveAmount('');
          setSendAmount('');
        } catch (error) {
          setProgressBar(false);
          Toast.show({
            type: 'error',
            text1: 'Something went wrong',
            text2: 'Please try again later',
          });
          if (error.response) {
            console.log('Error:', error.response.data);
          } else {
            console.log('Error:', error.message);
          }
        }
      }
    }

    // else {
    //   Toast.show({
    //     type: 'error',
    //     autoHide: 2000,
    //     text1: 'Invested Amount',
    //     text2: 'Must be Greater than ' + exgFee,
    //   });
    // }
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor:
          THEME.data === 'LIGHT' ? COLORS.white : COLORS.purpleDark,
        ...styles.container,
      }}>
      <StatusBar style="light" hidden={false} />
      <HeaderTop value={'Trade'} />

      

      {currDetailsINRtoUSDt && currDetailsUSDTtoINR  ? (
        <ScrollView>
          <View
            style={{
              flex: 1,
            }}>
            {/** send container */}
            <View
              style={{
                backgroundColor:
                  THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.lightGray,
                borderColor:
                  THEME.data === 'LIGHT' ? COLORS.lightGray : COLORS.skyBlue,
                ...styles.sendContainer,
                overflow : 'hidden'
              }}>
              <View style={styles.sendContainerLeft}>
                <Text
                  style={{
                    color:
                      THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                    ...styles.send,
                  }}>
                  Send
                </Text>
                <TextInput
                  style={{
                    color:
                      THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                    ...styles.amount,
                    zIndex: 1,
                  }}
                  inputMode="decimal"
                  placeholder="0"
                  placeholderTextColor={
                    THEME.data === 'DARK' ? COLORS.gray2 : COLORS.gray2
                  }
                  onChangeText={convertINRtoUSDT}
                  value={sendAmount}
                  keyboardType="decimal-pad"></TextInput>
                <Image
                  source={require('../../assets/image/bitcoin_image.jpg')}
                  style={styles.centerImage}
                />
              </View>

              <TouchableOpacity
                >
                <View style={styles.sendContainerRight}>
                  {/**
              
              <FontAwesome
                    name={'bitcoin'}
                    size={heightPercentageToDP(3)}
                    color={
                      THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark
                    }
                  />
              
              */}

                  <Text
                    style={{
                      color:
                        THEME.data === 'DARK'
                          ? COLORS.white
                          : COLORS.purpleDark,
                      ...styles.tradeValue,
                    }}>
                    {sendAsset}
                  </Text>
                  {/**
                     *  <AntDesign
                    name={'down'}
                    size={heightPercentageToDP(3)}
                    color={
                      THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark
                    }
                  />
                     * 
                     */}
                </View>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              activeOpacity={0.5}
              onPress={swapHandler}
              style={{
                alignSelf: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: -20,
                zIndex: 2,
                backgroundColor: COLORS.green,
              }}
              className="rounded-full  w-20 h-20 p-1 border-green-300 ">
              <Ionicons
                name={'swap-vertical-outline'}
                size={heightPercentageToDP(4)}
                color={'white'}
                style={{alignItems: 'center'}}
              />
            </TouchableOpacity>

            {/** Receive Container */}

            <View
              style={{
                backgroundColor:
                  THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.lightGray,
                borderColor:
                  THEME.data === 'LIGHT' ? COLORS.lightGray : COLORS.skyBlue,
                ...styles.receiveContainer,
                overflow : 'hidden'
              }}>
              <View style={styles.sendContainerLeft}>
                <Text
                  style={{
                    color:
                      THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                    ...styles.send,
                  }}>
                  Receive
                </Text>
                <Text
                  style={{
                    color:
                      THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                    ...styles.amount,
                    zIndex: 1,
                  }}>
                  {sendAmount === '' ? '0' : receiveAmount}
                </Text>

                <Image
                  source={require('../../assets/image/bitcoin_image.jpg')}
                  style={styles.centerImage}
                />
              </View>

              <TouchableOpacity
                >
                <View style={styles.sendContainerRight}>
                  {/**
              
              <FontAwesome5Brands
                    name={'ethereum'}
                    size={heightPercentageToDP(3)}
                    color={
                      THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark
                    }
                  />
              */}

                  <Text
                    style={{
                      color:
                        THEME.data === 'DARK'
                          ? COLORS.white
                          : COLORS.purpleDark,
                      ...styles.tradeValue,
                    }}>
                    {receiveAsset}
                  </Text>

                  {/** 
                <AntDesign
                    name={'down'}
                    size={heightPercentageToDP(3)}
                    color={
                      THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark
                    }
                  />
                
                */}
                </View>
              </TouchableOpacity>
            </View>

            <AvailableBalance
              val={Number.parseFloat(allwallet[0]?.balance).toFixed(2)}
            />
            <ExchangeFee
              val={
                currentExchangeMode === 'INRTOUSDT'
                  ? Helper.INR_SYMBOL + currDetailsINRtoUSDt?.exchange_fee
                  : currDetailsUSDTtoINR?.exchange_fee + ' USDT'
              }
            />

            <View
              style={{
                height: heightPercentageToDP(20),
              }}>
              <View></View>

              {sendAmount === '' && sendAmount.length == 0 ? (
                showProgressBar ? (
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      margin: heightPercentageToDP(3),
                    }}>
                    <Progress.Circle size={30} indeterminate={true} />
                  </View>
                ) : null
              ) : (
                <TouchableOpacity
                  style={styles.bottonContainer}
                  onPress={submitTrade}>
                  <Text style={styles.next}>Continue</Text>
                </TouchableOpacity>
              )}
            </View>

            {receiveAmount.length != 0 &&
              (showProgressBar ? (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: heightPercentageToDP(3),
                  }}>
                  <Progress.Circle size={30} indeterminate={true} />
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.bottonContainer}
                  onPress={submitTrade}>
                  <Text style={styles.next}>Continue</Text>
                </TouchableOpacity>
              ))}
          </View>
        </ScrollView>
      ) : (
        <Loading />
      )}
    </SafeAreaView>
  );
};

export default Trade;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    alignItems: 'stretch',
  },

  sendContainer: {
    height: heightPercentageToDP(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: heightPercentageToDP(2),
    marginStart: heightPercentageToDP(1),
    marginEnd: heightPercentageToDP(1),
    borderWidth: 1,
    borderRadius: 5,
  },
  receiveContainer: {
    height: heightPercentageToDP(12),
    marginTop: heightPercentageToDP(-5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginStart: 10,
    marginEnd: 10,
    borderWidth: 1,

    borderRadius: 5,
  },
  send: {
    fontFamily: FONT.regular,
    fontSize: heightPercentageToDP(2),
    marginStart: heightPercentageToDP(2),
  },
  amount: {
    fontFamily: FONT.bold,
    fontSize: heightPercentageToDP(2.5),
    textAlignVertical: 'center',
    marginStart: heightPercentageToDP(2),
  },
  centerImage: {
    position: 'absolute',
    width: widthPercentageToDP(100),
    height: '100%',
    resizeMode: 'cover',
    opacity: 0.1,
  },
  sendContainerLeft: {
    width: widthPercentageToDP(50),
    flexDirection: 'column',
    justifyContent: 'center',
  },
  sendContainerRight: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: heightPercentageToDP(1),
    paddingEnd: heightPercentageToDP(2),
  },

  tradeValue: {
    fontFamily: FONT.semibold,
    fontSize: heightPercentageToDP(2.5),
  },
  next: {
    color: 'white',
    width: '100%',
    fontFamily: FONT.semibold,
    backgroundColor: COLORS.green,
    borderBottomColor: COLORS.green,
    fontSize: heightPercentageToDP(2),
    padding: heightPercentageToDP(1.5),
    borderRadius: heightPercentageToDP(1),
    textAlign: 'center',
    overflow : 'hidden'
  },
  bottonContainer: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: heightPercentageToDP(2),
    marginTop: heightPercentageToDP(2),
    bottom: heightPercentageToDP(2),
    zIndex: 9,
   
  },
});
