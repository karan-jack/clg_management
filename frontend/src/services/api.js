// frontend/src/services/api.js

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

/**
 * Helper function to perform HTTP requests with automatic auth headers,
 * JSON content-type, and standard error handling.
 */
async function request(endpoint, options = {}) {
  const token = localStorage.getItem('token');

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
  };

  if (config.body && !(config.body instanceof FormData) && typeof config.body !== 'string') {
    config.body = JSON.stringify(config.body);
  }

  // If using FormData, let the browser set the Content-Type header with the boundary
  if (config.body instanceof FormData) {
    delete config.headers['Content-Type'];
  }

  const url = endpoint.startsWith('http')
    ? endpoint
    : `${BASE_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;

  try {
    const response = await fetch(url, config);

    let data;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        window.location.href = '/login';
        throw new Error('Session expired. Please log in again.');
      }
      
      let errorMessage = 'An unexpected error occurred.';
      if (response.status === 403) errorMessage = 'You do not have permission to perform this action.';
      if (response.status === 404) errorMessage = 'The requested resource was not found.';
      if (response.status >= 500) errorMessage = 'Server error. Please try again later.';
      
      if (data && typeof data === 'object' && (data.message || data.error)) {
        errorMessage = data.message || data.error;
      }
      
      const error = new Error(errorMessage);
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data;
  } catch (error) {
    if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
      throw new Error('Network error. Please check your connection.');
    }
    throw error;
  }
}

export const api = {
  get: (endpoint, headers = {}) => request(endpoint, { method: 'GET', headers }),
  post: (endpoint, body, headers = {}) => request(endpoint, { method: 'POST', body, headers }),
  put: (endpoint, body, headers = {}) => request(endpoint, { method: 'PUT', body, headers }),
  patch: (endpoint, body, headers = {}) => request(endpoint, { method: 'PATCH', body, headers }),
  delete: (endpoint, headers = {}) => request(endpoint, { method: 'DELETE', headers }),

  // Auth
  login: (credentials) => request('/auth/login', { method: 'POST', body: credentials }),
  
  // Student
  getStudentDashboard: () => request('/student/dashboard'),
  getStudentAcademicRecords: (params = '') => request(`/student/academic-records${params}`),
  getStudentCourses: (params = '') => request(`/student/courses${params}`),
  getStudentMyLearning: () => request('/student/my-learning'),
  getStudentLearningPaths: (params = '') => request(`/student/learning-paths${params}`),
  getStudentLeaderboard: () => request('/student/leaderboard'),
  getStudentBadges: () => request('/student/badges'),
  getStudentCertificates: () => request('/student/certificates'),
  getStudentPublications: () => request('/student/publications'),
  getStudentProfile: () => request('/student/profile'),
  updateStudentProfile: (data) => request('/student/profile', { method: 'PUT', body: data }),

  // Professor
  getProfessorDashboard: () => request('/professor/dashboard'),
  getProfessorAcademicRecords: (params = '') => request(`/professor/academic-records${params}`),
  getProfessorStudents: (params = '') => request(`/professor/students${params}`),
  postProfessorMarks: (data) => request('/professor/marks', { method: 'POST', body: data }),
  getProfessorCourses: (params = '') => request(`/professor/courses${params}`),
  getProfessorCourseModules: (courseId) => request(`/professor/courses/${courseId}/modules`),
  createProfessorModule: (courseId, data) => request(`/professor/courses/${courseId}/modules`, { method: 'POST', body: data }),
  updateProfessorModule: (moduleId, data) => request(`/professor/modules/${moduleId}`, { method: 'PUT', body: data }),
  deleteProfessorModule: (moduleId) => request(`/professor/modules/${moduleId}`, { method: 'DELETE' }),
  getProfessorCourseResources: (courseId) => request(`/professor/courses/${courseId}/resources`),
  createProfessorResource: (courseId, data) => request(`/professor/courses/${courseId}/resources`, { method: 'POST', body: data }),
  deleteProfessorResource: (resourceId) => request(`/professor/resources/${resourceId}`, { method: 'DELETE' }),
  getProfessorQuizzes: (params = '') => request(`/professor/quizzes${params}`),
  createProfessorQuiz: (data) => request('/professor/quizzes', { method: 'POST', body: data }),
  getProfessorAssignments: (params = '') => request(`/professor/assignments${params}`),
  createProfessorAssignment: (data) => request('/professor/assignments', { method: 'POST', body: data }),

  // Admin
  getAdminDashboard: () => request('/admin/dashboard'),
  getAdminAnalytics: () => request('/admin/analytics'),
  adminStudents: {
    getAll: (params = '') => request(`/admin/students${params}`),
    getById: (id) => request(`/admin/students/${id}`),
    create: (data) => request(`/admin/students`, { method: 'POST', body: data }),
    update: (id, data) => request(`/admin/students/${id}`, { method: 'PUT', body: data }),
    delete: (id) => request(`/admin/students/${id}`, { method: 'DELETE' }),
    upload: (formData) => request('/admin/students/upload', { method: 'POST', body: formData })
  },
  adminProfessors: {
    getAll: (params = '') => request(`/admin/professors${params}`),
    getById: (id) => request(`/admin/professors/${id}`),
    create: (data) => request(`/admin/professors`, { method: 'POST', body: data }),
    update: (id, data) => request(`/admin/professors/${id}`, { method: 'PUT', body: data }),
    delete: (id) => request(`/admin/professors/${id}`, { method: 'DELETE' })
  },
  adminAdmins: {
    getAll: (params = '') => request(`/admin/admins${params}`),
    getById: (id) => request(`/admin/admins/${id}`),
    create: (data) => request(`/admin/admins`, { method: 'POST', body: data }),
    update: (id, data) => request(`/admin/admins/${id}`, { method: 'PUT', body: data }),
    delete: (id) => request(`/admin/admins/${id}`, { method: 'DELETE' })
  },
  adminCourses: {
    getAll: (params = '') => request(`/admin/courses${params}`),
    getById: (id) => request(`/admin/courses/${id}`),
    create: (data) => request(`/admin/courses`, { method: 'POST', body: data }),
    update: (id, data) => request(`/admin/courses/${id}`, { method: 'PUT', body: data }),
    delete: (id) => request(`/admin/courses/${id}`, { method: 'DELETE' })
  },
  adminSubjects: {
    getAll: (params = '') => request(`/admin/subjects${params}`),
    getById: (id) => request(`/admin/subjects/${id}`),
    create: (data) => request(`/admin/subjects`, { method: 'POST', body: data }),
    update: (id, data) => request(`/admin/subjects/${id}`, { method: 'PUT', body: data }),
    delete: (id) => request(`/admin/subjects/${id}`, { method: 'DELETE' })
  },
  adminBatches: {
    getAll: (params = '') => request(`/admin/batches${params}`),
    getById: (id) => request(`/admin/batches/${id}`),
    create: (data) => request(`/admin/batches`, { method: 'POST', body: data }),
    update: (id, data) => request(`/admin/batches/${id}`, { method: 'PUT', body: data }),
    delete: (id) => request(`/admin/batches/${id}`, { method: 'DELETE' })
  },
  adminLearningPaths: {
    getAll: (params = '') => request(`/admin/learning-paths${params}`),
    getById: (id) => request(`/admin/learning-paths/${id}`),
    create: (data) => request(`/admin/learning-paths`, { method: 'POST', body: data }),
    update: (id, data) => request(`/admin/learning-paths/${id}`, { method: 'PUT', body: data }),
    delete: (id) => request(`/admin/learning-paths/${id}`, { method: 'DELETE' })
  }
};

export default api;
