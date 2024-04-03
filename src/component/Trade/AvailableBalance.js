import {
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';
import React from 'react';
import {COLORS, FONT} from '../../../constants';
import {
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import Helper from '../../../utils/Helper';

const AvailableBalance = ({from, val}) => {
  const THEME = useSelector(state => state.theme);
  return (
    <SafeAreaView
      style={{
        backgroundColor:
          THEME.data === 'LIGHT' ? COLORS.lightGray : COLORS.skyBlue,
        ...styles.container,
        borderColor: THEME.data === 'LIGHT' ? COLORS.lightGray : COLORS.skyBlue,
        justifyContent: 'space-between',
        alignItems: 'center',
        
      }}>
      <Text
        style={{
          color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
          ...styles.name,
          padding: heightPercentageToDP(2)
        }}>
        Available Balance :
      </Text>
      <Text
        style={{
          color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
          ...styles.tradeValue,
          marginEnd: heightPercentageToDP(2)
        }}
        numberOfLines={1}>
        {Helper.INR_SYMBOL + val}
      </Text>
    </SafeAreaView>
  );
};

export default AvailableBalance;

const styles = StyleSheet.create({
  container: {
    display: 'flex',

    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: heightPercentageToDP(2),
    marginStart: heightPercentageToDP(1),
    marginEnd: heightPercentageToDP(1),
    borderWidth: 1,

    borderRadius: 5,
    padding: heightPercentageToDP(2),
  },
  name: {
    fontFamily: FONT.medium,
    fontSize: heightPercentageToDP(2),
    textAlignVertical: 'center',
  },
  tradeValue: {
    fontFamily: FONT.semibold,
    fontSize: heightPercentageToDP(2),
    textAlignVertical: 'center',
  },
});
