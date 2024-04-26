import { RESTDataSource } from "@apollo/datasource-rest";

class TrackAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://odyssey-lift-off-rest-api.herokuapp.com/";
  }

  async getTracks() {
    return this.get("tracks");
  }

  async getAuthor(authorId: number) {
    return this.get(`author/${authorId}`);
  }
}

export default TrackAPI;
