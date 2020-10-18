import http from "../Http/common-http";

class ProjectAPI {
  // all projects
  getAllProject() {
    return http.get("/project-service/projects");
  }

  // project
  assign(id1, id2, data) {
    return http.post(`/project-service/project/assign/${id1}/${id2}`, data);
  }

  // project
  unassign(id1, projectId, employeeid, data) {
    return http.post(
      `/project-service/project/unassign/${id1}/${projectId}/${employeeid}`,
      data
    );
  }

  // add project
  addProject(data) {
    return http.post("/project-service/project", data);
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

  // get employee junior upcoming project
  getJuniorUpcomingProject(id1, id2) {
    return http.get(`/project-service/project/upcoming/${id1}/${id2}`);
  }

  // close project
  closeProject(selfId, projectId) {
    return http.get(`/project/close/${selfId}/${projectId}`);
  }
}

export default new ProjectAPI();
