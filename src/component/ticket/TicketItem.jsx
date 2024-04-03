import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {COLORS, FONT} from '../../../constants';
import {useSelector} from 'react-redux';

const TicketItem = () => {
  const THEME = useSelector(state => state.theme);
  return (
    <View
      style={{
        height: heightPercentageToDP(10),
        backgroundColor:
          THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.lightGray,
        margin: heightPercentageToDP(2),
        padding: heightPercentageToDP(2),
        borderRadius: heightPercentageToDP(2),
      }}>
      <View>
        <Text
          style={{
            color: THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.purpleDark,
            fontFamily: FONT.semibold,
            fontSize: heightPercentageToDP(2.5),
          }}>
          TicketItem
        </Text>
      </View>
    </View>
  );
};

export default TicketItem;

const styles = StyleSheet.create({
  title: {
    fontFamily: FONT.semibold,
    fontSize: heightPercentageToDP(2.5),
  },
  subtitle: {
    fontFamily: FONT.regular,
    fontSize: heightPercentageToDP(2),
  },
});
