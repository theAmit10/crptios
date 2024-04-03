import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {COLORS, FONT} from '../../../constants';
import LinearGradient from 'react-native-linear-gradient';

const InvestmentItem = props => {
  const {planAbout, investment, montlyrReturn, planDuration} = props;
  const THEME = useSelector(state => state.theme);

  return (
    <LinearGradient
      colors={[
        THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.gray2,
        THEME.data === 'DARK' ? COLORS.purpleDark : COLORS.lightWhite,
      ]}
      style={{
        ...styles.container,
      }}>
      <View
        style={{
          ...styles.containerTop,
        }}>
        <View>
          <LinearGradient
            colors={[
              THEME.data === 'DARK' ? COLORS.purple : COLORS.gray2,
              THEME.data === 'DARK' ? COLORS.purpleDark : COLORS.white,
            ]}
            className="rounded-md ">
            <Image
              source={require('../../../assets/image/logo.png')}
              style={{
                height: heightPercentageToDP(5),
                width: heightPercentageToDP(5),
              }}
              resizeMode="contain"
            />
          </LinearGradient>
        </View>
        <View>
          <Text
            style={{
              color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
              fontFamily: FONT.bold,
              fontSize: heightPercentageToDP(2.5),
            }}
            numberOfLines={1}>
            {planAbout}
          </Text>
        </View>
      </View>

      {/** Plan About Container */}
      <View style={{flex: 1}}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
              fontFamily: FONT.bold,
              fontSize: heightPercentageToDP(1.5),

              letterSpacing: 4,
            }}>
            INVESTMENT
          </Text>
          <Text
            style={{
              color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
              fontFamily: FONT.extrabold,
              fontSize: heightPercentageToDP(2),
            }}
            numberOfLines={1}>
            {investment}
          </Text>

          <Text
            style={{
              color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
              fontFamily: FONT.bold,
              fontSize: heightPercentageToDP(1.5),
              letterSpacing: 4,
            }}>
            MONTHLY RETURN
          </Text>
          <Text
            style={{
              color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
              fontFamily: FONT.extrabold,
              fontSize: heightPercentageToDP(2),
            }}
            numberOfLines={1}>
            {montlyrReturn}
          </Text>


          <Text
          style={{
            color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
            fontFamily: FONT.bold,
            fontSize: heightPercentageToDP(1.5),
            letterSpacing: 3,
          }}>
          {planDuration} MONTH PLAN
        </Text>
        </View>
      </View>
    </LinearGradient>
  );
};

export default InvestmentItem;

const styles = StyleSheet.create({
  container: {
    height: heightPercentageToDP(20),
    margin: heightPercentageToDP(2),
    borderRadius: heightPercentageToDP(2),
    padding: heightPercentageToDP(1),
  },
  containerTop: {
    height: heightPercentageToDP(6),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: heightPercentageToDP(2),
  },
});
