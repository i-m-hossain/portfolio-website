// configs/skillConfig.js
export const skillConfig = {
    fields: [
      { name: 'name', label: 'Skill Name', type: 'text', validation: Yup.string().required() },
      { name: 'level', label: 'Proficiency Level', type: 'select', options: ['Beginner', 'Intermediate', 'Expert'], validation: Yup.string().required() },
    ],
    apiEndpoints: {
      create: '/api/skills',
      read: '/api/skills',
      update: '/api/skills/:id',
      delete: '/api/skills/:id',
    },
  };
  