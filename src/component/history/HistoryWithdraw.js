import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONT} from '../../../constants';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Feather from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';
import WithdrawItem from './withdraw/WithdrawItem';
import {useSelector} from 'react-redux';
import URLHelper from '../../api/URLhelper/URLHelper';
import axios from 'axios';
import moment from 'moment';
import Toast from 'react-native-toast-message';
import Loading from '../Loading';
import LinearGradient from 'react-native-linear-gradient';

const HistoryWithdraw = () => {
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
    getDepositList();
    getWithdrawList();
  }, []);

  // For Getting Bank List
  const getDepositList = async () => {
    const apiUrl = URLHelper.DEPOSIT_HISTORY;

    const headers = {
      userapisecret: 'h0vWu6MkInNlWHJVfIXmHbIbC66cQvlbSUQI09Whbp',
      Authorization: `Bearer ${ACCESS_TOKEN.data}`,
    };

    try {
      const response = await axios.get(apiUrl, {headers});
      console.log('REQUEST STARTED');
      console.log(
        'Response length DEPOSIT HISTORY ::',
        response.data.data.data.length,
      );
      // console.log('Response :', response.data.data.data);

      setDepositList(response.data.data.data);

      console.log('REQUEST STOPPED');
    } catch (error) {
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

  const getWithdrawList = async () => {
    const apiUrl = URLHelper.WITHDRAW_HISTORY;

    const headers = {
      userapisecret: 'h0vWu6MkInNlWHJVfIXmHbIbC66cQvlbSUQI09Whbp',
      Authorization: `Bearer ${ACCESS_TOKEN.data}`,
    };

    try {
      const response = await axios.get(apiUrl, {headers});
      console.log('REQUEST STARTED');
      console.log(
        'Response length  WITHDRAW LENGTH ::',
        response.data.data.data.length,
      );
      // console.log('Response :', response.data.data.data);

      const depositData = response.data.data.data;

      depositData.forEach(item => {
        item.fees = 'WITHDRAW';
      });

      // setWithdrawList(response.data.data.data);
      setWithdrawList(depositData);

      console.log('REQUEST STOPPED');
    } catch (error) {
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
        const itemDate = moment(item.created_at).format('YYYY-MM-DD');
        return (
          moment(itemDate).isSameOrAfter(fromDate) &&
          moment(itemDate).isSameOrBefore(toDate)
        );
      });
      setFilteredData(filtered);
    }
  };

  console.log('Deposit LENGTH :: ' + depositListData.length);
  console.log('Withdraw LENGTH :: ' + withdrawListData.length);
  console.log('COMBINE LENGTH :: ' + combinedData.length);

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
            return <WithdrawItem value={item} />;
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

export default HistoryWithdraw;

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
    borderRadius: heightPercentageToDP(2),
    marginHorizontal: heightPercentageToDP(2),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    gap: 10,
  },
});
