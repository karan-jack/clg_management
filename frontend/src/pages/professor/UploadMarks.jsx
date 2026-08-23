import React, { useState, useEffect } from "react";
import "./ProfessorDashboard.css";
import { Search, Bell, ChevronDown, ChevronUp, BookOpen, Upload, GraduationCap, Bot, Settings, Circle as HelpCircle, User, LogOut, ListFilter as Filter, Save } from "lucide-react";

function Sidebar({ onNavigate }) {
  const [learningOpen, setLearningOpen] = useState(true);
  const [aiOpen, setAiOpen] = useState(true);

  return (
    <aside className="sidebar">
      <h1>NAME</h1>



      <button onClick={() => onNavigate("academic-records")} className="side-item">
        <BookOpen size={23} />
        Academic Records
      </button>

      <button onClick={() => onNavigate("upload-marks")} className="side-item active-side">
        <Upload size={23} />
        Upload Marks
      </button>

      <button className="side-item menu-button" onClick={() => setLearningOpen(!learningOpen)}>
        <span><GraduationCap size={23} /> Learning</span>
        {learningOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      {learningOpen && (
        <div className="sub-menu">
          <button onClick={() => onNavigate("assigned-courses")}>Assigned Courses</button>

          <button onClick={() => onNavigate("resources")}>Resources</button>
          <button onClick={() => onNavigate("quizzes")}>Quizzes</button>
        </div>
      )}

      <button className="side-item menu-button" onClick={() => setAiOpen(!aiOpen)}>
        <span><Bot size={23} /> AI Tools</span>
        {aiOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      {aiOpen && (
        <div className="sub-menu">
          <button onClick={() => onNavigate("quiz-subject-select")}>Quiz Generator</button>
<button onClick={() => onNavigate("assignment-subject-select")}>
  Assignment Generator
</button>
<button onClick={() => onNavigate("summary-subject-select")}>
  Summary Generator
</button>
        </div>
      )}
    </aside>
  );
}

function Topbar() {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="topbar">
      <h2>UPLOAD MARKS</h2>

      <div className="top-actions">
        <div className="bell">
          <Bell size={24} />
          <span>3</span>
        </div>

        <div className="avatar">SB</div>

        <div className="welcome-text">
          <p>Welcome,</p>
          <h4>Shubhabrata B.</h4>
        </div>

        <button className="profile-toggle" onClick={() => setProfileOpen(!profileOpen)}>
          {profileOpen ? <ChevronUp size={22} /> : <ChevronDown size={22} />}
        </button>

        {profileOpen && (
          <div className="profile-menu">
            <div className="profile-head">
              <div className="avatar">SB</div>
              <div>
                <p>Welcome,</p>
                <h4>Shubhabrata B.</h4>
              </div>
            </div>

            <button><User size={18} /> Profile</button>
            <button><Settings size={18} /> Settings</button>
            <button><HelpCircle size={18} /> Help & Support</button>
            <hr />
            <button><LogOut size={18} /> Sign out</button>
          </div>
        )}
      </div>
    </header>
  );
}

export default function UploadMarks({ onNavigate }) {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [marks, setMarks] = useState({});
  const [selectedSubject, setSelectedSubject] = useState("");
  const [subjectWarning, setSubjectWarning] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    if (selectedSubject) {
      fetchStudents(selectedSubject);
    } else {
      setStudents([]);
      setMarks({});
    }
  }, [selectedSubject]);

  const fetchCourses = async () => {
    try {
      const res = await window.api?.getProfessorCourses?.() || await import('../../services/api').then(m => m.default.getProfessorCourses());
      setCourses(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchStudents = async (courseId) => {
    try {
      setLoading(true);
      const res = await window.api?.getProfessorStudents?.(`?courseId=${courseId}`) || await import('../../services/api').then(m => m.default.getProfessorStudents(`?courseId=${courseId}`));
      setStudents(res.data || []);
      const initialMarks = {};
      (res.data || []).forEach(s => {
        initialMarks[s.student_id] = { lab: '', theory: '' };
      });
      setMarks(initialMarks);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  function updateMark(studentId, type, value) {
    if (!selectedSubject) {
      setSubjectWarning("Select your Subject");
      return;
    }
    setMarks(prev => ({
      ...prev,
      [studentId]: { ...prev[studentId], [type]: value }
    }));
  }

  function handleMarksClick() {
    if (!selectedSubject) {
      setSubjectWarning("Select your Subject");
    }
  }

  function resetMarks() {
    const emptyMarks = {};
    students.forEach(s => { emptyMarks[s.student_id] = { lab: '', theory: '' }; });
    setMarks(emptyMarks);
  }

  async function handleSave() {
    if (!selectedSubject) return setSubjectWarning("Select your Subject");
    setSaving(true);
    try {
      for (const student of students) {
        const studentMarks = marks[student.student_id];
        if (studentMarks.lab !== '' || studentMarks.theory !== '') {
          const lab = studentMarks.lab ? parseInt(studentMarks.lab) : 0;
          const theory = studentMarks.theory ? parseInt(studentMarks.theory) : 0;

          if (lab < 0 || lab > 50) {
            setSubjectWarning(`Invalid lab marks for ${student.name}. Must be 0-50.`);
            setSaving(false);
            return;
          }
          if (theory < 0 || theory > 100) {
            setSubjectWarning(`Invalid theory marks for ${student.name}. Must be 0-100.`);
            setSaving(false);
            return;
          }

          await (window.api?.postProfessorMarks || import('../../services/api').then(m => m.default.postProfessorMarks))({
            student_id: student.student_id,
            course_id: selectedSubject,
            semester: student.semester,
            lab_marks: lab,
            theory_marks: theory
          });
        }
      }
      alert('Marks saved successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to save some marks.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="dashboard-page">
      <Sidebar onNavigate={onNavigate} />

      <main className="main">
        <Topbar />

        <section className="content">
          <div className="filter-box upload-filter-box">
            <div className="filter-field">
              <label>Select Batch</label>
              <select>
                <option>All Batches</option>
                <option>2024-2028</option>
              </select>
            </div>

            <div className="filter-field">
              <label>Select Department</label>
              <select>
                <option>All Departments</option>
                <option>Electronics</option>
              </select>
            </div>

            <div className="filter-field">
              <label>Select Semester</label>
              <select>
                <option>All Semesters</option>
                <option>Semester 3</option>
              </select>
            </div>

            <div className="filter-field">
              <label>Select Subject</label>
              <select
                value={selectedSubject}
                onChange={(event) => {
                  setSelectedSubject(event.target.value);
                  setSubjectWarning("");
                }}
              >
                <option value="">Select Subject</option>
                {courses.map(course => (
                  <option key={course.id} value={course.id}>{course.title} ({course.code})</option>
                ))}
              </select>
            </div>

            <button className="export-btn">
              <Filter size={17} />
              Clear Filters
            </button>
          </div>
          {subjectWarning && (
  <div className="subject-warning">
    {subjectWarning}
  </div>
)}
          <h3 className="section-heading">Student Marks Entry</h3>

          <div className="records-table-wrap marks-table-wrap">
            <table className="records-table marks-table">
              <thead>
              <tr>
  <th>Enrollment No.</th>
  <th>Name</th>
  <th>Batch</th>
  <th>Department</th>
  <th>Semester</th>
  <th>Marks (Lab) / Max. (50)</th>
  <th>Marks (Theory) / Max. (100)</th>
</tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr><td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>Loading students...</td></tr>
                ) : students.length === 0 ? (
                  <tr><td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>No students found for this subject.</td></tr>
                ) : students.map((student) => (
                  <tr key={student.student_id}>
                    <td>{student.college_id}</td>
                    <td>{student.name}</td>
                    <td>2024-2028</td>
                    <td>{student.department}</td>
                    <td>{student.semester}</td>
                    <td>
                      <input
                        type="number"
                        value={selectedSubject && marks[student.student_id] ? marks[student.student_id].lab : ""}
                        placeholder={selectedSubject ? "" : "Select your Subject"}
                        min="0"
                        max="50"
                        onClick={handleMarksClick}
                        onChange={(event) => updateMark(student.student_id, 'lab', event.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={selectedSubject && marks[student.student_id] ? marks[student.student_id].theory : ""}
                        placeholder={selectedSubject ? "" : "Select your Subject"}
                        min="0"
                        max="100"
                        onClick={handleMarksClick}
                        onChange={(event) => updateMark(student.student_id, 'theory', event.target.value)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="marks-footer">
              <p>Note: Please ensure all marks are entered correctly before saving.</p>

              <div>
                <button className="reset-btn" onClick={resetMarks}>
                  Reset
                </button>

                <button className="save-btn" onClick={handleSave} disabled={saving}>
                  <Save size={18} />
                  {saving ? 'Saving...' : 'Save Marks'}
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
