import http from "../Http/common-http";

class AdminAPI {
  getAll() {
    return http.get("/resource-service/resources");
  }

  get(id) {
    return http.get("/resource-service/resource/" + id);
  }

  create(data) {
    return http.post("/resource-service/resources", data);
  }

  delete(id) {
    return http.delete("/resource-service/resource/" + id);
  }

  findByName() {
    return http.get("/resource-service/resource/");
  }
}

export default new AdminAPI();
