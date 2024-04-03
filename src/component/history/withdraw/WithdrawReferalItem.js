import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {COLORS, FONT} from '../../../../constants';
import CoinItem from '../../Coinitems';
import {useSelector} from 'react-redux';
import moment from 'moment';

const WithdrawReferalItem = ({value}) => {
  const THEME = useSelector(state => state.theme);
  const [isHiddenBottomView, setIsHiddenBottomView] = useState(false);

  const convertTime = timeString => {
    const time = moment(timeString, 'YYYY-MM-DDTHH:mm:ss.SSSSSSZ');
    const formattedTime = time.format('MMM DD, YYYY hh:mm a');
    return formattedTime;
  };

  console.log('WITHDRAW VALUE :: ' + value.full_name);
  const hideView = () => {
    if (isHiddenBottomView) {
      setIsHiddenBottomView(false);
    } else {
      setIsHiddenBottomView(true);
    }
  };

  return (
    <TouchableOpacity onPress={hideView}>
      <View
        style={{
          backgroundColor:
            THEME.data === 'LIGHT' ? COLORS.lightGray : COLORS.skyBlue,
          borderColor:
            THEME.data === 'LIGHT' ? COLORS.lightGray : COLORS.skyBlue,
          ...styles.container,
        }}>
        {/** left container */}

        <View style={styles.containerLeft}>
          {/** withdraw or deposit icon  */}

          <View style={styles.middleContentTopIcon} className="rounded-full ">
            <MaterialCommunityIcons
              name="account"
              size={25}
              color="white"
              style={{alignSelf: 'center', opacity: 0.9}}
            />
          </View>

          <View style={styles.middleContent}>
            <View style={styles.middleContentTop}>
              <Text
                style={{
                  color:
                    THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                  ...styles.title,
                }}
                numberOfLines={1}>
                {value.full_name}
              </Text>

              <Text
                style={{
                  color:
                    THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                  ...styles.title,
                }}></Text>
            </View>

            <Text
              style={{
                color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                ...styles.subtitle,
              }}>
              {convertTime(value.joining_date)}
            </Text>
          </View>
        </View>

        {/** Right container */}
        <View style={styles.containerRight}>
          <View style={styles.rightStatusContainerLeft}>
            <View
              style={{
                backgroundColor:
                  THEME.data === 'LIGHT' ? COLORS.white : COLORS.purple,
                borderColor:
                  THEME.data === 'LIGHT' ? COLORS.lightGray : COLORS.skyBlue,
                ...styles.rightStatusContainerIconLeft,
              }}>
              <Ionicons
                name={isHiddenBottomView ? 'remove-outline' : 'add'}
                size={20}
                color={COLORS.green}
                style={{alignSelf: 'center', opacity: 0.9}}
              />
            </View>
          </View>
        </View>
      </View>

      {/** bottom View */}

      {isHiddenBottomView && (
        <View
          style={{
            backgroundColor:
              THEME.data === 'LIGHT' ? COLORS.lightGray : COLORS.skyBlue,
            borderColor:
              THEME.data === 'LIGHT' ? COLORS.lightGray : COLORS.skyBlue,
            ...styles.bottmContainer,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{flex: 2, alignItems: 'flex-start'}}>
              <Text style={styles.bottomTitle}>Email</Text>
              <Text
                style={{
                  color:
                    THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                  ...styles.subtitle,
                }}
                numberOfLines={2}>
                {value.email}
              </Text>
            </View>

            <View style={{flex: 1, alignItems: 'center'}}>
              <Text style={styles.bottomTitle}>Tier</Text>
              <Text
                style={{
                  color:
                    THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                  ...styles.subtitle,
                }}>
                {value.level_2 ? '2' : '1'}
              </Text>
            </View>

            {/**
          <View style={{flex: 1, alignItems: 'center'}}>
              <Text style={styles.bottomTitle}>Total Value</Text>
              <Text
                style={{
                  color:
                    THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                  ...styles.subtitle,
                }}>
                $78.89
              </Text>
            </View>
          
          */}
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default WithdrawReferalItem;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    height: heightPercentageToDP(10),

    marginTop: heightPercentageToDP(1),
    marginHorizontal: heightPercentageToDP(1),
    padding: heightPercentageToDP(1),
    borderWidth: 2,
    borderRadius: 10,
  },

  title: {
    fontFamily: FONT.semibold,
    fontSize: heightPercentageToDP(2),
    textAlignVertical: 'center',
    alignItems: 'baseline',
  },
  subtitle: {
    fontFamily: FONT.regular,
    fontSize: heightPercentageToDP(2),
    textAlignVertical: 'center',
    alignItems: 'baseline',
  },
  containerLeft: {
    width: widthPercentageToDP(80),
    flexDirection: 'row',
  },
  containerRight: {
    flexDirection: 'row',
  },
  iconStatus: {
    backgroundColor: COLORS.green,
    padding: heightPercentageToDP(1),
    borderWidth: 2,
    borderRadius: 10,
    marginEnd: 10,
    borderColor: COLORS.green,
    alignSelf: 'center',
  },
  middleContent: {
    justifyContent: 'center',
  },
  middleContentTop: {
    flexDirection: 'row',
    gap: 3,
  },
  middleContentTopIcon: {
    backgroundColor: 'orange',
    padding: heightPercentageToDP(0.5),
    alignSelf: 'center',
    marginEnd: 10,
  },

  rightStatusContainer: {
    flex: 1,
    alignSelf: 'center',
  },
  rightStatusContainerLeft: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
  rightStatusContainerIconLeft: {
    borderWidth: 1,

    borderRadius: 5,
  },
  rightStatusContainerIcon: {
    padding: heightPercentageToDP(0.5),
    alignSelf: 'center',
    justifyContent: 'center',
  },
  rightStatusContainerIconTitle: {
    color: 'white',
    fontFamily: FONT.regular,
    fontSize: heightPercentageToDP(2),
    textAlign: 'center',
    color: COLORS.green,
  },
  bottomTitle: {
    color: COLORS.green,
    fontFamily: FONT.regular,
    fontSize: heightPercentageToDP(2),
    textAlignVertical: 'center',
    alignItems: 'baseline',
  },
  bottmContainer: {
    height: heightPercentageToDP(10),
    marginHorizontal: heightPercentageToDP(1),
    padding: heightPercentageToDP(1),
    borderTopRightRadius: 2,
    borderBottomRightRadius: heightPercentageToDP(1),
    borderBottomLeftRadius: heightPercentageToDP(1),
    marginTop: heightPercentageToDP(-1),
    borderWidth: 2,
  },
});
