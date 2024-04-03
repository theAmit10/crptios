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
import {BarChart, LineChart, PieChart} from 'react-native-gifted-charts';

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

const Graph = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../../assets/image/bitcoin_image.jpg')}
        style={styles.centerImage}
      />
      <View style={styles.containerTop}>
        <Text style={styles.totalBal}>Total Balance</Text>
        <Text style={styles.totalBalAmount}>$20,360.34</Text>
      </View>
      <Text style={styles.totalVal}>
        BTC: 0,0035
        <Text className="text-green-500">+5.64%</Text>
      </Text>

      <View style={styles.chart}>
        <LineChart
          data={lineData}
          curved={true}
          isAnimated={true}
          // animateTogether
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
          color1="red"
          color2="orange"
          textColor1="green"
          dataPointsHeight={6}
          dataPointsWidth={6}
          dataPointsHeight2={6}
          dataPointsWidth2={6}
          dataPointsColor1="blue"
          dataPointsColor2="red"
          textShiftY={-2}
          textShiftX={-2}
          textFontSize={10}
          hideRules
          spacing={10}
          hideAxesAndRules
        />
      </View>

      <View style={styles.containerBottom}>
        <TouchableOpacity>
          <Text style={styles.bottomContainerContent}>1H</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.bottomContainerContent}>1D</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.bottomContainerContent}>1W</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.bottomContainerContent}>1M</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.bottomContainerContent}>1Y</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.bottomContainerContent}>All</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Graph;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    position: 'relative',
    backgroundColor: COLORS.skyBlue,
    width: '100%',
    height: heightPercentageToDP(40),
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: heightPercentageToDP(3),
  },
  totalBal: {
    color: 'white',
    fontFamily: FONT.medium,
    fontSize: heightPercentageToDP(2),
    margin: 10,
    marginTop: 10,
  },
  totalBalAmount: {
    color: 'white',
    fontFamily: FONT.medium,
    fontSize: heightPercentageToDP(3),
  },
  totalVal: {
    color: 'white',
    fontFamily: FONT.regular,
    fontSize: heightPercentageToDP(1.6),
    paddingStart: 30,
    paddingBottom: 10,
    paddingTop: 10,
    paddingStart: 20,
    paddingEnd: 20,
    backgroundColor: COLORS.purpleDark,
    borderWidth: 2,
    borderColor: COLORS.skyBlue,
    borderRadius: 20,
  },

  centerImage: {
    position: 'absolute',
    left: -40,
    width: '50%',
    height: '100%',
    resizeMode: 'cover',
    opacity: 0.1,
  },
  containerBottom: {
    flexDirection: 'row',
    position: 'absolute',
    alignItems: 'center',
    bottom: 10,
    justifyContent: 'space-evenly',
  },
  bottomContainerContent: {
    color: 'white',
    fontFamily: FONT.medium,
    fontSize: heightPercentageToDP(1.6),
    paddingBottom: 5,
    paddingTop: 5,
    paddingStart: 20,
    paddingEnd: 20,
    backgroundColor: COLORS.purpleDark,
    borderWidth: 2,
    borderColor: COLORS.skyBlue,
    borderRadius: 10,
  },
  chart: {
    position: 'absolute',
    zIndex: -1,
    left: 0,
  },
  chartIndicatorStatus: {
    position: 'absolute',
    width: widthPercentageToDP(30),
    color: COLORS.purpleDark,
    fontFamily: FONT.semibold,
    fontSize: heightPercentageToDP(2),
    zIndex: 99,

    paddingBottom: 10,
    paddingTop: 10,
    paddingStart: 20,

    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.skyBlue,
    borderRadius: 20,
  },
});
