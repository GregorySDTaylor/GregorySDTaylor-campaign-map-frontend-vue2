import axios from "axios";
export default axios.create({
  baseURL: `https://campaign-map.herokuapp.com/rest-api`,
});
