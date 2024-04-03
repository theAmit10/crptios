import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {COLORS, FONT} from '../../../constants';
import {heightPercentageToDP} from 'react-native-responsive-screen';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';

const AccountDetails = () => {
  const THEME = useSelector(state => state.theme);
  return (
    <View
      className="flex-1"
      style={{
        backgroundColor:
          THEME.data === 'DARK' ? COLORS.purpleDark : COLORS.white,
      }}>
      <ScrollView>
        {/** Top container */}
        <View style={styles.accountDetailsTopContainer}>
          <View style={styles.topContainerLeft}>
            <Text
              style={{
                color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                ...styles.title,
              }}>
              Account Details
            </Text>
          </View>

          <View style={styles.topContainerRight}>
            <Text style={styles.topRightDefault}>Default</Text>
            <Text style={styles.topRightVerified}>Verified</Text>
          </View>
        </View>

        {/** SecondTop container */}
        <View
          style={{
            backgroundColor:
              THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.lightGray,
            borderColor:
              THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.lightGray,
            ...styles.secondTopContainer,
          }}>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                ...styles.subtitle,
              }}>
              Bank Account Verified
            </Text>
            <MaterialIcons
              name="verified-user"
              size={heightPercentageToDP(2)}
              color={COLORS.green}
              style={{alignSelf: 'center', opacity: 0.9, marginStart: 2}}
            />
          </View>
          <Text
            style={{
              color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
              ...styles.subSubTitle,
            }}>
            You can now make deposits and withdrawals
          </Text>
        </View>

        {/** ThirdTop container */}
        <View style={styles.thirdTopContainer}>
          <Text
            style={{
              color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
              ...styles.subtitle,
            }}>
            You can now make deposits and withdrawals
          </Text>

          {/** holder details */}

          <Text style={styles.titleGreen}>Account Holder Name</Text>
          <View>
            <TextInput
              style={{
                backgroundColor:
                  THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.lightGray,
                color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                borderColor:
                  THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.lightGray,
                ...styles.userInput,
              }}
              placeholderTextColor={
                THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark
              }
              inputMode="text"
            />
          </View>

          <Text style={styles.titleGreen}>Bank Name</Text>
          <View>
            <TextInput
              style={{
                backgroundColor:
                  THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.lightGray,
                color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                borderColor:
                  THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.lightGray,
                ...styles.userInput,
              }}
              placeholderTextColor={
                THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark
              }
              inputMode="text"
            />
          </View>

          <Text style={styles.titleGreen}>IBAN</Text>
          <View>
            <TextInput
              style={{
                backgroundColor:
                  THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.lightGray,
                color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                borderColor:
                  THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.lightGray,
                ...styles.userInput,
              }}
              placeholderTextColor={
                THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark
              }
              inputMode="text"
            />
          </View>

          <Text style={styles.titleGreen}>SWIFT/BIC Code</Text>
          <View>
            <TextInput
              style={{
                backgroundColor:
                  THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.lightGray,
                color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                borderColor:
                  THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.lightGray,
                ...styles.userInput,
              }}
              placeholderTextColor={
                THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark
              }
              inputMode="text"
            />
          </View>
        </View>

        {/** bottom Buttons */}

        <View style={styles.bottomContainer}>
          <Text style={styles.addNewAccount}>Add New Account</Text>
          <Text style={styles.removeAccount}>Remove Account</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default AccountDetails;

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
    fontFamily: FONT.bold,
    fontSize: heightPercentageToDP(2.5),
    textAlignVertical: 'center',
    alignItems: 'baseline',
  },
  subtitle: {
    fontFamily: FONT.regular,
    fontSize: heightPercentageToDP(2),
    textAlignVertical: 'center',
    alignItems: 'baseline',
  },
  subSubTitle: {
    fontFamily: FONT.regular,
    fontSize: heightPercentageToDP(2),
    textAlignVertical: 'center',
    alignItems: 'baseline',
  },
  topRightDefault: {
    height: heightPercentageToDP(5),
    borderRadius: heightPercentageToDP(1),
    borderColor: COLORS.gray,
    borderWidth: 2,
    padding: heightPercentageToDP(1),
    color: COLORS.gray,
    fontFamily: FONT.regular,
  },
  topRightVerified: {
    height: heightPercentageToDP(5),
    borderRadius: heightPercentageToDP(1),
    borderColor: COLORS.green,
    borderWidth: 2,
    padding: heightPercentageToDP(1),
    color: COLORS.green,
    fontFamily: FONT.regular,
  },
  secondTopContainer: {
    height: heightPercentageToDP(10),
    borderRadius: 10,

    borderWidth: 2,
    marginHorizontal: 10,
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
    fontFamily: FONT.regular,
    fontSize: heightPercentageToDP(2.5),
    borderWidth: 1,
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
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    height: heightPercentageToDP(10),
    padding: heightPercentageToDP(2),
    marginBottom: heightPercentageToDP(10),
    gap: heightPercentageToDP(1),
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
});
