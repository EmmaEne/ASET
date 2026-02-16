/**
 * ASET Institution Data
 * Hierarchy: State -> Institution -> Faculty -> Department
 */

const INSTITUTION_DATA = {
    "Lagos": {
        "University of Lagos (UNILAG)": {
            "Faculty of Science": ["Computer Science", "Microbiology", "Biochemistry", "Mathematics", "Physics"],
            "Faculty of Engineering": ["Mechanical Engineering", "Electrical Engineering", "Civil Engineering", "System Engineering"],
            "Faculty of Arts": ["English", "History", "Philosophy", "Creative Arts"],
            "Faculty of Social Sciences": ["Economics", "Political Science", "Sociology", "Psychology", "Mass Communication"],
            "Faculty of Clinical Sciences": ["Medicine and Surgery", "Dentistry", "Nursing Science"],
            "Faculty of Law": ["Commercial Law", "Public Law", "Private Law"],
            "Faculty of Environmental Sciences": ["Architecture", "Estate Management", "Urban and Regional Planning"],
            "Faculty of Management Sciences": ["Accounting", "Business Administration", "Finance", "Insurance"]
        },
        "Lagos State University (LASU)": {
            "Faculty of Science": ["Computer Science", "Biology", "Chemistry", "Physics"],
            "Faculty of Engineering": ["Mechanical Engineering", "Electronic and Computer Engineering"],
            "Faculty of Arts": ["History", "Music", "Theatre Arts"],
            "Faculty of Social Sciences": ["Economics", "Geography", "Sociology"]
        },
        "Yaba College of Technology (YABATECH)": {
            "School of Science": ["Computer Science", "Biological Science", "Physical Science"],
            "School of Engineering": ["Mechanical Engineering", "Electrical Engineering", "Civil Engineering"],
            "School of Art": ["Fine Art", "Industrial Design"]
        },
        "Pan-Atlantic University": {
            "School of Media and Communication": ["Mass Communication"],
            "School of Management and Social Sciences": ["Accounting", "Business Administration", "Economics"]
        }
    },
    "Cross River (Calabar)": {
        "University of Calabar (UNICAL)": {
            "Faculty of Arts": ["English and Literary Studies", "History and International Studies", "Linguistics", "Philosophy", "Religious Studies"],
            "Faculty of Biological Sciences": ["Microbiology", "Genetics and Biotechnology", "Botany", "Zoology"],
            "Faculty of Physical Sciences": ["Computer Science", "Physics", "Chemistry", "Mathematics", "Statistics"],
            "Faculty of Social Sciences": ["Economics", "Political Science", "Sociology", "Public Administration"],
            "Faculty of Management Sciences": ["Accounting", "Banking and Finance", "Business Management", "Marketing"],
            "Faculty of Law": ["Private Law", "Public Law", "Commercial Law"],
            "Faculty of Clinical Sciences": ["Medicine and Surgery", "Nursing Science", "Public Health"],
            "Faculty of Education": ["Educational Management", "Curriculum and Teaching", "Guidance and Counselling"]
        },
        "University of Cross River State (UNICROSS)": {
            "Faculty of Engineering": ["Civil Engineering", "Electrical Engineering", "Mechanical Engineering"],
            "Faculty of Environmental Sciences": ["Architecture", "Estate Management", "Urban and Regional Planning"],
            "Faculty of Management Sciences": ["Accountancy", "Business Administration"],
            "Faculty of Science": ["Computer Science", "Biological Science", "Chemistry"]
        }
    },
    "Oyo": {
        "University of Ibadan (UI)": {
            "Faculty of Arts": ["English", "History", "Linguistics", "Classics"],
            "Faculty of Science": ["Archaeology", "Botany", "Computer Science", "Microbiology", "Chemistry"],
            "Faculty of Social Sciences": ["Economics", "Political Science", "Sociology", "Geography"],
            "Faculty of Clinical Sciences": ["Medicine", "Surgery", "Physiotherapy"]
        },
        "Ladoke Akintola University of Technology (LAUTECH)": {
            "Faculty of Engineering": ["Computer Science", "Mechanical Engineering", "Electronic Engineering"],
            "Faculty of Pure and Applied Sciences": ["Biochemistry", "Microbiology", "Pure Physics"]
        }
    },
    "Rivers": {
        "University of Port Harcourt (UNIPORT)": {
            "Faculty of Engineering": ["Chemical Engineering", "Petroleum Engineering", "Civil Engineering"],
            "Faculty of Science": ["Computer Science", "Microbiology", "Physics"],
            "Faculty of Humanities": ["English Studies", "History", "Philosophy"]
        },
        "Rivers State University (RSU)": {
            "Faculty of Law": ["Law"],
            "Faculty of Management Sciences": ["Accounting", "Marketing"],
            "Faculty of Science": ["Computer Science", "Biology"]
        }
    },
    "Enugu": {
        "University of Nigeria, Nsukka (UNN)": {
            "Faculty of Arts": ["English", "Fine Arts", "History"],
            "Faculty of Engineering": ["Civil Engineering", "Mechanical Engineering", "Electrical Engineering"],
            "Faculty of Social Sciences": ["Economics", "Political Science", "Psychology"],
            "Faculty of Law": ["Law"]
        },
        "Enugu State University of Science and Technology (ESUT)": {
            "Faculty of Engineering": ["Agricultural Engineering", "Mechanical Engineering"],
            "Faculty of Management Sciences": ["Banking and Finance", "Business Administration"]
        }
    },
    "Abuja (FCT)": {
        "University of Abuja": {
            "Faculty of Arts": ["English", "History"],
            "Faculty of Engineering": ["Civil Engineering", "Mechanical Engineering"],
            "Faculty of Science": ["Biology", "Chemistry", "Computer Science"]
        },
        "Nile University of Nigeria": {
            "Faculty of Law": ["Law"],
            "Faculty of Engineering": ["Computer Engineering", "Electrical Engineering"],
            "Faculty of Natural and Applied Sciences": ["Computer Science", "Software Engineering"]
        }
    },
    "Ogun": {
        "Covenant University": {
            "College of Science and Technology": ["Computer Science", "Building Technology"],
            "College of Engineering": ["Mechanical Engineering", "Information and Communication Engineering"],
            "College of Business and Social Sciences": ["Accounting", "Banking and Finance"]
        },
        "Babcock University": {
            "School of Computing and Engineering": ["Computer Science", "Software Engineering"],
            "School of Law": ["Law"],
            "College of Health and Medical Sciences": ["Medicine", "Nursing"]
        }
    },
    "Edo": {
        "University of Benin (UNIBEN)": {
            "Faculty of Engineering": ["Mechanical Engineering", "Electrical Engineering", "Structural Engineering"],
            "Faculty of Law": ["Law"],
            "Faculty of Life Sciences": ["Biochemistry", "Microbiology", "Optometry"]
        }
    }
};

const ROUTES = {
    HOME: './index.html',
    STUDENT_DASHBOARD: './student/student-dashboard.html',
    STUDENT_INTAKE: './student/student-intake.html',
    ADMIN_DASHBOARD: './admin/admin-dashboard.html',
    COORDINATOR_DASHBOARD: './coordinator/coordinator-dashboard.html',
    OFFICER_DASHBOARD: './officer/officer-dashboard.html',
    MENTOR_DASHBOARD: './mentor/mentor-dashboard.html'
};

if (typeof window !== 'undefined') {
    window.INSTITUTION_DATA = INSTITUTION_DATA;
    window.ROUTES = ROUTES;
}
