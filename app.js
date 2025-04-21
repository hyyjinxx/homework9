let hasDownloadedResume = false;
let downloadCount = 0;

document.querySelector('.resume').addEventListener('click', function () {
    if (!hasDownloadedResume) {
        alert("Your resume is downloaded successfully!");
        hasDownloadedResume = true;
    }

    downloadCount++;
    document.getElementById('downloadCount').textContent = `Resume downloaded: ${downloadCount} times`;
});

document.addEventListener("DOMContentLoaded", function () {
    const spinner = document.getElementById('spinner');
    spinner.style.display = 'none';
});

function showGreeting(name) {
    return "Hello, my name is " + name + "! Welcome to my portfolio!";
}

$(document).ready(function () {
    renderNavigationMenu();
    renderProjects();
    updateSkillsList(); // <-- this is key
});

const greetingElement = document.getElementById("greeting");
const userName = "Allyson Wiedoff";
greetingElement.textContent = showGreeting(userName);

function daysUntilDeadline(deadline) {
    const currentDate = new Date();
    const deadlineDate = new Date(deadline);
    const timeDiff = deadlineDate - currentDate;
    const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysLeft;
}

const projectDeadline = "2025-06-30";
console.log("Days until project deadline: " + daysUntilDeadline(projectDeadline));

window.onload = function () {
    const spinner = document.getElementById('spinner');
    spinner.style.display = 'none';
};

let skills = ["Barista Experience", "POS System Skills", "Public Speaking"];
let filteredSkills = [...skills]; // for search filtering

function updateSkillsList() {
    const skillsList = $("#skills-list");
    skillsList.empty();

    filteredSkills.forEach(skill => {
        const listItem = $("<li></li>").hide();

        const skillSpan = $("<span></span>").text(skill).css("cursor", "pointer");

        skillSpan.click(function () {
            const input = $("<input type='text'>").val(skill);
            skillSpan.replaceWith(input);
            input.focus();

            input.keydown(function (e) {
                if (e.key === "Enter") {
                    const newSkill = input.val().trim();
                    if (newSkill && !skills.includes(newSkill)) {
                        skills[skills.indexOf(skill)] = newSkill;
                        filterSkills($("#skillSearch").val()); // reapply filter
                    } else {
                        alert("Skill already exists or is invalid.");
                    }
                } else if (e.key === "Escape") {
                    input.replaceWith(skillSpan);
                }
            });
        });

        const deleteButton = $("<button>Delete</button>").click(function () {
            skills = skills.filter(s => s !== skill);
            filterSkills($("#skillSearch").val());
        });

        listItem.append(skillSpan).append(" ").append(deleteButton);
        skillsList.append(listItem);
        listItem.slideDown();
    });
}

function addSkill(skill) {
    if (!skills.includes(skill) && skill.trim() !== "") {
        skills.push(skill);
        filterSkills($("#skillSearch").val());
    } else {
        alert("Skill already exists or is empty!");
    }
}

function filterSkills(searchTerm) {
    searchTerm = searchTerm.toLowerCase();
    filteredSkills = skills.filter(skill => skill.toLowerCase().includes(searchTerm));
    updateSkillsList();
}

$("#add-skill").click(function () {
    const skillInput = $("#skill-input").val();
    addSkill(skillInput);
    $("#skill-input").val('');
});

$("#skill-input").keydown(function (e) {
    if (e.key === "Enter") {
        const skillInput = $(this).val();
        addSkill(skillInput);
        $(this).val('');
    } else if (e.key === "Escape") {
        $(this).val('');
    }
});

$("#skillSearch").on("input", function () {
    const searchValue = $(this).val();
    filterSkills(searchValue);
});

const navItems = ["Summary", "Education", "Skills", "Projects", "Experience", "Contact"];

function renderNavigationMenu() {
    const navList = $("#nav-list");
    navList.empty();
    navItems.forEach(item => {
        const listItem = $("<li></li>").append($("<a></a>").attr("href", "#" + item.toLowerCase()).text(item));
        navList.append(listItem);
    });
}

$(document).ready(function () {
    renderNavigationMenu();

    $("a").click(function (e) {
        e.preventDefault();
        const targetId = $(this).attr("href");
        $("html, body").animate({
            scrollTop: $(targetId).offset().top
        }, 1000);
    });

    updateSkillsList();
});

const projects = [
    {
        title: 'My First Website',
        description: 'Creating a simple webpage!',
        deadline: new Date("2024-05-01"),
       
    },
    {
        title: 'Learning Web Design',
        description: 'Learning design through practice.',
        deadline: new Date("2025-05-09"),
        
    },
    {
        title: 'JavaScript Game Project',
        description: 'Building a game using JavaScript.',
        deadline: new Date("2025-05-09"),
        
    }
];

function renderProjects() {
    const projectsContainer = $("#projects-container");
    projectsContainer.empty();

    projects.forEach(project => {
        const projectCard = $("<div></div>").addClass("project");
        projectCard.append(`<img src="${project.imageURL}" alt="${project.title}" style="width:100%; height:auto;">`);
        projectCard.append(`<h4>${project.title}</h4>`);
        projectCard.append(`<p>${project.description}</p>`);
        projectCard.append(`<p>Deadline: ${project.deadline.toDateString()}</p>`);
        projectsContainer.append(projectCard);
    });
}

$("#sort-projects").click(function () {
    projects.sort((a, b) => a.deadline - b.deadline);
    renderProjects();
});

$(document).ready(function () {
    renderProjects();
});