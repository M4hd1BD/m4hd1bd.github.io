const displayStuffs = () => {
  document.getElementById("primSection").classList.add("hideStuff");
  document.getElementById("mainNav").classList.remove("hideStuff");
  document.getElementById("mobileMainNav").classList.remove("hideStuff");
  document.getElementById("mainContent").classList.remove("hideStuff");
};

const insertData = (res) => {
  //inserting profile picture
  document.getElementById("mainProPic").src = res.data.user.avatarUrl;

  //inserting full name
  document.getElementById("mainProName").textContent = res.data.user.name;

  //inserting username
  document.getElementById("mainProUsername").textContent = res.data.user.login;

  //inserting bio
  document.getElementById("mainProBio").textContent = res.data.user.bio;

  //inserting total repositories
  document.getElementById("repoCount").innerHTML =
    res.data.user.repositories.totalCount;

  //getting repo list
  const repoList = res.data.user.repositories.edges;

  //getting titles
  const repoTitles = repoList.map((i) => i.node.name);

  //setting language and color value to the items which doesn't have those
  repoList.forEach((element) => {
    if (element.node.languages.edges.length == 0) {
      element.node.languages.edges.push({
        node: {
          color: "#eb4034",
          name: "Undefined",
        },
      });
    }
  });

  //getting repo language names
  const repoLanguages = repoList.map(
    (i) => i.node.languages.edges[0].node.name
  );

  //gettting repo color codes
  const repoColors = repoList.map((i) => i.node.languages.edges[0].node.color);

  //gettting repo stars
  const repoStars = repoList.map((i) => i.node.stargazerCount);

  //gettting repo forks
  const repoForks = repoList.map((i) => i.node.forkCount);

  //gettting repo last update
  const repoLastUpdate = repoList.map((i) => i.node.pushedAt);

  const repoCards = [];
  for (let index = 0; index < repoList.length; index++) {
    const repoCard = document.createElement("div");
    repoCard.setAttribute("class", "repoCard");

    const heading = document.createElement("h3");
    const headingLink = document.createElement("a");
    headingLink.setAttribute("href", "./forbidden.html");
    headingLink.setAttribute("class", "repoTitle");
    headingLink.textContent = repoTitles[index];
    heading.appendChild(headingLink);

    const metaDiv = document.createElement("div");
    metaDiv.setAttribute("class", "repoMeta");

    const languageDiv = document.createElement("div");
    languageDiv.setAttribute("class", "repoLanguage");
    const languageSpan = document.createElement("span");
    languageSpan.style.backgroundColor = repoColors[index];
    const languagePara = document.createElement("p");
    languagePara.textContent = repoLanguages[index];
    languageDiv.appendChild(languageSpan);
    languageDiv.appendChild(languagePara);

    const starsDiv = document.createElement("div");
    starsDiv.setAttribute("class", "repoStars");
    const starImg = document.createElement("img");
    starImg.setAttribute("src", "./images/star.svg");
    starImg.setAttribute("alt", "Stars");
    const starPara = document.createElement("p");
    starPara.textContent = repoStars[index];
    starsDiv.appendChild(starImg);
    starsDiv.appendChild(starPara);

    const forksDiv = document.createElement("div");
    forksDiv.setAttribute("class", "repoForks");
    const forkImg = document.createElement("img");
    forkImg.setAttribute("src", "./images/branch-elements.svg");
    forkImg.setAttribute("alt", "Forks");
    const forkPara = document.createElement("p");
    forkPara.textContent = repoForks[index];
    forksDiv.appendChild(forkImg);
    forksDiv.appendChild(forkPara);

    const lastUpdatePara = document.createElement("p");
    lastUpdatePara.setAttribute("class", "repoLastUpdate");
    lastUpdatePara.textContent = "Updated On ";
    const lastUpdateSpan = document.createElement("span");
    const date = new Date(repoLastUpdate[index]);
    lastUpdateSpan.textContent =
      date.toLocaleString("en-US", {
        day: "numeric",
      }) +
      " " +
      date.toLocaleString("en-US", { month: "long" });
    lastUpdatePara.appendChild(lastUpdateSpan);

    const starButtonDiv = document.createElement("div");
    starButtonDiv.setAttribute("class", "repoStar");
    const starButtonImg = document.createElement("img");
    starButtonImg.setAttribute("src", "./images/star.svg");
    starButtonImg.setAttribute("alt", "Stars");
    const starButtonPara = document.createElement("p");
    starButtonPara.textContent = "Star";
    starButtonDiv.appendChild(starButtonImg);
    starButtonDiv.appendChild(starButtonPara);

    metaDiv.appendChild(languageDiv);
    metaDiv.appendChild(starsDiv);
    metaDiv.appendChild(forksDiv);
    metaDiv.appendChild(lastUpdatePara);
    metaDiv.appendChild(starButtonDiv);

    repoCard.appendChild(heading);
    repoCard.appendChild(metaDiv);

    repoCards.push(repoCard);
  }

  const cardsSection = document.getElementById("cardsSection");

  repoCards.forEach((element) => {
    cardsSection.appendChild(element);
  });

  displayStuffs();
};

const submitHandler = () => {
  event.preventDefault();

  const userName = document.getElementById("mainSearch").value;

  let opt = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + process.env.Token,
    },
    body: JSON.stringify({
      query: `{
    user(login: "${userName}") {
      avatarUrl
      bio
      name
      login
      repositories(first: 20) {
        edges {
          node {
            id
            name
            stargazerCount
            description
            forkCount
            languages(first: 1) {
              edges {
                node {
                  color
                  name
                }
              }
            }
            pushedAt
          }
        }
        totalCount
      }
    }
  }
  `,
    }),
  };
  fetch(`https://api.github.com/graphql`, opt)
    .then((res) => res.json())
    .then((res) => insertData(res));
};
