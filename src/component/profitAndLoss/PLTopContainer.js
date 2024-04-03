import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {COLORS, FONT} from '../../../constants';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';

const data = [{value: 50}, {value: 80}, {value: 90}, {value: 70}];
const lineData = [
  {value: 0, dataPointText: '0'},
  {value: 20, dataPointText: '20'},
  {value: 18, dataPointText: '18'},
  {value: 200, dataPointText: '40'},
  {value: 36, dataPointText: '36'},
  {value: 60, dataPointText: '60'},
  {value: 54, dataPointText: '54'},
  {value: 85, dataPointText: '85'},
  {value: 36, dataPointText: '36'},
  {value: 100, dataPointText: '60'},
  {value: 54, dataPointText: '54'},
  {value: 8, dataPointText: '85'},
  {value: 36, dataPointText: '36'},
  {value: 60, dataPointText: '60'},
  {value: 54, dataPointText: '54'},
  {value: 85, dataPointText: '85'},
  {value: 36, dataPointText: '36'},
  {value: 60, dataPointText: '60'},
  {value: 54, dataPointText: '54'},
  {value: 85, dataPointText: '85'},
  {value: 36, dataPointText: '36'},
  {value: 60, dataPointText: '60'},
  {value: 54, dataPointText: '54'},
  {value: 85, dataPointText: '85'},
  {value: 36, dataPointText: '36'},
  {value: 60, dataPointText: '60'},
  {value: 54, dataPointText: '54'},
  {value: 85, dataPointText: '85'},
  {value: 36, dataPointText: '36'},
  {value: 60, dataPointText: '60'},
  {value: 54, dataPointText: '54'},
  {value: 85, dataPointText: '85'},
];

const PLTopContainer = () => {
  const THEME = useSelector(state => state.theme);
  return (
    <SafeAreaView
      style={{
        backgroundColor:
          THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.lightGray,
        ...styles.PLcontainer,
      }}>
      <Image
        source={require('../../../assets/image/bitcoin_image.jpg')}
        style={styles.PLcenterImage}
      />
      <View>
        <Text
          style={{
            color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
            ...styles.PLtotalBal,
          }}>
          Total Balance
        </Text>
        <Text
          style={{
            color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
            ...styles.PLtotalBalAmount,
          }}>
          $20,360.34
        </Text>
      </View>

      <View style={styles.PLtotalValContainer}>
        <MaterialCommunityIcons name="bitcoin" size={20} color="orange" />
        <Text
          style={{
            color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
            ...styles.PLtotalValText,
          }}>
          0,0035
        </Text>
        <Text
          style={{
            color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
            ...styles.PLtotalValText,
          }}>
          BTC
        </Text>
      </View>

      <View style={styles.PLcontainerBottom}>
        <TouchableOpacity>
          <View
            style={{
              backgroundColor:
                THEME.data === 'DARK' ? COLORS.purple : COLORS.white,
              ...styles.bottomContainerLeft,
            }}>
            <Text
              style={{
                color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                ...styles.PLbottomContainerContent,
              }}>
              YESTERDAY’S P&L
            </Text>
            <Text
              style={{
                color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                ...styles.PLbottomContainerLoss,
              }}>
              -$5979.68
              <Text style={{fontSize: heightPercentageToDP(1.5)}}> +4.5%</Text>
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View
            style={{
              backgroundColor:
                THEME.data === 'DARK' ? COLORS.purple : COLORS.white,
              ...styles.PLbottomContainerRight,
            }}>
            <Text
              style={{
                color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                ...styles.PLbottomContainerContent,
              }}>
              YESTERDAY’S P&L
            </Text>
            <Text
              style={{
                color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                ...styles.PLbottomContainerProfit,
              }}>
              +$465.37{' '}
              <Text style={{fontSize: heightPercentageToDP(1.5)}}> +4.5%</Text>
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PLTopContainer;

const styles = StyleSheet.create({
  PLcontainer: {
    display: 'flex',
    position: 'relative',
    width: '100%',
    height: heightPercentageToDP(25),
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: heightPercentageToDP(3),
  },
  PLtotalBal: {
    fontFamily: FONT.medium,
    fontSize: heightPercentageToDP(2),
    margin: heightPercentageToDP(2),
    alignSelf: 'center',
  },

  PLtotalBalAmount: {
    fontFamily: FONT.medium,
    fontSize: heightPercentageToDP(3),
    alignSelf: 'center',
  },
  PLtotalValContainer: {
    fontFamily: FONT.regular,
    fontSize: heightPercentageToDP(1.6),
    flexDirection: 'row',
    gap: heightPercentageToDP(1),
  },
  totalValText: {
    fontFamily: FONT.regular,
    fontSize: heightPercentageToDP(1.6),

    textAlignVertical: 'center',
  },
  PLtotalVal: {
    fontFamily: FONT.regular,
    fontSize: heightPercentageToDP(1.6),
  },

  PLcenterImage: {
    position: 'absolute',
    height: '100%',
    resizeMode: 'cover',
    opacity: 0.1,
  },
  PLcontainerBottom: {
    flex: 1,
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(100),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  PLbottomContainerLeft: {
    flex: 1,
    width: widthPercentageToDP(40),
    height: heightPercentageToDP(100),
    margin: heightPercentageToDP(1),
    borderRadius: heightPercentageToDP(1),
    padding: heightPercentageToDP(2),
    alignItems: 'center',
  },
  PLbottomContainerRight: {
    flex: 1,

    width: widthPercentageToDP(40),
    height: heightPercentageToDP(100),
    margin: heightPercentageToDP(1),
    borderRadius: heightPercentageToDP(1),
    padding: heightPercentageToDP(2),
    alignItems: 'center',
  },
  PLbottomContainerContent: {
    fontFamily: FONT.medium,
    fontSize: heightPercentageToDP(1.5),
  },
  PLbottomContainerLoss: {
    flex: 1,
    color: COLORS.red,
    fontFamily: FONT.medium,
    fontSize: heightPercentageToDP(1.8),
  },
  PLbottomContainerProfit: {
    flex: 1,
    color: COLORS.green,
    fontFamily: FONT.medium,
    fontSize: heightPercentageToDP(1.8),
  },
});
