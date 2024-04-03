import React from 'react';
import * as Progress from 'react-native-progress';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import {COLORS, FONT} from '../../constants';
import {Text} from 'react-native';

const NoResultFound = ({val}) => {
  const THEME = useSelector(state => state.theme);

  return (
    <LinearGradient
      colors={[
        THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.gray2,
        THEME.data === 'DARK' ? COLORS.purpleDark : COLORS.lightWhite,
      ]}
      style={{
        height: heightPercentageToDP(30),
        margin: heightPercentageToDP(2),
        borderRadius: heightPercentageToDP(2),
        justifyContent: 'center',
        alignItems: 'center',
        margin: heightPercentageToDP(3),
      }}>
      <Text
        style={{
          color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
          fontFamily: FONT.bold,
          fontSize: heightPercentageToDP(2),
        }}>
        {val}
      </Text>
    </LinearGradient>
  );
};

export default NoResultFound;
