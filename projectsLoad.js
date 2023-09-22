loadData()
  .then(data => {
    createProjectElement(data.projects);
  });

async function loadData () {
  try {
    const response = await fetch('projects.json');
    const data = await response.json();
    return data;
  } catch (error) {
    return console.error(error);
  }
}

function createProjectElement (projects) {
  const projectWrap = document.querySelector('.projectWrap');

  projectWrap.innerHTML = projects.map(project => createProjectHTML(project)).join('\n');

  projectsWidth();
  projectCarousel();
  createUseSkills(projects);
}

function createProjectHTML (project) {
  return `
  <li class="project">
    <div class="projectImg"><img src="${project.img}" alt="${project.alt}"></div>
    <div class="projectTxt">
      <p class="date">${project.date}</p>
      <h5 class="title">${project.title}</h5>
      <ul class="useSkills clear"></ul>
      <p class="contribution">${project.contribution}</p>
      <p class="description">${project.description}</p>
      <div class="viewBtns">
        <button><a href="${project.url}" target="_blank">VIEW SITE</a></button>
        <button><a href="${project.github}" target="_blank">VIEW CODE</a></button>
      </div>
    </div>
  </li>`
}

function projectsWidth () {
  const projectWrap = document.querySelector('.projectWrap');
  const projects = document.querySelectorAll('.projectWrap > li');

  projectWrap.style.width = `${projects.length * 100}%`;
  projects.forEach(project => {
    project.style.width = `${100 / projects.length}%`;
  })
}

function projectCarousel () {
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  const projectWrap = document.querySelector('.projectWrap');
  const projects = document.querySelectorAll('.projectWrap > *');
  let i = 0;

  nextBtn.addEventListener('click', () =>{
    if (i < projects.length) {
      prevBtn.style.display = 'block';
      projects[i].style.opacity = '0';
      i++;
      projectWrap.style.left = `${i * -100}%`
      projects[i].style.opacity = '1';
      if (i == projects.length - 1){
        nextBtn.style.display = 'none';
      }
    }
  });

  prevBtn.addEventListener('click', () =>{
    if (i > 0) {
      nextBtn.style.display = 'block';
      projects[i].style.opacity = '0';
      i--;
      projectWrap.style.left = `${i * -100}%`
      projects[i].style.opacity = '1';
      if (i == 0){
        prevBtn.style.display = 'none';
      }
    }
  });
}


function createUseSkills (projects) {

  const useSkillsArray = projects.map(project => project.useSkills.split(','));
  const useSkillsWrap = document.querySelectorAll('.useSkills');
  let i = 0;
  useSkillsWrap.forEach(wrap => {
    useSkillsArray[i].forEach(skill => {
      let createSkill = document.createElement('li');
      createSkill.innerHTML = skill;
      wrap.appendChild(createSkill);
    })
    i++;
  })

}
