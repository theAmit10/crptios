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
import Helper from '../../../../utils/Helper';

const WithdrawItem = ({value}) => {
  const THEME = useSelector(state => state.theme);
  const [isHiddenBottomView, setIsHiddenBottomView] = useState(false);

  const convertTime = timeString => {
    const time = moment(timeString, 'YYYY-MM-DDTHH:mm:ss.SSSSSSZ');
    const formattedTime = time.format('MMM DD, YYYY hh:mm a');
    return formattedTime;
  };

  const getPaymentMethod = v => {
    let method = null;
    if (v == 1) {
      method = 'Bank';
    } else if (v == 2) {
      method = 'Wallet';
    } else if (v == 3) {
      method = 'UPI';
    }
    return method;
  };

  const getPaymentStatus = v => {
    let method = null;
    if (v == 0) {
      method = 'Pending';
    } else if (v == 1) {
      method = 'Success';
    } else if (v == 'Pending') {
      method = 'Pending';
    } else if (v == 'Success') {
      method = 'Success';
    }
    return method;
  };

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
          <View style={styles.iconStatus}>
            <Feather
              name={value.fees == 'WITHDRAW' ? 'arrow-up' : 'arrow-down'}
              size={25}
              color="white"
              style={{alignSelf: 'center', opacity: 0.9}}
            />
          </View>

          <View style={styles.middleContent}>
            <View style={styles.middleContentTop}>
              {/** 
          
          <View
                style={styles.middleContentTopIcon}
                className="rounded-full ">
                <MaterialCommunityIcons
                  name="bitcoin"
                  size={15}
                  color="white"
                  style={{alignSelf: 'center', opacity: 0.9}}
                />
              </View>
          */}

              <Text
                style={{
                  color:
                    THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                  ...styles.title,
                }}>
                {Helper.INR_SYMBOL +
                  Number.parseFloat(value.currency_amount).toFixed(0)}
              </Text>
            </View>

            <Text
              style={{
                color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                ...styles.topSubtitle,
              }}>
              {convertTime(value.created_at)}
            </Text>
          </View>
        </View>

        {/** Right container */}
        <View style={styles.containerRight}>
          <View style={styles.rightStatusContainer}>
            <View
              style={{
                backgroundColor:
                  THEME.data === 'LIGHT' ? COLORS.white : COLORS.purple,
                borderColor:
                  THEME.data === 'LIGHT' ? COLORS.lightGray : COLORS.skyBlue,
                ...styles.rightStatusContainerIcon,
              }}
              className="rounded-full ">
              <MaterialCommunityIcons
                name={
                  getPaymentStatus(value.status) == 'Success'
                    ? 'check'
                    : 'clock'
                }
                size={15}
                color={
                  getPaymentStatus(value.status) == 'Success'
                    ? COLORS.green
                    : 'orange'
                }
                style={{alignSelf: 'center', opacity: 0.9}}
              />
            </View>
            <Text
              style={{
                color:
                  getPaymentStatus(value.status) == 'Success'
                    ? COLORS.green
                    : 'orange',
                fontFamily: FONT.regular,
                fontSize: heightPercentageToDP(2),
                textAlign: 'center',
              }}>
              {getPaymentStatus(value.status)}
            </Text>
          </View>
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
              gap: 3,
            }}>
            <View style={{flex: 1, alignItems: 'flex-start'}}>
              <Text style={styles.bottomTitle}>
                {value.fees == 'WITHDRAW' ? 'Account No' : 'Payment Method'}
              </Text>
              <Text
                style={{
                  color:
                    THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                  ...styles.subtitle,
                }}
                numberOfLines={1}>
                {value.fees == 'WITHDRAW'
                  ? value.account_no
                  : getPaymentMethod(value.payment_method_id)}
              </Text>
            </View>

            <View style={{flex: 1, alignItems: 'center'}}>
              <Text style={styles.bottomTitle}>
                {value.fees == 'WITHDRAW' ? 'Holder Name' : 'ID'}
              </Text>
              <Text
                style={{
                  color:
                    THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                  ...styles.subtitle,
                }}
                numberOfLines={1}>
                {value.fees == 'WITHDRAW'
                  ? value.account_holder_name
                  : value.transaction_id}
              </Text>
            </View>

            <View style={{flex: 1, alignItems: 'center'}}>
              <Text style={styles.bottomTitle}>Total Value</Text>
              <Text
                style={{
                  color:
                    THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                  ...styles.subtitle,
                }}
                numberOfLines={1}>
                {Number.parseFloat(value.currency_amount).toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default WithdrawItem;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    height: heightPercentageToDP(10),
    marginTop: heightPercentageToDP(1),
    marginHorizontal: heightPercentageToDP(1),
    padding: heightPercentageToDP(1),
    borderWidth: 2,
    borderRadius: heightPercentageToDP(1),
  },

  title: {
    fontFamily: FONT.semibold,
    fontSize: heightPercentageToDP(2),
    textAlignVertical: 'center',
    alignItems: 'baseline',
  },
  topSubtitle: {
    fontFamily: FONT.regular,
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
    width: widthPercentageToDP(65),
    flexDirection: 'row',
  },
  containerRight: {
    flex: 1,
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
  },
  middleContentTopIcon: {
    backgroundColor: 'orange',
    padding: heightPercentageToDP(0.2),
    borderColor: COLORS.orange,
    alignSelf: 'center',
    marginEnd: 2,
  },
  rightStatusContainer: {
    flex: 2,
    alignSelf: 'center',
  },
  rightStatusContainerLeft: {
    flex: 1,
    justifyContent: 'center',
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
