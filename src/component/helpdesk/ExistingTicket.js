import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONT} from '../../../constants';
import {heightPercentageToDP, widthPercentageToDP} from 'react-native-responsive-screen';
import ExistingItem from './ExistingItem';
import {useSelector} from 'react-redux';
import URLHelper from '../../api/URLhelper/URLHelper';
import NoResultFound from '../NoResultFound';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import Loading from '../Loading';

const ExistingTicket = () => {
  const navigation = useNavigation();
  const THEME = useSelector(state => state.theme);
  const ACCESS_TOKEN = useSelector(state => state.userAccessToken);
  const [dataVal, setData] = useState([]);
  const [showProgressBar, setProgressBar] = useState(false);

  useEffect(() => {
    getAllTicketData();
  }, []);

  // For My Investment list
  const getAllTicketData = async () => {
    setProgressBar(true);
    const apiUrl = URLHelper.GET_ALL_TICKET;

    const headers = {
      userapisecret: 'h0vWu6MkInNlWHJVfIXmHbIbC66cQvlbSUQI09Whbp',
      Authorization: `Bearer ${ACCESS_TOKEN.data}`,
    };
    try {
      const response = await axios.get(apiUrl, {headers});
      console.log('REQUEST STARTED');

      console.log(response.data.data)

      setData(response.data.data);
      setProgressBar(false);
      console.log('REQUEST STOPPED');
    } catch (error) {
      setProgressBar(false);
      if (error.response) {
        console.log('Error:', error.response);
      } else {
        console.log('Error:', error.message);
      }
    }
  };

  return (
    <View
      style={{
        backgroundColor:
          THEME.data === 'LIGHT' ? COLORS.white : COLORS.purpleDark,
        borderColor: THEME.data === 'LIGHT' ? COLORS.white : COLORS.purpleDark,
        ...styles.mainCointer,
      }}>

      

      {showProgressBar ? (<View style={{ height: heightPercentageToDP(100), width: widthPercentageToDP(100), justifyContent: 'center', alignItems: 'center' }}><Loading /></View>) : (dataVal.length === 0 ? (<NoResultFound val={'No Data Found'} />) : (
        <FlatList
            data={dataVal}
            keyExtractor={(item, index) => index}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  key={index.toString()}
                  onPress={() => {
                    console.log('Pressed');
  
                    navigation.navigate('TicketDetails', {
                      itemId: item,
                    });
                  }}>
                  <ExistingItem value={item} />
                </TouchableOpacity>
              );
            }}
          />
      ))
      }
      
    </View>
  );
};

export default ExistingTicket;

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
    color: COLORS.white,
    fontFamily: FONT.semibold,
    fontSize: heightPercentageToDP(2.5),
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
