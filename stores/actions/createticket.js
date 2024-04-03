import axios from 'axios';
import URLHelper from '../../src/api/URLhelper/URLHelper';

export const createTicket = (subject, msg, ACCESS_TOKEN) => async dispatch => {
  try {
    dispatch({
      type: 'createTicketRequest',
    });
    //    Axios here
    const apiUrl = URLHelper.CREATE_TICKET;

    const headers = {
      userapisecret: 'h0vWu6MkInNlWHJVfIXmHbIbC66cQvlbSUQI09Whbp',
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    };

    const {data} = await axios.post(
      apiUrl,
      {
        subject,
        msg,
      },
      {
        headers,
      },
    );

    dispatch({
      type: 'createTicketSuccess',
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: 'createTicketFail',
      payload: error.response.data.message,
    });
  }
};

export const getAllTicket = (ACCESS_TOKEN) => async dispatch => {
  try {
    dispatch({
      type: 'getTicketRequest',
    });
    //    Axios here
    const apiUrl = URLHelper.GET_ALL_TICKET;

    const headers = {
      userapisecret: 'h0vWu6MkInNlWHJVfIXmHbIbC66cQvlbSUQI09Whbp',
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    };

    const {data} = await axios.get(
      apiUrl,

      {
        headers,
      },
    );

    dispatch({
      type: 'getTicketSuccess',
      payload: data.allTicketData,
    });
  } catch (error) {
    dispatch({
      type: 'getTicketFail',
      payload: error.response.data.message,
    });
  }
};
