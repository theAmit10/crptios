import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, FONT} from '../../../constants';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';
import {LineChart} from 'react-native-chart-kit';
import {useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

const CenterGraph = props => {
  const THEME = useSelector(state => state.theme);
  const {image, title, amount, itemColor, chartPrices, chartColor, styleProp} =
    props;

  // console.log('Chart Color : ' + itemColor);
  if (chartPrices && chartPrices.length > 0) {
    // let startUnixTimeStamp = moment().subtract(7, 'day').unix();

    let realTimeChartData = chartPrices.map(value => value);

    return (
      <SafeAreaView style={[styles.CGcontainerGraph, styleProp]}>
        <LinearGradient
          colors={[
            THEME.data === 'DARK' ? COLORS.purple : COLORS.gray2,
            THEME.data === 'DARK' ? COLORS.purpleDark : COLORS.white,
          ]}
          className="rounded-full p-2"
          style={styles.CGmiddleContentTopIcon}>
          <Icon
            name={image}
            size={25}
            color={chartColor}
            style={{alignSelf: 'center', opacity: 0.9}}
            className="rounded-full"
          />
        </LinearGradient>

        <Text
          style={{
            color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
            ...styles.CGcontentTitle,
          }}>
          {title}
        </Text>
        <Text
          style={{
            color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
            ...styles.CGtotalBalAmount,
          }}>
          {amount}
        </Text>

        <View style={styles.CGchart}>
          <LineChart
            data={{
              datasets: [
                {
                  data: realTimeChartData,
                },
              ],
            }}
            width={widthPercentageToDP(20)}
            height={heightPercentageToDP(10)}
            yAxisLabel="$"
            yAxisSuffix="k"
            yAxisInterval={1}
            chartConfig={{
              backgroundGradientFrom:
                THEME.data === 'LIGHT' ? COLORS.lightGray : COLORS.skyBlue,
              backgroundGradientTo:
                THEME.data === 'LIGHT' ? COLORS.lightGray : COLORS.skyBlue,
              decimalPlaces: 1,

              color: (opacity = 1) => itemColor,
              labelColor: (opacity = 0) => `rgba(255, 255, 255, 0)`,
              barRadius: 10,

              style: {
                borderRadius: 2,
              },
            }}
            bezier
            style={{
              borderRadius: 1,
              alignItems: 'center',
              paddingRight: 0,
            }}
            withShadow
            withHorizontalLines={false}
            withDots={false}
            withInnerLines={false}
            withOuterLines={false}
            withVerticalLabels={false}
            withHorizontalLabels={false}
          />
        </View>
      </SafeAreaView>
    );
  } else {
    return <View style={styles.CGcontainer}></View>;
  }
};

export default CenterGraph;

const styles = StyleSheet.create({
  CGcontainerGraph: {
    width: widthPercentageToDP(35),
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginVertical: heightPercentageToDP(2),
    marginHorizontal: widthPercentageToDP(2),
    padding: heightPercentageToDP(1),
    borderRadius : heightPercentageToDP(2),
  },
  CGcontainer: {
    width: widthPercentageToDP(35),
    borderRadius: heightPercentageToDP(2),
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginVertical: heightPercentageToDP(2),
    marginHorizontal: widthPercentageToDP(2),
    padding: heightPercentageToDP(1),
  },
  CGcontentTitle: {
    fontFamily: FONT.medium,
    fontSize: heightPercentageToDP(2),
    marginVertical: heightPercentageToDP(1),
  },
  CGtotalBalAmount: {
    fontFamily: FONT.medium,
    fontSize: heightPercentageToDP(2),
  },
  CGmiddleContentTopIcon: {
    padding: heightPercentageToDP(1),
    alignSelf: 'flex-start',
  },
  CGchart: {},
});
