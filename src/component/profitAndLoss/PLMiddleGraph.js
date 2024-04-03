import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, { useState } from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {COLORS, FONT} from '../../../constants';
import {BarChart, LineChart, PieChart} from 'react-native-gifted-charts';
import {useDispatch, useSelector} from 'react-redux';

const lineData = [
  {value: 0, dataPointText: '0'},
  {value: 20, dataPointText: '20'},
  {value: 18, dataPointText: '18'},
  {value: 90, dataPointText: '40'},
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



const PLMiddleGraph = () => {
  const THEME = useSelector(state => state.theme);

  return (
    <View
      style={{
        backgroundColor:
          THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.lightGray,
        ...styles.mainContainer,
      }}>
      {/** TOP CONTAINER */}
      <View style={styles.topContainer}>
        <View style={styles.topContainerLeft}>
          <Text
            style={{
              color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
              ...styles.topContainerLeftTitle,
            }}>
            Profit & Loss
          </Text>
        </View>
        <View style={styles.topContainerRight}>
          <TouchableOpacity>
            <Text
              style={{
                backgroundColor:
                  THEME.data === 'DARK' ? COLORS.purple : COLORS.white,
                color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                borderColor:
                  THEME.data === 'DARK' ? COLORS.purple : COLORS.white,
                ...styles.bottomContainerContent,
              }}>
              1D
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text
              style={{
                backgroundColor:
                  THEME.data === 'DARK' ? COLORS.purple : COLORS.white,
                color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                borderColor:
                  THEME.data === 'DARK' ? COLORS.purple : COLORS.white,
                ...styles.bottomContainerContent,
              }}>
              1W
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text
              style={{
                backgroundColor:
                  THEME.data === 'DARK' ? COLORS.purple : COLORS.white,
                color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                borderColor:
                  THEME.data === 'DARK' ? COLORS.purple : COLORS.white,
                ...styles.bottomContainerContent,
              }}>
              1M
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/** GRAPH CONTAINER */}

      <View style={styles.graphContainer}>
        <LineChart
          flex={1}
          width={widthPercentageToDP(100)}
          data={lineData}
          curved={true}
          isAnimated={true}
          animateTogether
          pressEnabled={true}
          showStripOnPress={true}
          showTextOnPress={true}
          disableScroll={true}
          pointerConfig={{
            radius: 5,

            // pointerStripHeight:120,
            pointerLabelComponent: () => {
              return (
                <View
                  style={{
                    position: 'relative',
                    width: widthPercentageToDP(40),
                  }}>
                  <Text style={styles.chartIndicatorStatus}>$15,360.34</Text>
                </View>
              );
            },
          }}
          // data2={lineData2}
          hideDataPoints
          // height={heightPercentageToDP(30)}
          // showVerticalLines
          // spacing={44}
          initialSpacing={0}
          color1="orange"
          color2="red"
          textColor1="green"
          dataPointsHeight={6}
          dataPointsWidth={6}
          dataPointsHeight2={6}
          dataPointsWidth2={6}
          dataPointsColor1="blue"
          dataPointsColor2="orange"
          textShiftY={-2}
          textShiftX={-2}
          textFontSize={10}
          hideRules
          spacing={10}
        />
      </View>
    </View>
  );
};

export default PLMiddleGraph;

const styles = StyleSheet.create({
  mainContainer: {
    height: heightPercentageToDP(40),
    marginTop: heightPercentageToDP(2),

  },
  topContainer: {
    height: heightPercentageToDP(5),
    flexDirection: 'row',
  },
  topContainerLeft: {
    flex: 1,
    padding: heightPercentageToDP(1),
  },
  topContainerRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  topContainerLeftTitle: {
    fontFamily: FONT.extrabold,
    alignSelf: 'flex-start',
    fontSize: heightPercentageToDP(2.5),
  },
  bottomContainerContent: {
    fontFamily: FONT.medium,
    fontSize: heightPercentageToDP(1.6),

    borderWidth: 2,

    borderRadius: heightPercentageToDP(1),
    paddingHorizontal: heightPercentageToDP(1.5),
    textAlignVertical: 'center',
    fontSize: heightPercentageToDP(1.8),
    paddingVertical: heightPercentageToDP(0.2),
  },
  graphContainer: {
    flex: 1,
    padding: heightPercentageToDP(1)
  },
});
