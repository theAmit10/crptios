import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import URLHelper from '../../api/URLhelper/URLHelper';
import axios from 'axios';
import {COLORS, FONT} from '../../../constants';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import HeaderTop from '../../component/profile/HeaderTop';
import moment from 'moment';

const TicketDetails = ({route}) => {
  const {itemId} = route.params;
  const THEME = useSelector(state => state.theme);
  const ACCESS_TOKEN = useSelector(state => state.userAccessToken);

  const [dataVal, setData] = useState(null);
  const [showProgressBar, setProgressBar] = useState(false);

  console.log(itemId.id);

  const convertTime = timeString => {
    const time = moment(timeString, 'YYYY-MM-DDTHH:mm:ss.SSSSSSZ');
    const formattedTime = time.format('MMM DD, YYYY hh:mm a');
    return formattedTime;
  };

  useEffect(() => {
    getAllTicketData();
  }, []);

  // For My Investment list
  const getAllTicketData = async () => {
    setProgressBar(true);
    const apiUrl = URLHelper.GET_TICKET_DETAILS + '/' + itemId.id;

    const headers = {
      userapisecret: 'h0vWu6MkInNlWHJVfIXmHbIbC66cQvlbSUQI09Whbp',
      Authorization: `Bearer ${ACCESS_TOKEN.data}`,
    };

    try {
      const response = await axios.get(apiUrl, {headers});
      console.log('REQUEST STARTED');

      console.log(response.data.data);

      setData(response.data.data);
      console.log('REQUEST STOPPED');
    } catch (error) {
      if (error.response) {
        console.error('Error:', error.response);
      } else {
        console.error('Error:', error.message);
      }
    }
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor:
          THEME.data === 'LIGHT' ? COLORS.white : COLORS.purpleDark,
        borderColor: THEME.data === 'LIGHT' ? COLORS.white : COLORS.purpleDark,
        ...styles.mainCointer,
      }}>
      <HeaderTop value={'Ticket Details'} />

      <View
        style={{
          minHeight: heightPercentageToDP(8),
          backgroundColor:
            THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.lightGray,
          margin: heightPercentageToDP(2),
          padding: heightPercentageToDP(2),
          borderRadius: heightPercentageToDP(2),
        }}>
        <View style={{padding: heightPercentageToDP(1)}}>
          <Text
            style={{
              color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
              ...styles.title,
            }}>
            Subject : {dataVal ? dataVal.sub : ''}
          </Text>
          <Text
            style={{
              color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
              fontFamily: FONT.regular,
              fontSize: heightPercentageToDP(1.5),
            }}>
            Created At : {dataVal ? convertTime(dataVal.created_at) : ''}
          </Text>
        </View>
      </View>

      <View
        style={{
          minHeight: heightPercentageToDP(8),
          backgroundColor:
            THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.lightGray,
          margin: heightPercentageToDP(2),
          padding: heightPercentageToDP(2),
          borderTopLeftRadius: heightPercentageToDP(3),
          borderBottomRightRadius: heightPercentageToDP(3),
          borderTopRightRadius: heightPercentageToDP(3),
        }}>
        <View>
          <Text
            style={{
              color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
              fontFamily: FONT.regular,
              fontSize: heightPercentageToDP(2),
              textAlignVertical: 'center',
            }}>
            {dataVal ? dataVal.msg : ''}
          </Text>
        </View>
      </View>

      {dataVal && dataVal.response_data.length != 0 && (
        <View
          style={{
            minHeight: heightPercentageToDP(20),
            backgroundColor:
              THEME.data === 'DARK' ? COLORS.skyBlue : COLORS.lightGray,
            margin: heightPercentageToDP(2),
            padding: heightPercentageToDP(2),
            borderTopLeftRadius: heightPercentageToDP(3),
            borderBottomRightRadius: heightPercentageToDP(3),
            borderBottomLeftRadius: heightPercentageToDP(3),
          }}>
          <View>
            <Text
              style={{
                color: THEME.data === 'DARK' ? COLORS.white : COLORS.purpleDark,
                fontFamily: FONT.regular,
                fontSize: heightPercentageToDP(2),
              }}>
              {dataVal.response_data[0].responses}
            </Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

// {dataVal.length > 0 ? (
//   <FlatList
//     data={dataVal}
//     keyExtractor={(item, index) => index}
//     renderItem={({item, index}) => {
//       return (
//         <TouchableOpacity
//           key={index.toString()}
//           onPress={() => console.log('Pressed')}>
//           <TicketItem value={item} />
//         </TouchableOpacity>
//       );
//     }}
//   />
// ) : (
//   <NoResultFound val={'No data found'} />
// )}

export default TicketDetails;
const styles = StyleSheet.create({
  mainCointer: {
    flex: 1,
  },
  contentContainer: {
    height: heightPercentageToDP(10),

    margin: heightPercentageToDP(2),
    padding: heightPercentageToDP(1),
    flexDirection: 'row',
    borderRadius: heightPercentageToDP(2),
    gap: heightPercentageToDP(1),
    borderWidth: 1,
  },
  leftContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightContainer: {
    flex: 4,
    margin: heightPercentageToDP(1),
  },

  title: {
    fontFamily: FONT.semibold,
    fontSize: heightPercentageToDP(2),
  },
  subtitle: {
    color: COLORS.gray2,
    fontFamily: FONT.regular,
    fontSize: heightPercentageToDP(2),
  },
  subSubTitle: {
    color: COLORS.green,
    fontFamily: FONT.regular,
    fontSize: heightPercentageToDP(2),
    marginStart: heightPercentageToDP(2),
  },
});
