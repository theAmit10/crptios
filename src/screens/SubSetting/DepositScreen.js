import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import HeaderTop from '../../component/profile/HeaderTop';
import {useSelector} from 'react-redux';
import {COLORS, FONT} from '../../../constants';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

const DepositScreen = () => {
  const THEME = useSelector(state => state.theme);
  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={{
        backgroundColor:
          THEME.data === 'LIGHT' ? COLORS.white : COLORS.purpleDark,
        ...styles.container,
      }}>
      <HeaderTop value={'Deposit'} />
      <ScrollView style={{flex: 1}}>
        {/** Deposit Crypto */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            backgroundColor:
              THEME.data === 'LIGHT' ? COLORS.lightGray : COLORS.skyBlue,
            borderColor:
              THEME.data === 'LIGHT' ? COLORS.lightGray : COLORS.skyBlue,
            ...styles.contentContainer,
          }}
          onPress={() => navigation.navigate('CryptoDeposit')}>
          {/** left container */}
          <View style={styles.leftContainer}>
            <View
              style={{
                padding: heightPercentageToDP(2),
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor:
                  THEME.data === 'DARK' ? COLORS.purple : COLORS.white,
              }}
              className=" rounded-full ">
              <FontAwesome6Icon
                name="bitcoin"
                size={heightPercentageToDP(3)}
                color={COLORS.green}
                style={{alignSelf: 'center'}}
              />
            </View>
          </View>

          {/** right container */}
          <View style={styles.rightContainer}>
            <Text
              style={{
                color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                ...styles.title,
              }}>
              Deposit Crypto
            </Text>
            <Text
              style={{
                color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                ...styles.subtitle,
              }}
              numberOfLines={2}>
              Deposit Crypto via different network on VRX Invest
            </Text>
          </View>
        </TouchableOpacity>

        {/** Deposit with Card */}

        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            backgroundColor:
              THEME.data === 'LIGHT' ? COLORS.lightGray : COLORS.skyBlue,
            borderColor:
              THEME.data === 'LIGHT' ? COLORS.lightGray : COLORS.skyBlue,
            ...styles.contentContainer,
          }}
          onPress={() => navigation.navigate('UpiDeposit')}>
          {/** left container */}
          <View style={styles.leftContainer}>
            <View
              style={{
                padding: heightPercentageToDP(2),
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor:
                  THEME.data === 'DARK' ? COLORS.purple : COLORS.white,
              }}
              className=" rounded-full ">
              <Feather
                name="credit-card"
                size={heightPercentageToDP(3)}
                color={COLORS.green}
                style={{alignSelf: 'center'}}
              />
            </View>
          </View>

          {/** right container */}
          <View style={styles.rightContainer}>
            <Text
              style={{
                color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                ...styles.title,
              }}>
              UPI Payment
            </Text>
            <Text
              style={{
                color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                ...styles.subtitle,
              }}
              numberOfLines={2}>
              Buy cryptocurrencies with UPI Payment on VRX Invest
            </Text>
          </View>
        </TouchableOpacity>

        {/** Deposit with Cash */}

        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            backgroundColor:
              THEME.data === 'LIGHT' ? COLORS.lightGray : COLORS.skyBlue,
            borderColor:
              THEME.data === 'LIGHT' ? COLORS.lightGray : COLORS.skyBlue,
            ...styles.contentContainer,
          }}
          onPress={() => navigation.navigate('BankDeposit')}>
          {/** left container */}
          <View style={styles.leftContainer}>
            <View
              style={{
                padding: heightPercentageToDP(2),
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor:
                  THEME.data === 'DARK' ? COLORS.purple : COLORS.white,
              }}
              className=" rounded-full ">
              <FontAwesome
                name="bank"
                size={heightPercentageToDP(3)}
                color={COLORS.green}
                style={{alignSelf: 'center'}}
              />
            </View>
          </View>

          {/** right container */}
          <View style={styles.rightContainer}>
            <Text
              style={{
                color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                ...styles.title,
              }}>
              Bank Deposit
            </Text>
            <Text
              style={{
                color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                ...styles.subtitle,
              }}
              numberOfLines={2}>
              Deposit cash to our bank account on VRX Invest
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DepositScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    height: heightPercentageToDP(12),
    margin: heightPercentageToDP(2),
    padding: heightPercentageToDP(1),
    flexDirection: 'row',
    borderRadius: heightPercentageToDP(2),
    gap: heightPercentageToDP(1),
    borderWidth: 1,
  },
  leftContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightContainer: {
    flex: 4,
    margin: heightPercentageToDP(1),
    justifyContent: 'center',
  },

  title: {
    fontFamily: FONT.semibold,
    fontSize: heightPercentageToDP(2),
  },
  subtitle: {
    fontFamily: FONT.regular,
    fontSize: heightPercentageToDP(1.5),
  },
  subSubTitle: {
    color: COLORS.green,
    fontFamily: FONT.regular,
    fontSize: heightPercentageToDP(2),
    marginStart: heightPercentageToDP(2),
  },
});
