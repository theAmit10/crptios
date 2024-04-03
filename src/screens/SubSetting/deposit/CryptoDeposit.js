import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import * as Progress from 'react-native-progress';
import FontAwesome from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import HeaderTop from '../../../component/profile/HeaderTop';
import {COLORS, FONT} from '../../../../constants';
import Toast from 'react-native-toast-message';
import URLHelper from '../../../api/URLhelper/URLHelper';
import axios from 'axios';
import { err } from 'react-native-svg/lib/typescript/xml';

const CryptoDeposit = () => {
  const THEME = useSelector(state => state.theme);
  const ACCESS_TOKEN = useSelector(state => state.userAccessToken);

  const navigation = useNavigation();

  const [amountVal, setAmount] = useState('');
  const [addressVal, setAddress] = useState('');
  const [paynow, setPaynow] = useState(false);

  const [transactionVal, setTransactionAmount] = useState('');
  const [receiptVal, setReceipt] = useState('');
  const [remarkVal, setRemark] = useState('');
  const [showProgressBar, setProgressBar] = useState(false);

  const depositNow = () => {
    console.log('PAYEDD AMOUNT');

    if (addressVal.length < 3) {
      console.log('Enter Amount');
      Toast.show({
        type: 'error',
        text1: 'Enter Wallet Address',
      });
    } else {
      console.log('Enter Wallet address value : ' + addressVal);
      checkWalletaddress();
      // setPaynow(true);
    }
  };

  useEffect(() => {
    console.log(paynow);
  }, [paynow]);

  // Check Wallet is valid or not
  const checkWalletaddress = async () => {
    if (!addressVal) {
      Toast.show({
        type: 'error',
        text1: 'Enter amount',
      });
    } else {
      setProgressBar(true);

      try {
        const formData = new FormData();
        formData.append('wallet_address', addressVal);

        const response = await axios.post(URLHelper.CHECK_ADDRESS, formData, {
          headers: {
            userapisecret: 'h0vWu6MkInNlWHJVfIXmHbIbC66cQvlbSUQI09Whbp',
            Authorization: `Bearer ${ACCESS_TOKEN.data}`,
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log('response :: ', response.data);

        if (response.data.message === 'Address Found') {
          setPaynow(true);
        } else {
          Toast.show({
            type: 'error',
            text1: response.data.message,
          });
        }

        setProgressBar(false);
      } catch (error) {
        if (error.response) {
          Toast.show({
            type: 'error',
            text1: error.response.data,
          });
        } else if (error.request) {
          Toast.show({
            type: 'error',
            text1: 'Request was made, but no response was received',
          });
        } else {
          Toast.show({
            type: 'error',
            text1: error.message,
          });
        }
      }
    }
  };

  // Check Wallet is valid or not
  const sendCrypto = async () => {
    if (!addressVal) {
      Toast.show({
        type: 'error',
        text1: 'Enter Wallet Address',
      });
    } else if (!amountVal) {
      Toast.show({
        type: 'error',
        text1: 'Enter amount',
      });
    } else {
      setProgressBar(true);
      try {
        const formData = new FormData();
        formData.append('wallet_address', addressVal);
        formData.append('amount', amountVal);
        formData.append('remarks', remarkVal);

        const response = await axios.post(URLHelper.TRANSFER_CRYPTO, formData, {
          headers: {
            userapisecret: 'h0vWu6MkInNlWHJVfIXmHbIbC66cQvlbSUQI09Whbp',
            Authorization: `Bearer ${ACCESS_TOKEN.data}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('response :: ', response.data);
        if (response.data.status) {
          console.log('response :: ', response.data);
          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: 'Successfully Requested',
          });
        }
        navigation.goBack()
        setProgressBar(false);
      } catch (error) {
        setProgressBar(false);
        console.log(error)
        Toast.show({
          type: 'error',
          text1: 'Something went wrong',
          text2: 'Please check you might have insufficent balance',
        });
        // if (error.response) {
        //   Toast.show({
        //     type: 'error',
        //     text1: error.response.data,
        //   });
        // } else if (error.request) {
        //   Toast.show({
        //     type: 'error',
        //     text1: 'Request was made, but no response was received',
        //   });
        // } else {
        //   Toast.show({
        //     type: 'error',
        //     text1: error.message,
        //   });
        // }
      }
    }
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor:
          THEME.data === 'LIGHT' ? COLORS.white : COLORS.purpleDark,
        ...styles.container,
      }}>
      <HeaderTop value={'Crypto Deposit '} />

      {/** Input Container */}

      <ScrollView>
        <View style={styles.inputContainer}>
          <View>
            <Text
              style={{
                color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                ...styles.subtitle,
              }}>
              Wallet Address
            </Text>
            <TextInput
              style={{
                color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                borderColor:
                  THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.lightGray,
                backgroundColor:
                  THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.lightGray,
                ...styles.userNameInput,
              }}
              placeholderTextColor={
                THEME.data === 'DARK' ? COLORS.gray2 : COLORS.gray2
              }
              placeholder="Enter wallet address"
              onChangeText={setAddress}
              value={addressVal}
              inputMode="text"></TextInput>
          </View>
        </View>

        {/** Crypto Provider Data */}

        {paynow && (
          <View style={{margin: heightPercentageToDP(2)}}>
            <View
              style={{
                backgroundColor:
                  THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.lightGray,
                ...styles.cryptoProviderData,
              }}>
              <Text
                style={{
                  color:
                    THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                  ...styles.title,
                  textAlign: 'center',
                }}>
                PLEASE SEND {amountVal} USDT TO
              </Text>

              <Text
                style={{
                  color:
                    THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                  ...styles.subtitle,
                  marginVertical: heightPercentageToDP(2),
                }}>
                {addressVal}
              </Text>
              <View
                style={{
                  backgroundColor:
                    THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.white,
                  ...styles.imageContainer,
                }}>
                <Feather
                  name="codesandbox"
                  size={heightPercentageToDP(15)}
                  color={COLORS.green}
                  style={{alignSelf: 'center'}}
                />
              </View>
            </View>

            <View>
              <Text
                style={{
                  color:
                    THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                  ...styles.subtitle,
                }}>
                Amount
              </Text>
              <TextInput
                style={{
                  color:
                    THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                  borderColor:
                    THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.lightGray,
                  backgroundColor:
                    THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.lightGray,
                  ...styles.userNameInput,
                }}
                placeholderTextColor={
                  THEME.data === 'DARK' ? COLORS.gray2 : COLORS.gray2
                }
                inputMode="decimal"
                onChangeText={setAmount}
                value={amountVal}></TextInput>
            </View>

            <View>
              <Text
                style={{
                  color:
                    THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                  ...styles.subtitle,
                }}>
                Remark
              </Text>
              <TextInput
                style={{
                  color:
                    THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                  borderColor:
                    THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.lightGray,
                  backgroundColor:
                    THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.lightGray,
                  ...styles.userNameInput,
                }}
                placeholderTextColor={
                  THEME.data === 'DARK' ? COLORS.gray2 : COLORS.gray2
                }
                onChangeText={setRemark}
                value={remarkVal}
                inputMode="text"
              />
            </View>
          </View>
        )}

        {/** Invest button */}

        {showProgressBar ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              margin: heightPercentageToDP(3),
            }}>
            <Progress.Circle size={30} indeterminate={true} />
          </View>
        ) : paynow ? (
          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'flex-end',
            }}
            onPress={sendCrypto}>
            <Text
              style={{
                backgroundColor: COLORS.green,
                padding: heightPercentageToDP(2),
                borderRadius: heightPercentageToDP(2),
                margin: heightPercentageToDP(2),
                width: widthPercentageToDP(92),
                textAlign: 'center',
                color: COLORS.white,
                fontFamily: FONT.medium,
                fontSize: heightPercentageToDP(2),
              }}>
              Deposit Now
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'flex-end',
            }}
            onPress={depositNow}>
            <Text
              style={{
                backgroundColor: COLORS.green,
                padding: heightPercentageToDP(2),
                borderRadius: heightPercentageToDP(2),
                margin: heightPercentageToDP(2),
                width: widthPercentageToDP(92),
                textAlign: 'center',
                color: COLORS.white,
                fontFamily: FONT.medium,
                fontSize: heightPercentageToDP(2),
              }}>
              Continue
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CryptoDeposit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    padding: heightPercentageToDP(2),
    gap: heightPercentageToDP(1),
  },

  title: {
    fontFamily: FONT.bold,
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

  cryptoProviderData: {
    borderRadius: heightPercentageToDP(2),
    padding: heightPercentageToDP(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    height: heightPercentageToDP(20),
    width: heightPercentageToDP(20),
    margin: heightPercentageToDP(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
