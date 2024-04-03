import axios from "axios";
import URLHelper from "../../src/api/URLhelper/URLHelper";
import { useSelector } from "react-redux";

const getMyInvestmentList = async () => {
    setProgressBar(true);
    const apiUrl = URLHelper.MY_INVESTMENT_LIST;

    const headers = {
      userapisecret: 'h0vWu6MkInNlWHJVfIXmHbIbC66cQvlbSUQI09Whbp',
      Authorization: `Bearer ${ACCESS_TOKEN.data}`,
    };

    try {
      const response = await axios.get(apiUrl, {headers});
      console.log('REQUEST STARTED');

      setMyInvestmentList(response.data.data);
      setProgressBar(false);

      let val = response.data;
      console.log('#####################');
      console.log(val.data.length);

      val.data.map(item => {
        console.log(item);
      });

      console.log('REQUEST STOPPED');
    } catch (error) {
      setProgressBar(false);
      if (error.response) {
        console.error('Error:', error.response);
      } else {
        console.error('Error:', error.message);
      }
    }
  };

export const myinvestment = (email, password) => async (dispatch) => {
    try {
      dispatch({
        type: "myinvestmentRequest",
      });
  
      const ACCESS_TOKEN = useSelector(state => state.userAccessToken);
      const headers = {
        userapisecret: 'h0vWu6MkInNlWHJVfIXmHbIbC66cQvlbSUQI09Whbp',
        Authorization: `Bearer ${ACCESS_TOKEN.data}`,
      };

      //    Axios here
      const { data } = await axios.post(
        URLHelper.MY_INVESTMENT_LIST,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );


      const { dataa } = await axios.get(
        `${server}/user/login`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      
  
      dispatch({
        type: "loginSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "loginFail",
        payload: error.response.data.message,
      });
    }
  };