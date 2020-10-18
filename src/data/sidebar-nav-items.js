export default function() {
  return [
    {
      title: "Home",
      to: "/home",
      htmlBefore: '<i class="material-icons">home</i>',
      htmlAfter: "",
    },
    {
      title: "Employee",
      htmlBefore: '<i class="material-icons">view_module</i>',
      to: "/employee",
    },
    {
      title: "Project",
      htmlBefore: '<i class="material-icons">note_add</i>',
      to: "/project",
    },

    {
      title: "Resource",
      htmlBefore: '<i class="material-icons">table_chart</i>',
      to: "/resource",
    },
    {
      title: "Profile",
      htmlBefore: '<i class="material-icons">person</i>',
      to: "/profile",
    },
  ];
}
