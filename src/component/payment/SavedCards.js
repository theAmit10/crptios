import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {COLORS, FONT} from '../../../constants';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SavedCardItem from './SavedCardItem';
import {useSelector} from 'react-redux';

const SavedCards = () => {
  const THEME = useSelector(state => state.theme);
  return (
    <View
      className="flex-1"
      style={{
        backgroundColor:
          THEME.data === 'DARK' ? COLORS.purpleDark : COLORS.white,
      }}>
      <ScrollView>
        <SavedCardItem />
        <SavedCardItem />
        <SavedCardItem />
        <SavedCardItem />
        <SavedCardItem />
      </ScrollView>
    </View>
  );
};

export default SavedCards;

const styles = StyleSheet.create({
  accountDetailsTopContainer: {
    height: heightPercentageToDP(10),
    padding: heightPercentageToDP(2),
    flexDirection: 'row',
  },
  topContainerRight: {
    flex: 1,

    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  topContainerLeft: {
    flex: 1,
    flexDirection: 'row',
  },
  title: {
    color: 'white',
    fontFamily: FONT.bold,
    fontSize: heightPercentageToDP(2.5),
    textAlignVertical: 'center',
    alignItems: 'baseline',
  },
  subtitle: {
    color: 'white',
    fontFamily: FONT.regular,
    fontSize: heightPercentageToDP(2),
    textAlignVertical: 'center',
    alignItems: 'baseline',
  },
  subSubTitle: {
    color: 'white',
    fontFamily: FONT.regular,
    fontSize: heightPercentageToDP(2),
    textAlignVertical: 'center',
    alignItems: 'baseline',
    opacity: 0.5,
  },
  topRightDefault: {
    borderRadius: 10,
    borderColor: COLORS.gray,
    borderWidth: 2,
    padding: heightPercentageToDP(1),
    color: COLORS.gray,
    fontFamily: FONT.regular,
  },
  topRightVerified: {
    borderRadius: 10,
    borderColor: COLORS.green,
    borderWidth: 2,
    padding: heightPercentageToDP(1),
    color: COLORS.green,
    fontFamily: FONT.regular,
  },
  cardContainer: {
    position: 'relative',
    backgroundColor: COLORS.purple,
    height: heightPercentageToDP(20),
    borderRadius: 10,
    borderColor: COLORS.purple,
    borderWidth: 2,
    marginHorizontal: 10,
    marginBottom: 10,
    padding: 10,
  },
  thirdTopContainer: {
    padding: 10,
  },
  semiTitle: {
    color: 'white',
    fontFamily: FONT.semibold,
    fontSize: heightPercentageToDP(2),
    textAlignVertical: 'center',
    alignItems: 'baseline',
  },
  userInput: {
    color: 'white',
    fontFamily: FONT.regular,
    fontSize: heightPercentageToDP(2.5),
    backgroundColor: COLORS.purple,
    borderWidth: 1,
    borderColor: COLORS.purple,
    borderRadius: 5,
    paddingStart: 10,
  },
  titleGreen: {
    color: COLORS.green,
    fontFamily: FONT.regular,
    fontSize: heightPercentageToDP(2),
    textAlignVertical: 'center',
    alignItems: 'baseline',
    marginTop: 10,
  },

  addNewAccount: {
    backgroundColor: COLORS.green,
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: FONT.semibold,
    color: COLORS.white,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.green,
  },
  removeAccount: {
    backgroundColor: COLORS.red,
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: FONT.semibold,
    color: COLORS.white,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.red,
  },
  cardTopIcon: {
    borderWidth: 1,
    borderColor: COLORS.purple,
    borderRadius: 5,
    backgroundColor: COLORS.skyBlue,

    padding: 3,
  },
  bottomTitle: {
    color: COLORS.green,
    fontFamily: FONT.regular,
    fontSize: heightPercentageToDP(2),
    textAlignVertical: 'center',
    alignItems: 'baseline',
  },
  bottmContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    height: heightPercentageToDP(10),
    padding: 10,
    marginBottom: heightPercentageToDP(5),
    gap: 10,
  },
});
