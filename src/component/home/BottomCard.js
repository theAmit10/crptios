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
import {heightPercentageToDP} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';

const BottomCard = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.containerLeft}>
        <TouchableOpacity style={styles.imageContainer}>
          <Image
            source={require('../../../assets/image/round_bg.png')}
            style={styles.centerImage}
          />
          <Image
            source={require('../../../assets/image/search_white.png')}
            style={styles.centerImageIcon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.containerMiddle}>
        <Text style={styles.title}>0.015 BTC</Text>
        <Text style={styles.subtitle}>Jan 8, 2023 - 8:20am</Text>
      </View>

      <View style={styles.containerRight}>
        <Ionicons
          name="add"
          size={30}
          color={COLORS.green}
          
        />
      </View>
    </TouchableOpacity>
  );
};

export default BottomCard;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: COLORS.skyBlue,

    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 15,
    marginStart: 10,
    marginEnd: 10,
    lineHeight: 50,
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
  },
  gainer: {
    color: 'white',
    fontFamily: FONT.semibold,
    fontSize: 12,
    paddingBottom: 5,
    paddingTop: 5,
    paddingStart: 30,
    paddingEnd: 30,
    backgroundColor: 'green',
    borderWidth: 2,
    borderColor: COLORS.white,
    borderRadius: 10,
    textAlignVertical: 'center',
    textAlign: 'center',
    opacity: 0.8,
  },
  loser: {
    color: 'white',
    fontFamily: FONT.semibold,
    fontSize: 12,
    paddingBottom: 5,
    paddingTop: 5,
    paddingStart: 30,
    paddingEnd: 30,
    backgroundColor: 'red',
    borderWidth: 2,
    borderColor: 'red',
    borderRadius: 10,
    textAlignVertical: 'center',
    textAlign: 'center',
    opacity: 0.8,
  },

  title: {
    color: 'white',
    fontFamily: FONT.extrabold,
    fontSize: heightPercentageToDP(2),
    textAlignVertical: 'center',
    alignItems: 'baseline',
    marginStart: 10,
  },
  subtitle: {
    color: 'white',
    fontFamily: FONT.regular,
    fontSize: heightPercentageToDP(2),
    textAlignVertical: 'center',
    alignItems: 'baseline',
    marginStart: 10,
  },
  centerImage: {
    width: 40,
    height: 60,
    resizeMode: 'cover',
  },
  containerLeft: {
    flexDirection: 'row',
  },
  containerRight: {
    alignSelf: 'center',
  },
  imageContainer: {
    position: 'relative',
  },
  centerImageIcon: {
    width: 20,
    height: 20,
    resizeMode: 'cover',
    position: 'absolute',
    top: 20,
    left: 10,
  },
  containerMiddle: {
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
  },
});
