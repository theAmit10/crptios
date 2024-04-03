import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import HeaderTop from '../../../component/profile/HeaderTop';
import {COLORS, FONT} from '../../../../constants';
import constants from '../../../constrants/constrants';

const WithdrawCrypto = () => {
  const THEME = useSelector(state => state.theme);
  const navigation = useNavigation();

  const [amountVal, setAmount] = useState('');
  const [paynow, setPaynow] = useState(false);
  const [addressVal, setAddress] = useState('');

  const [transactionVal, setTransactionAmount] = useState('');
  const [receiptVal, setReceipt] = useState('');
  const [remarkVal, setRemark] = useState('');

  const depositNow = () => {
    console.log('PAYEDD AMOUNT');

    if (amountVal.length === 0) {
      console.log('Enter Amount');
      console.error('Enter Amount');
    } else {
      console.log('Enter Amount value : ' + amountVal);
      setPaynow(true);
    }
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor:
          THEME.data === 'LIGHT' ? COLORS.white : COLORS.purpleDark,
        ...styles.container,
      }}>
      <HeaderTop value={'Crypto Withdraw '} />

      {/** Input Container */}

      <ScrollView>
        <View style={styles.inputContainer}>

        <View>
            <Text
              style={{
                color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                ...styles.subtitle,
              }}>
              USDT TRC20 Address
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
              onChangeText={setAddress}
              value={addressVal}
              inputMode="text"></TextInput>
          </View>


          <View>
            <Text
              style={{
                color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                ...styles.subtitle,
              }}>
              Topup Amount (USDT)
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
              onChangeText={setAmount}
              value={amountVal}
              inputMode="decimal"></TextInput>
          </View>
        </View>

        {/** Crypto Provider Data */}

        

        {/** Invest button */}

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'flex-end',
          }}>
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
            }}
            onPress={depositNow}>
            Get OTP
          </Text>
        </View>
      </ScrollView>
    
    </SafeAreaView>
  );
};

export default WithdrawCrypto;

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
  },
});
