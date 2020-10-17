import http from "../Http/common-http";

class ProjectAPI {
  // all projects
  getAllProject() {
    return http.get("/project-service/projects");
  }

  // project
  assign(id, data) {
    return http.post("/project-service/project/assign/" + id, data);
  }

  // project
  unassign(id, employeeid) {
    return http.post("/project-service/" + id + "/unassign/" + employeeid);
  }

  // add project
  addProject(data) {
    return http.post("/project-service/projects", data);
  }

  // get employee ongoing project
  getOngoingProject(id) {
    return http.get(`/project-service/home/ongoing/${id}`);
  }

  // get employee upcoming project
  getUpComingProject(id) {
    return http.get(`/project-service/home/upcoming/${id}`);
  }

  // get employee ongoing project main
  getOngoingProjectMain(id) {
    return http.get(`/project-service/project/ongoing/${id}`);
  }

  // get employee upcoming project main
  getUpcomingProjectMain(id) {
    return http.get(`/project-service/project/upcoming/${id}`);
  }

  // get employee junior ongoing project
  getJuniorOngoingProject(id1, id2) {
    return http.get(`/project-service/project/ongoing/${id1}/${id2}`);
  }
}

export default new ProjectAPI();
