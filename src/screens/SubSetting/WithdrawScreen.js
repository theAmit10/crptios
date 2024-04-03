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
import { useSelector } from 'react-redux';
import { COLORS, FONT } from '../../../constants';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const WithdrawScreen = () => {
  const THEME = useSelector(state => state.theme);
  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={{
        backgroundColor:
          THEME.data === 'LIGHT' ? COLORS.white : COLORS.purpleDark,
        ...styles.container,
      }}>
      <HeaderTop value={'Withdraw'} />
      <ScrollView style={{ flex: 1 }}>





        {/** Withdraw Cash */}

        <TouchableOpacity
          style={{
            backgroundColor:
              THEME.data === 'LIGHT' ? COLORS.lightGray : COLORS.skyBlue,
            borderColor:
              THEME.data === 'LIGHT' ? COLORS.lightGray : COLORS.skyBlue,
            ...styles.contentContainer,
          }}
          onPress={() => navigation.navigate('WithdrawBank')}
        >
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
                style={{ alignSelf: 'center' }}
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
              Bank Withdraw
            </Text>
            <Text
              style={{
                color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                ...styles.subtitle,
              }}
              numberOfLines={2}>
              Withdraw Cash to your bank account on VRX Invest
            </Text>
          </View>
        </TouchableOpacity>

        {/** Withdraw through UPI */}
        <TouchableOpacity
          style={{
            backgroundColor:
              THEME.data === 'LIGHT' ? COLORS.lightGray : COLORS.skyBlue,
            borderColor:
              THEME.data === 'LIGHT' ? COLORS.lightGray : COLORS.skyBlue,
            ...styles.contentContainer,
          }}
          onPress={() => navigation.navigate('WithdrawUpi')}
        >
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
                name="money"
                size={heightPercentageToDP(3)}
                color={COLORS.green}
                style={{ alignSelf: 'center' }}
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
              UPI Withdraw
            </Text>
            <Text
              style={{
                color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                ...styles.subtitle,
              }}
              numberOfLines={2}>
              Withdraw Cash to your bank account using UPI on VRX Invest
            </Text>
          </View>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

export default WithdrawScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
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


