import { FlatList, StatusBar } from 'react-native';
import {
  StyleSheet,
  View,
  SafeAreaView,
} from 'react-native';
import { COLORS, FONT } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import HeaderTop from '../component/profile/HeaderTop';
import NotificationContent from '../component/notification/NotificationContent';
import NoResultFound from '../component/NoResultFound';
import { useSelector } from 'react-redux';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import URLHelper from '../api/URLhelper/URLHelper';
import { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import moment from 'moment';
import Loading from '../component/Loading';



const NotificationTab = () => {
  const navigation = useNavigation();
  const THEME = useSelector(state => state.theme);
  const ACCESS_TOKEN = useSelector(state => state.userAccessToken);
  const [notificationList, setNotificationList] = useState([])
  const [showProgressBar, setProgressBar] = useState(true);

  console.log(ACCESS_TOKEN.data)


  useEffect(() => {
    getNotificationList();
  }, [])

  const convertTime = timeString => {
    const time = moment(timeString, 'YYYY-MM-DDTHH:mm:ss.SSSSSSZ');
    const formattedTime = time.format('MMM DD, YYYY hh:mm a');
    return formattedTime;
  };


  const getNotificationList = async () => {
    const apiUrl = URLHelper.NOTIFICATION_API;
    console.log(' :: Working on the Getting List :: ');

    // const mine = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiMTNjMzQyZWVkYjUxMDRlZmNmNDRjOWE1OTYyODQ5ZDM4MDc0OTQ5MDEzMmM5NTQzYWI4NWM1YmEzY2M0OTMwMjcxNzg1ZDJkOTgyZDk0YTIiLCJpYXQiOjE2OTc5OTc5NDQuMTk4ODk1LCJuYmYiOjE2OTc5OTc5NDQuMTk4ODk4LCJleHAiOjE3Mjk2MjAzNDQuMTk4MjA0LCJzdWIiOiI0Iiwic2NvcGVzIjpbXX0.M9y8sRYqKoDIXSJoWHfNra8FaSBaiKHmymZTTFpWLIQVjUsyQrIXMItLpt9Zb9SpdqHUpjzru50ZsAI16LKJAlgAQbI_5J2LG3pEZL6-GdaCgGm1PsbjpynTXaYGMPxM4bVtGfpfb_e699sM2xmEZ3RnVM930FwiSC2P1zbF0aulEg0DtSWRIEOOdMNeFL1SW-z0U85JJbPK0ROJaDFqeLHtdCnFAd3_XP5CGq3H89BIKiAsgpYWcaRGj2tb6DY5e43gIDomUJIDhw_4Hj4wgG6Oi7VurzaubXodmbqHMWyAZKQ188GYRvsswQSFwD4qPxE8FaNhlBpjcOimASSQUBcHHrFGhZQpGO5f1jeNLNTA_v_-TzfqMi7pKF2mFk4vVKrcEwQcbm06Mniw06o--i3wlWgBmuK7MK7juS4zp-fIWU1bA4FnzMZC5RySRZd_u3xwwvVRUswjpgrVkwTAGmw8KTBUdinRdzs6QeY4kh3t6wf5E6omOAdF4U50FLKP0Cm5BHVSdWvNoGbZGQRe6uybERwWdfqbkEcchq0hZoeTLS8mDMauQBkdkeBt1HvCYTPtfOnmAE9WzXMmv4achdknqB6e3gT2bpKIJeqkKGQNH2GdYFwfGcwwRXZkOLBhCVLVY0TYdDv6x5QatwsbxODw15KO1EY2niHNhwkkQ_w';

    const headers = {
      userapisecret: 'h0vWu6MkInNlWHJVfIXmHbIbC66cQvlbSUQI09Whbp',
      Authorization: `Bearer ${ACCESS_TOKEN.data}`,
    };

    try {
      const response = await axios.get(apiUrl, { headers });
      console.log('REQUEST STARTED');
      console.log('Response:', response.data.data);
      setNotificationList(response.data.data);
      setProgressBar(false)
      console.log('REQUEST STOPPED');
    } catch (error) {
      setProgressBar(false)
      console.log('Err', error);
      Toast.show({
        type: 'error',
        text1: "Something went wrong",
        text2: "Please try again later"
      })
      if (error.response) {
        console.log('Error:', error.response);
      } else {
        console.log('Error:', error.message);
      }
    }
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor:
          THEME.data === 'LIGHT' ? COLORS.white : COLORS.purpleDark,
        ...styles.container,
      }}>
      <StatusBar style="light" hidden={false} />
      <HeaderTop value={'Notification'} />
      <View
        style={{
          backgroundColor:
            THEME.data === 'LIGHT' ? COLORS.white : COLORS.purpleDark,
          ...styles.container,
        }}>



        {showProgressBar ? (<View style={{ height: heightPercentageToDP(100), width: widthPercentageToDP(100), justifyContent: 'center', alignItems: 'center' }}><Loading /></View>) : (notificationList.length === 0 ? (<NoResultFound val={'No Data Found'} />) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={notificationList}
            keyExtractor={(item, index) => index}
            renderItem={({ item }) => {
              return <NotificationContent
                title={item.title}
                name={item.notification_body}
                time={convertTime(item.created_at)}
                amount={'$50.00'}
              />;
            }}
            ListFooterComponent={
              <View
                style={{
                  marginTop: heightPercentageToDP(5),
                }}></View>
            }
          />
        ))
        }







      </View>
    </SafeAreaView>
  );
};

export default NotificationTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    alignItems: 'stretch',
  },
  image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  contentContainer: {
    position: 'absolute',
  },
  centerImage: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
  },
  title: {
    color: 'white',
    fontFamily: FONT.bold,
    fontSize: 28,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginStart: 10,
    marginTop: 20,
  },
  subtitle: {
    color: 'white',
    fontFamily: FONT.regular,
    fontSize: 14,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginStart: 10,
    marginTop: 20,
  },
  userNameInput: {
    width: '95%',
    lineHeight: 20,
    color: 'white',
    fontFamily: FONT.regular,
    padding: 10,
    fontSize: 14,
    backgroundColor: COLORS.purpleDark,
    borderWidth: 2,
    borderColor: COLORS.skyBlue,
    borderRadius: 5,
    margin: 5,
    marginEnd: 10,
    opacity: 0.5,
  },
  bottonContainer: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 20,
    marginTop: 10,
    bottom: 20,
  },
  next: {
    color: 'white',
    width: '100%',
    fontFamily: FONT.semibold,
    backgroundColor: COLORS.green,
    borderBottomColor: COLORS.green,
    fontSize: 14,
    padding: 12,
    borderRadius: 5,
    textAlign: 'center',
  },
  accountAndForgotContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
    marginEnd: 10,
  },
  account: {
    color: 'white',
    fontFamily: FONT.semibold,
    fontSize: 14,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginStart: 10,
    marginTop: 20,
  },
  forgot: {
    color: 'white',
    fontFamily: FONT.semibold,
    fontSize: 14,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'baseline',
    marginStart: 10,
    marginTop: 20,
  },
  profileImage: {
    position: 'absolute',
    width: 150,
    height: 150,
    resizeMode: 'cover',
    tintColor: 'lightgreen',
    alignSelf: 'center',
    top: 80,
    zIndex: 2,
  },
});



// <NotificationContent
//             title={'You recevied a payment of $230.00'}
//             name={'from Zoya'}
//             time={'10 min ago'}
//             amount={'$230.00'}
//           />
//           <NotificationContent
//             title={'You recevied a payment of $30.00'}
//             name={'from Deepak'}
//             time={'50 min ago'}
//             amount={'$30.00'}
//           />
//           <NotificationContent
//             title={'You recevied a payment of $130.00'}
//             name={'from Imran'}
//             time={'2 hour  ago'}
//             amount={'$130.00'}
//           />
// <NotificationContent
//   title={'You recevied a payment of $50.00'}
//   name={'from Shubham'}
//   time={'5 hour ago'}
//   amount={'$50.00'}
// />