import http from "../Http/common-http";

class EmployeeAPI {
  getAll() {
    return http.get("/employee-service/employees");
  }

  get(id) {
    return http.get("/employee-service/employee/" + id);
  }

  create(data) {
    return http.post("/employee-service/employee", data);
  }

  update(id, data) {
    return http.put("/employee-service/employee/" + id, data);
  }

  deleteEmployee(id) {
    return http.delete("/admin-service/admin/employee/" + id);
  }

  findByName(name) {
    return http.get("/admin-service/admin/employee/name/" + name);
  }

  getJuniorsOfEmployee(id) {
    return http.get("/employee-service/employee/" + id + "/juniors");
  }

  getSeniorsOfEmployee(id) {
    return http.get("/employee-service/employee/" + id + "/seniors");
  }

  getEducation(id) {
    return http.get("/employee-service/employee/" + id + "/profile/education");
  }

  getWorkEx(id) {
    return http.get("/employee-service/employee/" + id + "/profile/workex");
  }

  getEmployeeIdAndNameByEmail(email) {
    return http.get("/employee-service/employee/email/" + email);
  }

  // resource
  assign(data) {
    return http.post("/employee-service/employee/assign-resource", data);
  }

  // resource
  unassign(data) {
    return http.post("/employee-service/employee/unassign-resource", data);
  }

  // resource
  getDescendentResources(id) {
    return http.get(
      "/employee-service/employee/" + id + "/descendentresources"
    );
  }

  // project
  closeProject(id) {
    return http.get("/employee-service/close/" + id);
  }

  // Resource Owned By An Employee
  getResourcesOwned(id) {
    return http.get("/employee-service/employee/" + id + "/resource");
  }
  // Update assigned resource
  updateAssignResourceToEmployee(data) {
    return http.put("/employee-service/employee/update-resource", data);
  }
  getStartedProjects(id) {
    return http.get("/employee-service/employee/" + id + "/working");
  }
  // get employee past project
  getPastProjects(id) {
    return http.get("/employee-service/employee/" + id + "/pastprojects");
  }

  // get unallocated hours
  getUnallocatedHours(id, days) {
    return http.get(
      "/employee-service/employee/" + id + "/junioravailablehours"
    );
  }

  // update employee skills
  updateEmployeeSkills(id1, id2, data) {
    return http.put(`/employee-service/employee/${id1}/info-of/${id2}`, data);
  }

  // get acces to update skills
  getAccess(id1, id2) {
    return http.get(`/employee-service/employee/checkvalid/${id1}/${id2}`);
  }

  //update education details
  updateEducationDetails(id, data) {
    return http.post(
      `/employee-service/employee/${id}/profile/education`,
      data
    );
  }

  // update work ex
  updateWorkEx(id, data) {
    return http.post(`/employee-service/employee/${id}/profile/workex`, data);
  }

  // get all notifications
  getAllNotifications(id) {
    return http.get(`/employee-service/employee/${id}/notifications`);
  }

  updateNotificationStatus(id) {
    return http.put(`/employee-service/employee/${id}/notifications/status`);
  }

  noOfUnread(id) {
    return http.get(
      `/employee-service/employee/${id}/notifications/unread/count`
    );
  }

  updateNotification(id) {
    return http.put(`/employee-service//employee/${id}/notifications`);
  }

  getSelfResources(id) {
    return http.get("/employee-service/employee/" + id + "/resource");
  }

  getEmployeeImageCheck(id) {
    return http.get("/employee-service/image/" + id + "/check");
  }
}

export default new EmployeeAPI();
