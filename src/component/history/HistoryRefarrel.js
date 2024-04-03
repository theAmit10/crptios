

import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONT} from '../../../constants';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Feather from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';
import WithdrawReferalItem from './withdraw/WithdrawReferalItem';
import {useSelector} from 'react-redux';
import URLHelper from '../../api/URLhelper/URLHelper';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';

const HistoryRefarrel = () => {
  const THEME = useSelector(state => state.theme);
  const ACCESS_TOKEN = useSelector(state => state.userAccessToken);
  const [depositListData, setDepositList] = useState([]);
  const [withdrawListData, setWithdrawList] = useState([]);
  const [combinedData, setCombinedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

  const [showFrom, setShowFrom] = useState(false);
  const [showTo, setShowTo] = useState(false);
  const [showProgressBarOne, setProgressBarOne] = useState(false);
  const [showProgressBarTwo, setProgressBarTwo] = useState(false);

  const onChangeFrom = (event, selectedDate) => {
    const currentDate = selectedDate || fromDate;
    // Define options for formatting the date
    const options = {year: 'numeric', month: 'long', day: '2-digit'};

    // Format the date using toLocaleDateString
    const formattedDate = currentDate.toLocaleDateString('en-US', options);
    // setShow(Platform.OS === 'ios');
    setShowFrom(Platform.OS === 'ios');
    setFromDate(currentDate);
  };

  const onChangeTo = (event, selectedDate) => {
    const currentDate = selectedDate || toDate;
    const options = {year: 'numeric', month: 'long', day: '2-digit'};
    const formattedDate = currentDate.toLocaleDateString('en-US', options);
    setShowTo(Platform.OS === 'ios');
    setToDate(currentDate);
  };

  const showMode = currentMode => {
    // setMode(currentMode);
  };

  const showModeFrom = currentMode => {
    setShowFrom(true);
    // setMode(currentMode);
  };

  const showModeTo = currentMode => {
    setShowTo(true);
    // setMode(currentMode);
  };

  const showDatepickerFrom = () => {
    showModeFrom('date');
    // handleDateChange(fromDate, 'START_DATE');
  };

  const showDatepickerTo = () => {
    showModeTo('date');
    // handleDateChange(toDate, 'END_DATE');
  };

  // Getting Deposit History

  useEffect(() => {
    getReferralListOne();
    getReferralListTwo();
  }, []);

  // For Getting Bank List
  const getReferralListOne = async () => {
    const apiUrl = URLHelper.REFERREL_DETAILS;
    // setProgressBarOne(true);
    const headers = {
      userapisecret: 'h0vWu6MkInNlWHJVfIXmHbIbC66cQvlbSUQI09Whbp',
      Authorization: `Bearer ${ACCESS_TOKEN.data}`,
    };

    // const temp =
    //   'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiMTNjMzQyZWVkYjUxMDRlZmNmNDRjOWE1OTYyODQ5ZDM4MDc0OTQ5MDEzMmM5NTQzYWI4NWM1YmEzY2M0OTMwMjcxNzg1ZDJkOTgyZDk0YTIiLCJpYXQiOjE2OTc5OTc5NDQuMTk4ODk1LCJuYmYiOjE2OTc5OTc5NDQuMTk4ODk4LCJleHAiOjE3Mjk2MjAzNDQuMTk4MjA0LCJzdWIiOiI0Iiwic2NvcGVzIjpbXX0.M9y8sRYqKoDIXSJoWHfNra8FaSBaiKHmymZTTFpWLIQVjUsyQrIXMItLpt9Zb9SpdqHUpjzru50ZsAI16LKJAlgAQbI_5J2LG3pEZL6-GdaCgGm1PsbjpynTXaYGMPxM4bVtGfpfb_e699sM2xmEZ3RnVM930FwiSC2P1zbF0aulEg0DtSWRIEOOdMNeFL1SW-z0U85JJbPK0ROJaDFqeLHtdCnFAd3_XP5CGq3H89BIKiAsgpYWcaRGj2tb6DY5e43gIDomUJIDhw_4Hj4wgG6Oi7VurzaubXodmbqHMWyAZKQ188GYRvsswQSFwD4qPxE8FaNhlBpjcOimASSQUBcHHrFGhZQpGO5f1jeNLNTA_v_-TzfqMi7pKF2mFk4vVKrcEwQcbm06Mniw06o--i3wlWgBmuK7MK7juS4zp-fIWU1bA4FnzMZC5RySRZd_u3xwwvVRUswjpgrVkwTAGmw8KTBUdinRdzs6QeY4kh3t6wf5E6omOAdF4U50FLKP0Cm5BHVSdWvNoGbZGQRe6uybERwWdfqbkEcchq0hZoeTLS8mDMauQBkdkeBt1HvCYTPtfOnmAE9WzXMmv4achdknqB6e3gT2bpKIJeqkKGQNH2GdYFwfGcwwRXZkOLBhCVLVY0TYdDv6x5QatwsbxODw15KO1EY2niHNhwkkQ_w';

    // const headers = {
    //   userapisecret: 'h0vWu6MkInNlWHJVfIXmHbIbC66cQvlbSUQI09Whbp',
    //   Authorization: `Bearer ${temp}`,
    // };

    try {
      const response = await axios.get(apiUrl, {headers});
      console.log('REQUEST STARTED');
      setProgressBarOne(false);
      setDepositList(response.data.data.referrals_1.users);

      console.log('REQUEST STOPPED');
    } catch (error) {
      // setProgressBarOne(false);
      if (error.response) {
        Toast.show({
          type: 'error',
          text1: 'error.response',
        });
        console.log('Error:', error.response);
      } else {
        Toast.show({
          type: 'error',
          text1: 'error.message',
        });
        console.log('Error:', error.message);
      }
    }
  };

  const getReferralListTwo = async () => {
    setProgressBarTwo(true);
    const apiUrl = URLHelper.REFERREL_DETAILS;

    const headers = {
      userapisecret: 'h0vWu6MkInNlWHJVfIXmHbIbC66cQvlbSUQI09Whbp',
      Authorization: `Bearer ${ACCESS_TOKEN.data}`,
    };

    // const temp =
    //   'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiMTNjMzQyZWVkYjUxMDRlZmNmNDRjOWE1OTYyODQ5ZDM4MDc0OTQ5MDEzMmM5NTQzYWI4NWM1YmEzY2M0OTMwMjcxNzg1ZDJkOTgyZDk0YTIiLCJpYXQiOjE2OTc5OTc5NDQuMTk4ODk1LCJuYmYiOjE2OTc5OTc5NDQuMTk4ODk4LCJleHAiOjE3Mjk2MjAzNDQuMTk4MjA0LCJzdWIiOiI0Iiwic2NvcGVzIjpbXX0.M9y8sRYqKoDIXSJoWHfNra8FaSBaiKHmymZTTFpWLIQVjUsyQrIXMItLpt9Zb9SpdqHUpjzru50ZsAI16LKJAlgAQbI_5J2LG3pEZL6-GdaCgGm1PsbjpynTXaYGMPxM4bVtGfpfb_e699sM2xmEZ3RnVM930FwiSC2P1zbF0aulEg0DtSWRIEOOdMNeFL1SW-z0U85JJbPK0ROJaDFqeLHtdCnFAd3_XP5CGq3H89BIKiAsgpYWcaRGj2tb6DY5e43gIDomUJIDhw_4Hj4wgG6Oi7VurzaubXodmbqHMWyAZKQ188GYRvsswQSFwD4qPxE8FaNhlBpjcOimASSQUBcHHrFGhZQpGO5f1jeNLNTA_v_-TzfqMi7pKF2mFk4vVKrcEwQcbm06Mniw06o--i3wlWgBmuK7MK7juS4zp-fIWU1bA4FnzMZC5RySRZd_u3xwwvVRUswjpgrVkwTAGmw8KTBUdinRdzs6QeY4kh3t6wf5E6omOAdF4U50FLKP0Cm5BHVSdWvNoGbZGQRe6uybERwWdfqbkEcchq0hZoeTLS8mDMauQBkdkeBt1HvCYTPtfOnmAE9WzXMmv4achdknqB6e3gT2bpKIJeqkKGQNH2GdYFwfGcwwRXZkOLBhCVLVY0TYdDv6x5QatwsbxODw15KO1EY2niHNhwkkQ_w';

    // const headers = {
    //   userapisecret: 'h0vWu6MkInNlWHJVfIXmHbIbC66cQvlbSUQI09Whbp',
    //   Authorization: `Bearer ${temp}`,
    // };

    try {
      const response = await axios.get(apiUrl, {headers});
      // setProgressBarTwo(false);
      setWithdrawList(response.data.data.referrals_2.users);

      console.log('REQUEST STOPPED');
    } catch (error) {
      // setProgressBarTwo(false);
      if (error.response) {
        Toast.show({
          type: 'error',
          text1: 'error.response',
        });
        console.log('Error:', error.response);
      } else {
        Toast.show({
          type: 'error',
          text1: 'error.message',
        });
        console.log('Error:', error.message);
      }
    }
  };

  useEffect(() => {
    // Combine data from both APIs
    setCombinedData([...depositListData, ...withdrawListData]);
    setFilteredData([...depositListData, ...withdrawListData]);
  }, [depositListData, withdrawListData]);

  const handleDateChange = (date, type) => {
    if (type === 'START_DATE') {
      setFromDate(date.dateString);
    } else if (type === 'END_DATE') {
      setToDate(date.dateString);
    }
  };

  const filterDataByDateRange = () => {
    if (fromDate && toDate) {
      const filtered = combinedData?.filter(item => {
        const itemDate = moment(item.joining_date).format('YYYY-MM-DD');
        return (
          moment(itemDate).isSameOrAfter(fromDate) &&
          moment(itemDate).isSameOrBefore(toDate)
        );
      });
      setFilteredData(filtered);
    }
  };

  console.log('COMBINE REferral LENGTH :: ' + combinedData.length);

  return (
    <View
      className="flex-1"
      style={{
        backgroundColor:
          THEME.data === 'LIGHT' ? COLORS.white : COLORS.purpleDark,
      }}>
      <View style={styles.dateContainer}>
        {/** Calender container */}
        <View
          style={{
            backgroundColor:
              THEME.data === 'LIGHT' ? COLORS.lightGray : COLORS.skyBlue,
            borderColor:
              THEME.data === 'LIGHT' ? COLORS.lightGray : COLORS.skyBlue,
            ...styles.dateContainerLeft,
          }}>
          <Feather name="calendar" size={20} color={COLORS.green} />
          {/** From Calender  */}
          <TouchableOpacity onPress={showDatepickerFrom}>
            <Text
              style={{
                color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                textAlignVertical: 'center',
                opacity: 0.5,
                fontFamily: FONT.regular,
              }}>
              From
            </Text>
            <Text
              style={{
                color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                textAlignVertical: 'center',
                fontFamily: FONT.regular,
              }}>
              {fromDate?.getDate() + ' '} {fromDate?.getMonth() + 1 + ' '}{' '}
              {fromDate?.getFullYear() + ' '}
            </Text>
          </TouchableOpacity>

          <Text
            style={{
              color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
              textAlignVertical: 'center',
            }}>
            -
          </Text>
          {/** To Calender  */}
          <TouchableOpacity onPress={showDatepickerTo}>
            <Text
              style={{
                color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                textAlignVertical: 'center',
                opacity: 0.5,
                fontFamily: FONT.regular,
              }}>
              To
            </Text>
            <Text
              style={{
                color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                textAlignVertical: 'center',
                fontFamily: FONT.regular,
              }}>
              {toDate?.getDate() + ' '} {toDate?.getMonth() + 1 + ' '}{' '}
              {toDate?.getFullYear() + ' '}
            </Text>
          </TouchableOpacity>

          {showFrom && (
            <DateTimePicker
              testID="dateTimePicker"
              value={fromDate}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onChangeFrom}
            />
          )}

          {showTo && (
            <DateTimePicker
              testID="dateTimePicker"
              value={toDate}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onChangeTo}
            />
          )}
        </View>

        <TouchableOpacity
          onPress={filterDataByDateRange}
          style={{
            borderColor:
              THEME.data === 'LIGHT' ? COLORS.lightGray : COLORS.skyBlue,
            ...styles.dateContainerRight,
          }}>
          <Feather
            name="search"
            size={25}
            color="white"
            style={{alignSelf: 'center', opacity: 0.9}}
          />
        </TouchableOpacity>
      </View>

      {/**  Container content */}

      {filteredData.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={filteredData}
          // keyExtractor={(item, index) => item.id}
          keyExtractor={(item, index) => index}
          // keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={({item}) => {
            return <WithdrawReferalItem value={item} />;
          }}
          ListFooterComponent={
            <View
              style={{
                marginTop: heightPercentageToDP(10),
              }}></View>
          }
        />
      ) : (
        <LinearGradient
          colors={[
            THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.gray2,
            THEME.data === 'DARK' ? COLORS.purpleDark : COLORS.lightWhite,
          ]}
          style={{
            height: heightPercentageToDP(30),
            margin: heightPercentageToDP(2),
            borderRadius: heightPercentageToDP(2),
          }}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text
              style={{
                fontFamily: FONT.bold,
                color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                textAlign: 'center',
              }}>
              No data found
            </Text>
          </View>
        </LinearGradient>
      )}
    </View>
  );
};

export default HistoryRefarrel;

const styles = StyleSheet.create({
  dateContainer: {
    height: heightPercentageToDP(10),
    marginTop: heightPercentageToDP(2),
    marginBottom: heightPercentageToDP(1),
    flexDirection: 'row',
  },
  dateContainerRight: {
    flex: 1,
    backgroundColor: COLORS.green,
    padding: heightPercentageToDP(2),
    borderWidth: 2,
    borderRadius: 10,
    marginEnd: 10,
    alignSelf: 'center',
  },
  dateContainerLeft: {
    width: widthPercentageToDP(75),
    padding: heightPercentageToDP(3),
    borderWidth: 2,
    borderRadius: 10,
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    gap: 10,
  },
});
