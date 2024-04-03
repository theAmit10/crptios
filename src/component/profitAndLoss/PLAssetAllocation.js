import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {COLORS, FONT} from '../../../constants';
import {BarChart, LineChart, PieChart} from 'react-native-gifted-charts';
import {useSelector} from 'react-redux';
import Helper from '../../../utils/Helper';

const data = [{value: 50}, {value: 80}, {value: 90}, {value: 70}];

const PLAssetAllocation = ({item}) => {
  console.log('PAL :: ' + item.invested_plan_lists);
  console.log('Data :: ' + data);

  const inputArray = [{title: 'Pro'}, {title: 'Cent'}];

  const outputArray = item.invested_plan_lists.map((item, index) => ({
    value: (index + 1) * 10, // Assigning arbitrary values (adjust as needed)
  }));

  console.log(outputArray);

  // const data = item.daily_invested_plan_profit.map((item) => ({
  //   name: `Day ${item.day}`,
  //   total: item.total,
  //   // color: '#' + ((1 << 24) * Math.random() | 0).toString(16), // Generate a random color
  //   legendFontColor: '#7F7F7F',
  //   legendFontSize: 15,
  // }));

  const THEME = useSelector(state => state.theme);
  return (
    <View
      style={{
        backgroundColor:
          THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.lightGray,
        ...styles.mainContainer,
      }}>
      {/** Top left container */}
      <View style={styles.leftContainer}>
        <PieChart
          radius={heightPercentageToDP(10)}
          innerCircleColor={
            THEME.data === 'LIGHT' ? COLORS.lightGray : COLORS.skyBlue
          }
          innerRadius={heightPercentageToDP(8)}
          data={outputArray}
          donut
          showGradient
          initialAngle={2}
          strokeWidth={5}
          strokeColor={
            THEME.data === 'LIGHT' ? COLORS.lightGray : COLORS.skyBlue
          }
          showText
        />
      </View>
      {/** Top Right container */}
      <View style={styles.rightContainer}>
        {/** Top Right Top container */}
        <View style={styles.rightContainerTop}>
          <Text
            style={{
              color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
              ...styles.rightContainerTopText,
            }}>
            Assets Allocation
          </Text>
        </View>

        {/** Top Right Top Content container */}
        <View style={styles.rightContainerContent}>
          {/** Top Right Top Content Data container */}

          {item.invested_plan_lists.map((item, index) => (
            <View key={index} style={styles.rightContainerContentData}>
              <View style={styles.rightContainerContentLeft}>
                <View className="rounded-full bg-yellow-300 h-2 w-2"></View>
                <Text
                  style={{
                    color:
                      THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                    ...styles.rightContainerContentLeftText,
                  }}
                  numberOfLines={1}>
                  {item.title}
                </Text>
              </View>
              <View style={styles.rightContainerContentRight}>
                <Text
                  style={{
                    color:
                      THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                    ...styles.rightContainerContentRightText,
                  }}
                  numberOfLines={1}>
                  {item.invested_amount}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default PLAssetAllocation;

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: heightPercentageToDP(2),
    flexDirection: 'row',
    padding: heightPercentageToDP(1),
  },
  leftContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: heightPercentageToDP(2),
  },
  rightContainer: {
    flex: 1,
  },
  rightContainerTop: {
    flex: 1,

    justifyContent: 'center',
  },
  rightContainerContent: {
    flex: 4,
  },
  rightContainerTopText: {
    fontFamily: FONT.bold,
    fontSize: heightPercentageToDP(2.5),
  },
  rightContainerContentData: {
    minHeight: heightPercentageToDP(5),
    flexDirection: 'row',
    paddingHorizontal: heightPercentageToDP(0.5),
  },
  rightContainerContentLeft: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  rightContainerContentRight: {
    flex: 1,

    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  rightContainerContentLeftText: {
    fontFamily: FONT.regular,
    fontSize: heightPercentageToDP(1.8),
  },
  rightContainerContentRightText: {
    fontFamily: FONT.semibold,
    fontSize: heightPercentageToDP(2),
  },
});
