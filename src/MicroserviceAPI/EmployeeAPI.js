import http from "../Http/common-http";
import axios from "axios";

class EmployeeAPI {



  getAll() {
    const customHeaders = {
      'Authorization':  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiRU1QTE9ZRUUiLCJzdWIiOiJhbmFueWFAZWEuY29tIiwiTGV2ZWwiOjQsIklkIjoxMDAwMiwiZXhwIjoxNjAyODMyNjMyLCJpYXQiOjE2MDI4MjkwMzIsIk5hbWUiOiJBbmFueWEifQ.bo6zPqWfEkfR0p_i9VUisgXiE24qxF8uZ59qVfclGVk',
      'content-type': 'application/json',
    };
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

  delete(id) {
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
    return http.get("/employee-service/employee/"+id+"/working");
  }
  // get employee past project
  getPastProjects(id) {
    return http.get("employee-service/employee/" + id + "/pastprojects");
  }

  // get unallocated hours
  getUnallocatedHours(id,days) {
    return http.get("employee-service/employee/" + id + "/junioravailablehours")
  }

  // update employee skills
  updateEmployeeSkills(id, data) {
    return http.put(`/employee/${id}/skills`, data);
  }

  // getStartedProjects(id) {
  //   return http.get('/employee-service/employee/'+id+'/working');
  // }
  // // get employee past project
  // getPastProjects(id) {
  //   return http.get('/employee-service/employee/'+id+'/pastprojects');
  // }

  getUpComingProject(id) {
    return http.get('/employee-service/employee/'+id+'/upcoming');
  }
}

export default new EmployeeAPI();
