import http from "../Http/common-http";

class AdminAPI {
  getAll() {
    return http.get(`/admin-service/admin/employees`);
  }

  get(id) {
    return http.get(`/admin-service/employee/${id}`);
  }

  create(data) {
    return http.post(`/admin-service/admin/employee`, data);
  }

  delete(id) {
    return http.delete("/admin-service/admin/employee/" + id);
  }

  findByName(name) {
    return http.get("/admin-service/admin/employee/name/" + name);
  }
}

export default new AdminAPI();
