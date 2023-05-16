import axios from 'axios';

export default axios.create({
  baseURL:`https://us-central1-webservices-314bf.cloudfunctions.net/bookstore/api/v1`
});
