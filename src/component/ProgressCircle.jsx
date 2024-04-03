import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import * as Progress from 'react-native-progress';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import {COLORS} from '../../constants';

const ProgressCircle = () => {
  const THEME = useSelector(state => state.theme);
  const [showProgressBar, setProgressBar] = useState(false);

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
      <Progress.Circle size={30} indeterminate={true} />
    </LinearGradient>
  );
};

export default ProgressCircle;

const styles = StyleSheet.create({});
