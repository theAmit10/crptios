import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, FONT} from '../../../constants';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import Octicons from 'react-native-vector-icons/Octicons';
import {useSelector} from 'react-redux';

const ExistingItem = ({value}) => {
  const THEME = useSelector(state => state.theme);

  // console.log(value.id);

  return (
    <View
      style={{
        backgroundColor:
          THEME.data === 'LIGHT' ? COLORS.lightGray : COLORS.skyBlue,
        borderColor: THEME.data === 'LIGHT' ? COLORS.lightGray : COLORS.skyBlue,
        ...styles.contentContainer,
      }}>
      {/** left container */}
      <View style={styles.leftContainer}>
        <View
          style={{
            padding: heightPercentageToDP(2),
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: COLORS.green,
          }}
          className=" rounded-full ">
          <Octicons
            name="comment-discussion"
            size={heightPercentageToDP(3)}
            color={COLORS.white}
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
          Ticket #{value.id}
        </Text>
        <Text
          style={{
            color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
            ...styles.subtitle,
          }}
          numberOfLines={1}>
          {value.sub}
        </Text>
      </View>
    </View>
  );
};

export default ExistingItem;

const styles = StyleSheet.create({
  mainCointer: {
    flex: 1,
    backgroundColor: COLORS.purpleDark,
  },
  contentContainer: {
    height: heightPercentageToDP(10),
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
    fontSize: heightPercentageToDP(2),
  },
  subSubTitle: {
    color: COLORS.green,
    fontFamily: FONT.regular,
    fontSize: heightPercentageToDP(2),
    marginStart: heightPercentageToDP(2),
  },
});
